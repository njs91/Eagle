import React, { FC } from 'react';
import styles from '../../css/default.module.scss';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ErrorProps {
    msg: string;
    marginTop?: boolean;
    cls?: string;
}

export const Error: FC<ErrorProps> = ({ msg, marginTop, cls = '' }) => (
    <div className={`${styles.errorText} ${cls} ${marginTop ? styles.marginTop : ''}`}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.error} /> <span>{msg}</span>
    </div>
);
