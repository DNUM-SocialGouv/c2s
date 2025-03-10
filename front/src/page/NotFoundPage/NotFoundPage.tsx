import { Separator } from '../../components/common/svg/Seperator.tsx';
import { NOT_FOUND_PAGE } from '../../wording.ts';
import React, { useEffect, useState } from 'react';
import './NotFoundPage.css';
import { ErrorsPages } from '../../components/common/svg/ErrorsPages.tsx';
import { ArrowLeft } from '../../components/common/svg/ArrowLeft.tsx';
import { ROLES_LIST } from '../../utils/RolesList.ts';

export const NotFoundPage: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [baseUrl, setBaseUrl] = useState<string>('');

  useEffect(() => {
    const baseUrlFromWindow = window.location.origin;
    setBaseUrl(baseUrlFromWindow);
    const userRole = localStorage.getItem('role');

    if (userRole) {
      if (userRole === ROLES_LIST.ORGANISME_COMPLEMENTAIRE) {
        return setRedirectUrl('/mon-espace/oc');
      }
      if (userRole === ROLES_LIST.MODERATEUR) {
        return setRedirectUrl('/mon-espace/admin/membres');
      }
      if (userRole === ROLES_LIST.CAISSE) {
        return setRedirectUrl('/mon-espace/caisse');
      }
    }
  }, []);

  return (
    <main role="main" id="content">
      <div className="fr-container">
        <div className="flex flex-col lg:gap-2 w-full px-5 md:px-20 md:py-10 mb-8 md:mb-0 mt-8 md:mt-0 pb-0 py-0 error__description--padding paragraph__mobile">
          <header>
            <h1>{NOT_FOUND_PAGE.title}</h1>
          </header>
          <Separator />
        </div>
        <div className="flex justify-center items-center lg:gap-2 w-full px-5 md:px-20 mb-8 md:mb-0 mt-8 md:mt-0 pb-0 container__mobile">
          <div className="col__desktop col__mobile">
            <h2>{NOT_FOUND_PAGE.errorMessage}</h2>
            <p className="error__description--font paragraph__mobile">
              {NOT_FOUND_PAGE.errorDescriptionFirstLigne}
              <br />
              {NOT_FOUND_PAGE.errorDescriptionSecondLigne}
            </p>
            <p className="fr-text--sm fr-mb-5w paragraph__mobile">
              {NOT_FOUND_PAGE.errorDetailFirsLine}
              <br />
              <br />
              {NOT_FOUND_PAGE.errorDetailSecondLine}
            </p>
          </div>
          <div className="col__desktop col__mobile">
            <div className="flex justify-center items-center">
              <ErrorsPages />
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-12 lg:gap-2 w-full md:px-20 ml-6 md:ml-4 xs:ml-4 page-not-found__bottom--margin">
          <a className="fr-btn" href={baseUrl + redirectUrl}>
            <span className="svg__margin--right">
              <ArrowLeft />
            </span>
            Page d'accueil
          </a>
        </div>
      </div>
    </main>
  );
};
