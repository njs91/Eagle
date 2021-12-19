import React, { FC } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Link } from 'react-router-dom';
import { Section } from './Default';
import defaultStyles from '../css/default.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <h2>
            <Link to='/'>SEOTHING</Link>
        </h2>
        <div className={headerStyles.rightArea}>
            <FontAwesomeIcon icon={faBars} />
            <div className={headerStyles.rightAreaInner}>
                <ul>
                    {links.map((link) => (
                        <li key={link.title}>
                            <Link to={link.url}>{link.title}</Link>
                        </li>
                    ))}
                </ul>
                <Link to='/login' className={defaultStyles.btnSecondary}>
                    Login
                </Link>
            </div>
        </div>
    </Section>
);
