import React, { FC } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Section } from './Default';

interface HeaderProps {
    cls?: string;
}

export const Header: FC<HeaderProps> = ({ cls = '' }) => (
    <Section clsOuter={`${headerStyles.headerOuter} ${cls}`} clsInner={headerStyles.headerInner} tag='header'>
        <h2>Header</h2>
    </Section>
);
