import React, { FC, ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import DocumentMeta from 'react-document-meta';
import styles from '../css/default.module.scss';

export const Page: FC<PageProps> = ({
    meta,
    children,
    fullWidth,
    clsPage = '',
    clsOuter = '',
    clsInner = '',
    clsHeader = '',
    clsFooter = '',
    showHeader = true,
    showFooter = true,
}) => {
    const pageClasses = `${styles.pageContainer} ${clsPage}`;
    const outerClasses = `${styles.outer} ${styles.mainBody} ${clsOuter}`;
    const innerClasses = `${!fullWidth ? styles.inner : ''} ${clsInner}`;

    return (
        <DocumentMeta {...meta}>
            <div className={pageClasses}>
                {showHeader && <Header cls={clsHeader} />}
                <div className={outerClasses}>
                    <div className={innerClasses}>{children}</div>
                </div>
                {showFooter && <Footer cls={clsFooter} />}
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
    clsHeader?: string;
    clsFooter?: string;
    fullWidth?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
}
