import React, { createContext, ReactNode, FC, Dispatch } from 'react';
import { WebPage } from './Pages';

export interface PageContextProps {
    pages: Array<WebPage> | null;
    setPages: any;
    // setPages: Dispatch<any>;
    // setPages: Dispatch<Array<WebPage> | null>;
    // setPages: Dispatch<React.SetStateAction<Array<WebPage> | null>>;
    // setPages: (value: any) => void;
    currentPage: WebPage | null;
    setCurrentPage: Dispatch<WebPage>;
}

export const PageContext = createContext<PageContextProps>({
    pages: null,
    setPages: () => {},
    currentPage: null,
    setCurrentPage: () => {},
});

export interface PageContextProviderProps {
    children: ReactNode;
    values: PageContextProps;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children, values }) => (
    <PageContext.Provider value={values}>{children}</PageContext.Provider>
);
