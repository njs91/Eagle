import React, { FC } from 'react';
import footerStyles from '../css/components/footer.module.scss';
import { Section } from './default/Section';
import { Link } from 'react-router-dom';

interface FooterProps {
    cls?: string;
}

export const Footer: FC<FooterProps> = ({ cls = '' }) => {
    const name = undefined;
    const year = new Date().getFullYear();
    const copyrightMsg = `\u00A9 ${name || window.location.host} 2021 - ${year}. All Rights Reserved.`;

    return (
        <Section clsOuter={`${footerStyles.footerOuter} ${cls}`} clsInner={footerStyles.footerInner} tag='footer'>
            <span>{copyrightMsg}</span>
            <ul>
                <li>
                    <Link to='/terms'>Terms</Link>
                </li>
                <li>
                    <Link to='/privacy'>Privacy</Link>
                </li>
            </ul>
        </Section>
    );
};
