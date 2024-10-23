import { setUserRoleInLocalStorageFromKcRoles } from '../notFoundPage.helper.ts';

describe('setUserRoleInLocalStorageFromKcRoles', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should set the user role in local storage', () => {
    // GIVEN
    const rolesList = ['role1', 'role2', 'role3', 'role4'];

    // WHEN
    setUserRoleInLocalStorageFromKcRoles(rolesList);

    // THEN
    expect(localStorage.setItem).toHaveBeenCalledWith('role', 'role4');
  });
});
