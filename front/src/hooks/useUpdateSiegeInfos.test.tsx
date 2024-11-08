import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react';
import { useUpdateSiegeInfos } from './useUpdateSiegeInfos';
import { axiosInstance } from '@/RequestInterceptor';
import { FormDataOC } from '@/domain/OcInformation';
import MockAdapter from 'axios-mock-adapter';
import { waitFor } from '@testing-library/react';

describe('useUpdateSiegeInfos', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch data successfully', async () => {
    // GIVEN
    const ocData: FormDataOC = {
      email: 'test@c2s.com',
      nom: '',
      adresse: '',
      groupe: '',
      siteWeb: '',
      ocAddedtoLPA: false,
      dateMaj: '',
      totalPAitems: 0,
      locSiren: '',
      telephone: '',
    };
    const responseData = { contenu: 'some data' };

    mock.onPut('/oc/update', ocData).reply(200);
    mock.onGet(`/oc?email=${ocData.email}`).reply(200, responseData);

    const { result } = renderHook(() => useUpdateSiegeInfos(ocData));

    // WHEN
    await act(async () => {
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    // THEN
    expect(result.current.data).toEqual(responseData);
    expect(result.current.error).toBeNull();
  });

  it('should handle error', async () => {
    // GIVEN
    const ocData: FormDataOC = {
      email: 'test@c2s.com',
      nom: '',
      adresse: '',
      groupe: '',
      siteWeb: '',
      ocAddedtoLPA: false,
      dateMaj: '',
      totalPAitems: 0,
      locSiren: '',
      telephone: '',
    };

    mock.onPut('/oc/update', ocData).reply(500);
    mock.onGet(`/oc?email=${ocData.email}`).reply(500);

    const { result } = renderHook(() => useUpdateSiegeInfos(ocData));

    // WHEN
    await act(async () => {
      await waitFor(() => expect(result.current.loading).toBe(false));
    });

    // THEN
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(
      'Request failed with status code 500'
    );
  });
});
