import { Dispatch, useCallback, useState } from 'react';

export type FetchDataFn = (url: string, options?: any, action?: () => {}) => Promise<void>;

type FetchOutputs = {
    data: any;
    performFetch: FetchDataFn;
    loading: boolean;
    fetchError: boolean;
    setData: Dispatch<any>;
};

export const useFetch = (): FetchOutputs => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>(false);

    const performFetchFn: FetchDataFn = useCallback(async (url, options?, action?) => {
        const setFailed = () => {
            setFetchError(true);
            setLoading(false);
        };
        const setSuccess = (data: any) => {
            setData(data);
            setLoading(false);
            action?.();
        };

        try {
            setLoading(true);
            const res = await fetch(url, options);

            if (!res.ok) {
                setFailed();
                return;
            }

            if (res.status === 204) {
                setSuccess({
                    success: true,
                    info: 'Item successfully deleted',
                });
                return;
            }

            const data = await res.json();
            setSuccess(data);
        } catch (e) {
            setFailed();
            console.error(e);
        }
    }, []);

    return {
        data,
        performFetch: performFetchFn,
        loading,
        fetchError,
        setData,
    };
};
