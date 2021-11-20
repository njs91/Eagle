import React, { useEffect, useState, VFC } from 'react';
import { Page } from '../components/Page';
import { PageDetails, Sidebar } from '../components/pages/Pages';
import { pagesMeta } from './MetaTags';
import styles from '../css/pages/pages.module.scss';
import { useFetch } from '../hooks/useFetch';

const Pages: VFC = () => (
  <Page
    meta={pagesMeta}
    fullWidth={true}
    clsOuter={styles.pagesOuter}
    clsInner={styles.pagesInner}>
    <PagesContent />
  </Page>
);

const PagesContent: VFC = () => {
  const {
    data: pages,
    getData: fetchPages,
    fetchError: fetchPagesError,
  } = useFetch();
  const {
    data: currentPage,
    getData: fetchPage,
    fetchError: fetchPageError,
    setData: setCurrentPage,
  } = useFetch();

  useEffect(() => {
    fetchPages('http://localhost:8000/api/pages');
  }, []);
  // React Hook useEffect has a missing dependency: 'fetchPages'. Either include it or remove the dependency array - react-hooks/exhaustive-deps

  useEffect(() => {
    if (!pages || !pages.length) return;
    setCurrentPage(pages[0]);
  }, [pages]);
  // React Hook useEffect has a missing dependency: 'setCurrentPage'. Either include it or remove the dependency array - react-hooks/exhaustive-deps

  if (fetchPagesError) {
    return <p>Failed to fetch</p>;
  }

  if (!pages) {
    return <p>Loading...</p>;
  }

  if (!pages.length) {
    return <p>No pages found</p>;
  }

  return (
    <>
      <Sidebar
        pages={pages}
        currentPageData={{
          currentPage,
          fetchPage,
          setCurrentPage,
          fetchPageError,
        }}
      />
      <PageDetails page={currentPage} fetchPageError={fetchPageError} />
    </>
  );
};

export default Pages;
