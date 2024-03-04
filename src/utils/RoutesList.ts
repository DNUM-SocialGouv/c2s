
import InscriptionParterrePage from "@/page/inscriptionPartnerPage/InscriptionPartnerPage.tsx";
import HomePage from "@/page/homePage/HomePage.tsx";
import {ROLES_LIST} from "@/utils/RolesList.ts";
import ConfirmPasswordPage from "@/page/confirmPasswordPage/ConfirmPasswordPage.tsx";
import RequestResetPasswordPage from "@/page/requestResetPasswordPage/RequestResetPasswordPage.tsx";
export interface IRouteType {
    link: string,
    component: React.ComponentType,
    authorizedRoles?: Array<keyof typeof ROLES_LIST>
}

export const ROUTES_LIST: Array<IRouteType> =  [
    { link: '/',                    component: HomePage,              authorizedRoles:['Admin']  },
    { link: '/moderateur',                    component: HomePage,              authorizedRoles:['Moderateur']  },
    { link: '/Caisse',                    component: HomePage,              authorizedRoles:['Caisse']  },
    { link: '/OC',                    component: HomePage,              authorizedRoles:['OC']  }
]


export const ROUTES_PUBLIC_LIST: Array<IRouteType> =  [
    { link: '/inscription',                    component: InscriptionParterrePage,   },
    { link: '/request-reset-password',                    component: RequestResetPasswordPage,   },
    { link: '/reset-password',                    component: ConfirmPasswordPage, }
]