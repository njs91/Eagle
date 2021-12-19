import React from 'react';
import { Page } from '../components/Page';
import { aboutMeta } from './MetaTags';

const About: React.VFC = () => (
    <Page meta={aboutMeta}>
        <h1>About</h1>
        <p>Content...</p>
    </Page>
);

export default About;
