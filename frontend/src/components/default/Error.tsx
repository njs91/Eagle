import React, { FC } from 'react';
import styles from '../../css/default.module.scss';

interface ErrorProps {
    msg: string;
    marginTop?: boolean;
}

export const Error: FC<ErrorProps> = ({ msg, marginTop }) => (
    <p className={`${styles.errorText} ${marginTop ? styles.marginTop : ''}`}>{msg}</p>
);
