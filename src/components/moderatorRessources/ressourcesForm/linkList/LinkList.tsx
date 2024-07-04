import { axiosInstance } from '@/RequestInterceptor';
import { DownloadLink } from '@/components/common/dowloadLink/DowloadLink';
import { WelcomeAPIResponse } from '@/domain/OcAccueil';
import { ocWelcomeDownLoadLinkMapper } from '@/utils/ocWelcomeDownLoadLink.mapper';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

export const LinkListForm = () => {
  const [, setIsLoading] = useState<boolean>(true);
  const { keycloak } = useKeycloak();
  useEffect(() => {
    const sendMyToken = (token: string) => {
      let result: boolean | null;

      fetch('/api/public/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        credentials: 'include',
        body: token,
      })
        .then(() => {
          result = true;
        })
        .catch(() => {
          result = false;
        })
        .finally(() => {
          return result;
        });
      return '';
    };
    sendMyToken(keycloak.token!);
    if (keycloak.token) {
      axiosInstance
        .get<WelcomeAPIResponse>('/partenaire/welcome', {
          withCredentials: true,
        })
        .then((response) => {
          const downloadLinks = ocWelcomeDownLoadLinkMapper(
            response.data.ressourceFiles
          );
          console.log(downloadLinks);
        })
        .then(() => setIsLoading(false));
    }
  }, [keycloak.token]);
  return (
    <div className="form__container">
      <ul className="link__list-display">
        <li className="link__list link__list--color">
          <DownloadLink
            fileName={'Fichier'}
            fileType={'PDF'}
            fileUrl={'testUrl'}
            fileWeight={'50'}
          />
        </li>
        <li className="link__list link__list--color">
          <DownloadLink
            fileName={'Fichier'}
            fileType={'PDF'}
            fileUrl={'testUrl'}
            fileWeight={'50'}
          />
        </li>
      </ul>
    </div>
  );
};
