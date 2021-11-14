import React from 'react';
import { Page } from '../components/Page';
import { pageNotFoundMeta } from './MetaTags';

const NotFound: React.VFC = () => (
  <Page meta={pageNotFoundMeta}>
    <h1>Page Not Found</h1>
  </Page>
);

export default NotFound;
