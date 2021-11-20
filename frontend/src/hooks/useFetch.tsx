import { Dispatch, useState } from 'react';

export const useFetch = (): {
  data: any;
  getData: (url: string, options?: any) => void;
  fetchError: boolean;
  setData: Dispatch<any>;
} => {
  const [data, setData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const getAllData = async (url: string, options?: any): Promise<void> => {
    try {
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
