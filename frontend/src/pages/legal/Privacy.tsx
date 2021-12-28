import React, { VFC } from 'react';
import { Page } from '../../components/Page';
import { privacyMeta } from '../MetaTags';

const Privacy: VFC = () => (
    <Page meta={privacyMeta}>
        <h1>Privacy</h1>
        <p>Content...</p>
    </Page>
);

export default Privacy;
