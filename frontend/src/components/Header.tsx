import React, { FC } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Link } from 'react-router-dom';
import { Section } from './Default';
import defaultStyles from '../css/default.module.scss';

interface HeaderProps {
    cls?: string;
}

const links = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'About',
        url: '/about',
    },
    {
        title: 'Pages',
        url: '/pages',
    },
];

export const Header: FC<HeaderProps> = ({ cls = '' }) => (
    <Section clsOuter={`${headerStyles.headerOuter} ${cls}`} clsInner={headerStyles.headerInner} tag='header'>
        <h2>SEOTHING</h2>
        <div className={headerStyles.rightArea}>
            <ul>
                {links.map((link) => (
                    <li key={link.title}>
                        <Link to={link.url}>{link.title}</Link>
                    </li>
                ))}
            </ul>
            <button className={defaultStyles.btnSecondary}>Login</button>
        </div>
    </Section>
);
