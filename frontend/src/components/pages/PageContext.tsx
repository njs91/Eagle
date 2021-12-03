import React, { createContext, ReactNode, FC } from 'react';
import { WebPage } from './Pages';

export interface PageContextProps {
    pages: Array<WebPage> | null;
    // setPages: Dispatch<any>;
    // setPages: Dispatch<Array<WebPage> | null>;
    // setPages: Dispatch<React.SetStateAction<Array<WebPage> | null>>;
    setPages: any;
    // setPages: (value: any) => void;
}

export const PageContext = createContext<PageContextProps>({
    pages: null,
    setPages: null,
});

export interface PageContextProviderProps {
    children: ReactNode;
    values: PageContextProps;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children, values }) => (
    <PageContext.Provider value={values}>{children}</PageContext.Provider>
);
