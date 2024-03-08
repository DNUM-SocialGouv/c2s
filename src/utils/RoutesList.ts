import InscriptionParterrePage from "@/page/inscriptionPartnerPage/InscriptionPartnerPage.tsx";
import HomePage from "@/page/homePage/HomePage.tsx";
import { ROLES_LIST } from "@/utils/RolesList.ts";
import RequestResetPasswordPage from "@/page/requestResetPasswordPage/RequestResetPasswordPage.tsx";
import ResetPasswordPage from "@/page/resetPasswordPage/ResetPasswordPage.tsx";
import PartnerHomePage from "@/page/partnerHomePage/PartnerHomePage.tsx";

export interface IRouteType {
  link: string;
  component: React.ComponentType;
  authorizedRoles?: Array<keyof typeof ROLES_LIST>;
}

export const ROUTES_LIST: Array<IRouteType> = [
  { link: "/", component: HomePage, authorizedRoles: ["moderateur"] },
  {
    link: "/admin/membres",
    component: HomePage,
    authorizedRoles: ["moderateur"],
  },
  { link: "/caisse", component: HomePage, authorizedRoles: ["caisse"] },
  { link: "/oc", component: PartnerHomePage, authorizedRoles: ["oc"] },
];

export const ROUTES_PUBLIC_LIST: Array<IRouteType> = [
  { link: "/inscription", component: InscriptionParterrePage },
  { link: "/request-reset-password", component: RequestResetPasswordPage },
  { link: "/reset-password", component: ResetPasswordPage },
];
