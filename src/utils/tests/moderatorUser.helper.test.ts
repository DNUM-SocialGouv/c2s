import { usersQuery } from '../moderatorUser.helper';
import { UserStatus } from '@/domain/ModerateurUsers';

describe('usersQuery', () => {
  it('should return an empty string when no filters are provided', () => {
    // GIVEN
    const filters = {};
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('');
  });

  it('should include the "statut" filter when provided', () => {
    // GIVEN
    const filters = {
      statut: UserStatus.AModerer,
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('?statut=A_MODERER');
  });

  it('should include the "page" filter when provided', () => {
    // GIVEN
    const filters = {
      page: 2,
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('?page=2');
  });

  it('should include the "size" filter when provided', () => {
    // GIVEN
    const filters = {
      size: 10,
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('?size=10');
  });

  it('should include the "search" filter when provided', () => {
    // GIVEN
    const filters = {
      search: 'User',
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('?search=User');
  });

  it('should include multiple filters when provided', () => {
    // GIVEN
    const filters = {
      statut: UserStatus.AModerer,
      page: 2,
      size: 10,
      search: 'User',
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('?statut=A_MODERER&page=2&size=10&search=User');
  });

  it('should ignore filters with undefined or empty values', () => {
    // GIVEN
    const filters = {
      groupe: undefined,
      size: undefined,
      search: '',
    };
    // WHEN
    const result = usersQuery(filters);
    // THEN
    expect(result).toBe('');
  });
});
