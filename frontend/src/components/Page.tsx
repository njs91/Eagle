import React, { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import DocumentMeta from 'react-document-meta';
import styles from '../css/default.module.scss';

export const Page: React.FC<PageProps> = ({
  meta,
  children,
  clsPage,
  clsOuter,
  clsInner,
  fullWidth,
  showHeader = true,
  showFooter = true,
}) => {
  const pageClasses = `${styles.pageContainer} ${clsPage ? clsPage : ''}`;
  const outerClasses = `${styles.outer} ${clsOuter ? clsOuter : ''}`;
  const innerClasses = `${!fullWidth ? `${styles.inner} 'sometest'` : ''} ${
    clsInner ? clsInner : ''
  }`;

  return (
    <DocumentMeta {...meta}>
      <div className={pageClasses}>
        {showHeader && <Header />}
        <div className={outerClasses}>
          <div className={innerClasses}>{children}</div>
        </div>
        {showFooter && <Footer />}
      </div>
    </DocumentMeta>
  );
};

interface PageProps {
  meta: any;
  children: ReactNode;
  clsPage?: string;
  clsOuter?: string;
  clsInner?: string;
  fullWidth?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}
