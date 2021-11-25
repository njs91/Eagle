import { Dispatch, useState } from 'react';

export type FetchDataFn = (url: string, options?: any) => Promise<void>;

export const useFetch = (): {
  data: any;
  performFetch: FetchDataFn;
  loading: boolean;
  fetchError: boolean;
  setData: Dispatch<any>;
} => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);

  const performFetchFn: FetchDataFn = async (url, options?) => {
    try {
      setLoading(true);
      const res = await fetch(url, options);

      if (res.status === 204) {
        setData({ success: true, info: 'Item successfully deleted' });
        setLoading(false);
        return;
      }

      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (e) {
      setFetchError(true);
      setLoading(false);
      console.error(e);
    }
  };

  return { data, performFetch: performFetchFn, loading, fetchError, setData };
};
