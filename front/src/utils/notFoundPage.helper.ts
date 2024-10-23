export function setUserRoleInLocalStorageFromKcRoles(rolesList: string[]) {
  const roleFromRolesList = rolesList[3];
  localStorage.setItem('role', roleFromRolesList);
}
