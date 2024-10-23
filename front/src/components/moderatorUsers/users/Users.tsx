import { useCallback, useEffect, useRef, useState } from 'react';
import { UserBlock } from '../userBlock/UserBlock.tsx';
import { Pagination } from '../../common/pagination/Pagination.tsx';
import { SectionTitle } from '../../common/sectionTitle/SectionTitle.tsx';
import { axiosInstance } from '../../../RequestInterceptor.tsx';
import { QueryFilters, UserApiResponse } from '../../../domain/ModerateurUsers.ts';
import { useUserContext } from '../../../contexts/UserContext.tsx';
import { MODERATOR_USERS } from '../../../wording.ts';
import { UserStatus } from '../../../domain/ModerateurUsers.ts';
import { AxiosError } from 'axios';
import { usersQuery } from '../../../utils/moderatorUser.helper.ts';

const USERS_PER_PAGE = 5;

const formatEndpoint = (filters: QueryFilters) =>
  `/moderateur/membres${usersQuery(filters)}`;

export const Users = () => {
  //Todo: refactor > setusers en state (utilisé que dans ce composant) ?
  const { users, setUsers, statut, organisationType, searchTerm } =
    useUserContext();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const listRef = useRef<HTMLUListElement>(null);

  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
  const statutToString = statut;

  let subtitle;

  switch (statutToString) {
    case UserStatus.AModerer:
      subtitle = MODERATOR_USERS.usersToModerate;
      break;
    case UserStatus.Valide:
      subtitle = MODERATOR_USERS.activeUsers;
      break;
    case UserStatus.Refuse:
      subtitle = MODERATOR_USERS.refusedUsers;
      break;
    case UserStatus.Desinscrit:
      subtitle = MODERATOR_USERS.inactiveUsers;
      break;
    default:
      subtitle = '';
  }

  const handleDataUpdate = useCallback(() => {
    setDataUpdated((prev: boolean) => !prev);
  }, []);

  const filters: QueryFilters = {
    statut: statut,
    groupe: organisationType,
    size: USERS_PER_PAGE,
    page: currentPage - 1,
    search: searchTerm,
  };

  const apiEndpoint = formatEndpoint(filters);

  useEffect(() => {
    if (listRef.current) {
      listRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [currentPage]);

  useEffect(() => {
    //reset la recherche quand on change de filtre
    setCurrentPage(1);
  }, [statut, organisationType, searchTerm]);

  useEffect(() => {
    axiosInstance
      .get<UserApiResponse>(apiEndpoint, {
        withCredentials: true,
      })
      .then((response) => {
        setUsers(response.data.list);
        setTotalUsers(response.data.count);
      })
      .catch((error: AxiosError) => {
        console.error(
          `Error while fetching users: ${error.message}`,
          `Error code: ${error.code}`
        );
      });
  }, [
    dataUpdated,
    statut,
    organisationType,
    searchTerm,
    currentPage,
    apiEndpoint,
    setUsers,
  ]);

  return (
    <div className="fr-container--fluid" data-testid="users">
      <SectionTitle title={`${totalUsers} ${subtitle}`} />
      <ul
        ref={listRef}
        className="list-none flex flex-wrap flex-col gap-y-6 ps-0 pe-0"
      >
        {totalUsers > 0 &&
          users.map((user) => (
            <li key={user.email}>
              <UserBlock
                user={user}
                onDataUpdate={handleDataUpdate}
                singleAction={statut !== UserStatus.AModerer.toString()}
              />
            </li>
          ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          onClickPrev={() => setCurrentPage((prevState) => prevState - 1)}
          onClickNext={() => setCurrentPage((prevState) => prevState + 1)}
        />
      )}
    </div>
  );
};
