import React from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Section } from './Default';

export const Header: React.VFC = () => (
  <Section clsOuter={headerStyles.header} tag='header'>
    <h2>Header</h2>
  </Section>
);
