import React from 'react';
import footerStyles from '../css/components/footer.module.scss';
import { Section } from './Default';

export const Footer: React.VFC = () => (
  <Section clsOuter={footerStyles.footer} tag='footer'>
    <h2>Footer</h2>
  </Section>
);
