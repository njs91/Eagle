import React, { createContext, ReactNode, FC, Dispatch } from 'react';
import { FetchDataFn } from '../../hooks/useFetch';
import { WebPage } from './Pages';

export interface PageContextProps {
    pagesData: {
        pages: Array<WebPage> | null;
        fetchPages: FetchDataFn;
        fetchPagesError: boolean;
        setPages: any;
        loadingPages: boolean;
    };
    currentPageData: {
        currentPage: WebPage | null;
        fetchCurrentPage: FetchDataFn;
        fetchCurrentPageError: boolean;
        setCurrentPage: Dispatch<WebPage>;
        loadingCurrentPage: boolean;
    };
    createPageModalState: {
        createPageModalIsOpen: boolean;
        setCreatePageModalIsOpen: Dispatch<boolean>;
    };
}

export const PageContext = createContext<PageContextProps>({
    pagesData: {
        pages: null,
        fetchPages: async () => {},
        fetchPagesError: false,
        setPages: () => {},
        loadingPages: false,
    },
    currentPageData: {
        currentPage: null,
        fetchCurrentPage: async () => {},
        fetchCurrentPageError: false,
        setCurrentPage: () => {},
        loadingCurrentPage: false,
    },
    createPageModalState: {
        createPageModalIsOpen: false,
        setCreatePageModalIsOpen: () => {},
    },
});

export interface PageContextProviderProps {
    children: ReactNode;
    values: PageContextProps;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children, values }) => (
    <PageContext.Provider value={values}>{children}</PageContext.Provider>
);
