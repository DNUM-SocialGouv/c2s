export const ROLES_LIST = {
    Admin: 'Admin',
    Caisse: 'Caisse',
    OC: 'OC',
    Moderateur: 'Moderateur',
};

export type RequireAuthProps = {
    requiredRoles: Array<keyof typeof ROLES_LIST>;
};