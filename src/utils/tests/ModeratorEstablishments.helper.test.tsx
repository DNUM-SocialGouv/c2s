import { handleInputChange } from '@/utils/ModeratorEstablishments.helper';
import { formatEndpoint } from '@/utils/ModeratorEstablishments.helper';

describe('ModeratorEstablishmentsHelper', () => {
  describe('handleInputChange', () => {
    it('should remove specified field names from errors object', () => {
      // GIVEN
      const fieldNames = ['fieldName1', 'fieldName2'];
      const setErrors = jest.fn();
      // WHEN
      handleInputChange(fieldNames, setErrors);
      // THEN
      expect(setErrors).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('formatEndpoint', () => {
    it('should return the formatted endpoint', () => {
      // GIVEN
      const filterParams = '?param1=value1&param2=value2';
      // WHEN
      const endpoint = formatEndpoint(filterParams);
      // THEN
      expect(endpoint).toBe(
        '/moderateur/etablissements/search?param1=value1&param2=value2'
      );
    });
  });
});
