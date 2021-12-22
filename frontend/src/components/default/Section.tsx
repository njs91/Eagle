import React, { FC, ReactNode } from 'react';
import styles from '../../css/default.module.scss';

interface SectionProps {
    children: ReactNode;
    clsOuter?: string;
    clsInner?: string;
    tag?: any;
    patterned?: boolean;
}

export const Section: FC<SectionProps> = ({
    children,
    clsOuter = '',
    clsInner = '',
    patterned,
    tag: Tag = 'section',
}) => {
    const outerClasses = `${styles.outer} ${patterned ? styles.patterned : ''} ${clsOuter}`;
    const innerClasses = `${styles.inner} ${clsInner}`;

    return (
        <Tag className={outerClasses}>
            <div className={innerClasses}>{children}</div>
        </Tag>
    );
};
