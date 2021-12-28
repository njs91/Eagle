import React, { VFC } from 'react';
import { Page } from '../../components/Page';
import { termsMeta } from '../MetaTags';

const Terms: VFC = () => (
    <Page meta={termsMeta}>
        <h1>Terms &amp; Conditinos</h1>
        <p>Content...</p>
    </Page>
);

export default Terms;
