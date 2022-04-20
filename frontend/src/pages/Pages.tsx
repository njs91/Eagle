import React, { useEffect, useState, VFC } from 'react';
import { Page } from '../components/Page';
import { PageDetails, Sidebar } from '../components/pages/Pages';
import { pagesMeta } from './MetaTags';
import styles from '../css/pages/pages.module.scss';
import { useFetch } from '../hooks/useFetch';
import { PageContextProvider } from '../components/pages/PageContext';

const Pages: VFC = () => (
    <Page meta={pagesMeta} fullWidth={true} clsOuter={styles.pagesOuter} clsInner={styles.pagesInner}>
        <PagesContent />
    </Page>
);

const PagesContent: VFC = () => {
    const {
        data: pages,
        performFetch: fetchPages,
        fetchError: fetchPagesError,
        setData: setPages,
        loading: loadingPages,
    } = useFetch();
    const {
        data: currentPage,
        performFetch: fetchCurrentPage,
        fetchError: fetchCurrentPageError,
        setData: setCurrentPage,
        loading: loadingCurrentPage,
    } = useFetch();
    const [createPageModalIsOpen, setCreatePageModalIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchPages('http://localhost:8000/api/pages');
    }, [fetchPages]);

    useEffect(() => {
        if (!pages || !pages.length) return;
        setCurrentPage(pages[0]);
    }, [pages, setCurrentPage]);

    return (
        <PageContextProvider
            values={{
                pagesData: {
                    pages,
                    fetchPages,
                    fetchPagesError,
                    setPages,
                    loadingPages,
                },
                currentPageData: {
                    currentPage,
                    fetchCurrentPage,
                    fetchCurrentPageError,
                    setCurrentPage,
                    loadingCurrentPage,
                },
                createPageModalState: {
                    createPageModalIsOpen,
                    setCreatePageModalIsOpen,
                },
            }}
        >
            <Sidebar />
            <PageDetails />
        </PageContextProvider>
    );
};

export default Pages;
