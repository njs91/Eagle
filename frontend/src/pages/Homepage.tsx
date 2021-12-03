import React from 'react';
import { Page } from '../components/Page';
import { Link } from 'react-router-dom';
import { homepageMeta } from './MetaTags';
import styles from '../css/pages/homepage.module.scss';

const Homepage: React.VFC = () => (
    <Page meta={homepageMeta} clsPage={styles.homepage}>
        <h1>Homepage</h1>
        <p>
            See <Link to='/styles'>style guide</Link> or <Link to='/pages'>pages</Link>
        </p>
    </Page>
);

export default Homepage;
