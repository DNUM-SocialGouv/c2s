import { createContext, ReactNode, useState } from 'react';
import { deleteMembre } from '../page/infoTab/action.ts';
import { useKeycloak } from '@react-keycloak/web';
import { useDispatch } from 'react-redux';
import { iDeleteObject } from '../domain/OcInformationTab.ts';

export const AccountContext = createContext<{
  setAccountToDelete: React.Dispatch<iDeleteObject | null>;
  accountToDelete: iDeleteObject | null;
  deleteAction: () => void;
} | null>(null);
interface AccountProviderProps {
  children: ReactNode;
}
export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const [accountToDelete, setAccountToDelete] = useState<iDeleteObject | null>(
    null
  );
  const { keycloak } = useKeycloak();
  const logoutOptions = {};
  const deleteAction = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(deleteMembre(accountToDelete));
    keycloak
      .logout(logoutOptions)
      .then(() => {
        localStorage.removeItem('email');
      })
      .catch((error) => {
        console.log('--> log: logout error ', error);
      });
  };
  return (
    <AccountContext.Provider
      value={{ setAccountToDelete, accountToDelete, deleteAction }}
    >
      {children}
    </AccountContext.Provider>
  );
};
