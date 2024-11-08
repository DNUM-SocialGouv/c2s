import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react';
import { useFetchSiegeInfos } from './useFetchSiegeInfos';
import { axiosInstance } from '@/RequestInterceptor';
import { OcInfoData } from '@/domain/OcInformation';
import MockAdapter from 'axios-mock-adapter';
import { AxiosError } from 'axios';

describe('useFetchSiegeInfos', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fetch data successfully', async () => {
    // GIVEN
    const email = 'test@example.com';
    const responseData: OcInfoData = {
      locSiren: '123456789',
      nom: 'Organisme de test',
      adresse: '123 rue de test',
      email: email,
      telephone: '1234567890',
      groupe: 'oc',
      siteWeb: 'https://example.com',
      ocAddedtoLPA: true,
      dateMaj: '2021-09-01',
      totalPAitems: 0,
    };

    mock.onGet(`/oc?email=${email}`).reply(200, responseData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchSiegeInfos(email)
    );
    // WHEN
    await act(async () => {
      await waitForNextUpdate();
    });

    // THEN
    expect(result.current.data).toEqual(responseData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle error', async () => {
    const email = 'test@example.com';

    mock.onGet(`/oc?email=${email}`).reply(500);

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchSiegeInfos(email)
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeInstanceOf(AxiosError);
    expect(result.current.error?.message).toBe(
      'Request failed with status code 500'
    );
  });
});
