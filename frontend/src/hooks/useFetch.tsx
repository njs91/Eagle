import { Dispatch, useState } from 'react';

export type GetDataFn = (url: string, options?: any) => Promise<void>;

export const useFetch = (): {
  data: any;
  getData: GetDataFn;
  fetchError: boolean;
  setData: Dispatch<any>;
} => {
  const [data, setData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const getAllData: GetDataFn = async (url, options?) => {
    try {
      // loading?
      const res = await fetch(url, options);
      const data = await res.json();
      setData(data);
    } catch (e) {
      setFetchError(true);
      console.error(e);
    }
  };

  return { data, getData: getAllData, fetchError, setData };
};
