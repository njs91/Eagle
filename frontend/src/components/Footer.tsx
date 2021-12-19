import React, { FC } from 'react';
import footerStyles from '../css/components/footer.module.scss';
import { Section } from './Default';

interface FooterProps {
    cls?: string;
}

export const Footer: FC<FooterProps> = ({ cls = '' }) => (
    <Section clsOuter={`${footerStyles.footer} ${cls}`} tag='footer'>
        <h2>Footer</h2>
    </Section>
);
