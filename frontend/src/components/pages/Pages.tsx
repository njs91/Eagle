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
  currentPageData: any;
}

export const Sidebar: FC<SidebarProps> = ({ pages, currentPageData }) => {
  const [expanded, setExpanded] = useState(true);
  const { currentPage, fetchPage, setCurrentPage, fetchPageError } =
    currentPageData;

  return (
    <div
      className={`${styles.sidebar} ${
        expanded ? styles.expanded : styles.contracted
      }`}>
      <h1>Pages</h1>
      <ul>
        {pages.map((page: WebPage) => (
          <li
            key={page.title}
            className=''
            onClick={() => {
              if (page.id === currentPage.id) return;
              fetchPage(`http://localhost:8000/api/pages/${page.id}`);
            }}>
            {page.title}
          </li>
        ))}
        <li
          onClick={() => fetchPage(`http://localhost:8000/api/pages/2342838`)}>
          Test Breakage
        </li>
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
  fetchPageError: boolean;
}

export const PageDetails: FC<PageDetailsProps> = ({ page, fetchPageError }) => {
  if (fetchPageError) {
    return <>fetch page error</>;
  }

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
