import { Dispatch, useState } from 'react';

export type GetDataFn = (url: string, options?: any) => Promise<void>;

export const useFetch = (): {
  data: any;
  getData: GetDataFn;
  loading: boolean;
  fetchError: boolean;
  setData: Dispatch<any>;
} => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const getAllData: GetDataFn = async (url, options?) => {
    try {
      setLoading(true);
      const res = await fetch(url, options);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (e) {
      setFetchError(true);
      setLoading(false);
      console.error(e);
    }
  };

  return { data, getData: getAllData, loading, fetchError, setData };
};
