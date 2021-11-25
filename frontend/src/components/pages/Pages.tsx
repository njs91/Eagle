/* Note: components for the /pages page, not general components for all pages */

import React, { Dispatch, FC, ReactNode, useState } from 'react';
import styles from '../../css/pages/pages.module.scss';
import { Loading, Section, Error } from '../Default';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faPlusSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../utils/HelperFunctions';
import { GetDataFn } from '../../hooks/useFetch';
import { DeletePageModal } from './DeletePageModal';

interface WebPage {
  date_created: string;
  id: number;
  notes: string;
  slug: string;
  title: string;
  type: string;
}

interface CurrentPageData {
  currentPage: WebPage;
  fetchPage: GetDataFn;
  setCurrentPage: Dispatch<WebPage>;
  fetchPageError: boolean;
}

interface SidebarProps {
  pages: Array<WebPage>;
  currentPageData: CurrentPageData;
}

export const Sidebar: FC<SidebarProps> = ({ pages, currentPageData }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [deleteHovered, setDeleteHovered] = useState<boolean>(false);
  const classes = `${styles.sidebar} ${
    expanded ? styles.expanded : styles.contracted
  }`;

  return (
    <div className={classes}>
      <h1>Pages</h1>
      <SidebarList
        pages={pages}
        deleteHovered={deleteHovered}
        currentPageData={currentPageData}
      />
      <Buttons
        expanded={expanded}
        setExpanded={setExpanded}
        setDeleteHovered={setDeleteHovered}
      />
    </div>
  );
};

interface SidebarListProps {
  pages: Array<WebPage>;
  deleteHovered: boolean;
  currentPageData: CurrentPageData;
}

const SidebarList: FC<SidebarListProps> = ({
  pages,
  deleteHovered,
  currentPageData,
}) => {
  const { currentPage, fetchPage } = currentPageData;

  return (
    <ul>
      {pages.map((page: WebPage) => {
        const isCurrentPage = page?.id === currentPage?.id;
        const classes = `${isCurrentPage ? styles.current : ''} ${
          isCurrentPage && deleteHovered ? styles.deleteHovered : ''
        }`;

        return (
          <li
            key={page.title}
            className={classes}
            onClick={() => {
              if (isCurrentPage) return;
              fetchPage(`http://localhost:8000/api/pages/${page.id}`);
            }}>
            <p>{page.title}</p>
            <div className={styles.iconContainer}>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

interface ButtonsProps {
  expanded: boolean;
  setExpanded: Dispatch<boolean>;
  setDeleteHovered: Dispatch<boolean>;
}

const Buttons: FC<ButtonsProps> = ({
  expanded,
  setExpanded,
  setDeleteHovered,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setModalIsOpen(true);
    // use currentPage.id to determine which item to delete
  };

  return (
    <div className={styles.buttonsContainer}>
      <FontAwesomeIcon icon={faPlusSquare} />
      <FontAwesomeIcon
        icon={faTrash}
        className={`${styles.expandedOnly} ${styles.binIcon}`}
        onMouseEnter={() => setDeleteHovered(true)}
        onMouseLeave={() => setDeleteHovered(false)}
        onClick={() => handleClick()}
      />
      <FontAwesomeIcon
        icon={expanded ? faCompressArrowsAlt : faExpandArrowsAlt}
        onClick={() => setExpanded(!expanded)}
      />
      <DeletePageModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};

interface PageDetailsProps {
  page: WebPage | null;
  fetchPageError: boolean;
  loadingCurrentPage: boolean;
}

export const PageDetails: FC<PageDetailsProps> = ({
  page,
  fetchPageError,
  loadingCurrentPage,
}) => {
  const DetailsWrap: FC<{ children: ReactNode }> = ({ children }) => (
    <Section clsOuter={styles.pageDetailsOuter}>{children}</Section>
  );

  if (fetchPageError) {
    return (
      <DetailsWrap>
        <Error msg={'Error fetching page'} />
      </DetailsWrap>
    );
  }

  if (loadingCurrentPage) {
    return (
      <DetailsWrap>
        <Loading />
      </DetailsWrap>
    );
  }

  if (!page?.id) {
    // if api returns {detail: 'Not found.'}
    return (
      <DetailsWrap>
        <Error msg={'Page not found'} />
      </DetailsWrap>
    );
  }

  return (
    <DetailsWrap>
      <p>{page.title}</p>
      <p>{page.slug}</p>
      <p>{page.type}</p>
      <p>{page.notes}</p>
      <p>{formatDate(page.date_created)}</p>
    </DetailsWrap>
  );
};
