import React, { useEffect, VFC } from 'react';
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
        performFetch: fetchPage,
        fetchError: fetchPageError,
        setData: setCurrentPage,
        loading: loadingCurrentPage,
    } = useFetch();

    useEffect(() => {
        fetchPages('http://localhost:8000/api/pages');
    }, []);
    // React Hook useEffect has a missing dependency: 'fetchPages'. Either include it or remove the dependency array - react-hooks/exhaustive-deps)

    useEffect(() => {
        if (!pages || !pages.length) return;
        setCurrentPage(pages[0]);
    }, [pages]);
    // React Hook useEffect has a missing dependency: 'setCurrentPage'. Either include it or remove the dependency array - react-hooks/exhaustive-deps)

    if (fetchPagesError) {
        return <p>Failed to fetch</p>;
    }

    if (!pages || loadingPages) {
        return <p>Loading...</p>;
    }

    if (!pages.length) {
        return <p>No pages found</p>;
    }

    return (
        <PageContextProvider values={{ pages, setPages, currentPage, setCurrentPage }}>
            <Sidebar
                currentPageData={{
                    fetchPage,
                    fetchPageError,
                }}
            />
            <PageDetails page={currentPage} fetchPageError={fetchPageError} loadingCurrentPage={loadingCurrentPage} />
        </PageContextProvider>
    );
};

export default Pages;
