/* Note: components for the /pages page, not general components for all pages */

import React, { FC, useEffect, useState } from 'react';
import styles from '../../css/pages/pages.module.scss';
import { Section } from '../Default';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/HelperFunctions';
import { useFetch } from '../../hooks/useFetch';

interface WebPage {
  date_created: string;
  id: number;
  notes: string;
  slug: string;
  title: string;
  type: string;
}

interface SidebarProps {
  pages: Array<WebPage>;
  currentPageState: any;
}

export const Sidebar: FC<SidebarProps> = ({ pages, currentPageState }) => {
  const [expanded, setExpanded] = useState(true);
  const { currentPage, setCurrentPage } = currentPageState;
  const { data: page, getData: fetchNewPage, fetchError } = useFetch();
  const fetchPage = async (id: number) => {
    if (currentPage?.id === id) return;
    fetchNewPage(`http://localhost:8000/api/pages/${id}`);
  };

  useEffect(() => {
    if (fetchError) return;
    setCurrentPage(page);
  }, [page]);

  return (
    <div
      className={`${styles.sidebar} ${
        expanded ? styles.expanded : styles.contracted
      }`}>
      <h1>Pages</h1>
      <ul>
        {pages.map((page: WebPage) => (
          <li key={page.title} onClick={() => fetchPage(page.id)}>
            {page.title}
          </li>
        ))}
        <li onClick={() => fetchPage(23489)}>Test Breakage</li>
      </ul>
      <div className={styles.buttonsContainer}>
        <FontAwesomeIcon icon={faPlusSquare} />{' '}
        <FontAwesomeIcon
          icon={expanded ? faCompressArrowsAlt : faExpandArrowsAlt}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
    </div>
  );
};

interface PageDetailsProps {
  page: WebPage | null;
}

export const PageDetails: FC<PageDetailsProps> = ({ page }) => {
  if (!page?.id) {
    // if api returns {detail: 'Not found.'}
    return <>nothing</>;
  }

  return (
    <Section clsOuter={styles.pageDetailsOuter}>
      <p>{page.title}</p>
      <p>{page.slug}</p>
      <p>{page.type}</p>
      <p>{page.notes}</p>
      <p>{formatDate(page.date_created)}</p>
    </Section>
  );
};
