import React, { FC, useState } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Link } from 'react-router-dom';
import { Section } from './Default';
import defaultStyles from '../css/default.module.scss';
import { faAngleRight, faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface HeaderProps {
    cls?: string;
}

export const Header: FC<HeaderProps> = ({ cls = '' }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Section clsOuter={`${headerStyles.headerOuter} ${cls}`} clsInner={headerStyles.headerInner} tag='header'>
            <h2>
                <Link to='/'>SEOTHING</Link>
            </h2>
            <div className={headerStyles.rightArea}>
                <FontAwesomeIcon icon={menuOpen ? faTimesCircle : faBars} onClick={() => setMenuOpen(!menuOpen)} />
                <div className={`${headerStyles.rightAreaInner} ${menuOpen ? headerStyles.open : ''}`}>
                    <ul>
                        {links.map((link) => (
                            <li key={link.title}>
                                <Link to={link.url}>
                                    {link.title}
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </Link>
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
};

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
