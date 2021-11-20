/* Note: components for the /pages page, not general components for all pages */

import React, { Dispatch, FC, useState } from 'react';
import styles from '../../css/pages/pages.module.scss';
import { Section } from '../Default';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/HelperFunctions';
import { GetDataFn } from '../../hooks/useFetch';

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
  currentPageData: {
    currentPage: WebPage;
    fetchPage: GetDataFn;
    setCurrentPage: Dispatch<WebPage>;
    fetchPageError: boolean;
  };
}

export const Sidebar: FC<SidebarProps> = ({ pages, currentPageData }) => {
  const [expanded, setExpanded] = useState(true);
  const { currentPage, fetchPage } = currentPageData;

  const SidebarList: FC<{
    pages: Array<WebPage>;
  }> = ({ pages }) => (
    <ul>
      {pages.map((page: WebPage) => {
        const isCurrentPage = page?.id === currentPage?.id;

        return (
          <li
            key={page.title}
            className={isCurrentPage ? styles.current : ''}
            onClick={() => {
              if (isCurrentPage) return;
              fetchPage(`http://localhost:8000/api/pages/${page.id}`);
            }}>
            {page.title}
          </li>
        );
      })}
    </ul>
  );

  interface ButtonsProps {
    expanded: boolean;
    setExpanded: Dispatch<boolean>;
  }

  const Buttons: FC<ButtonsProps> = ({ expanded, setExpanded }) => (
    <div className={styles.buttonsContainer}>
      <FontAwesomeIcon icon={faPlusSquare} />{' '}
      <FontAwesomeIcon
        icon={expanded ? faCompressArrowsAlt : faExpandArrowsAlt}
        onClick={() => setExpanded(!expanded)}
      />
    </div>
  );

  const classes = `${styles.sidebar} ${
    expanded ? styles.expanded : styles.contracted
  }`;

  return (
    <div className={classes}>
      <h1>Pages</h1>
      <SidebarList pages={pages} />
      <Buttons expanded={expanded} setExpanded={setExpanded} />
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
