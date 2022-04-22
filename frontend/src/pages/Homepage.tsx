import React from 'react';
import { Page } from '../components/Page';
import { homepageMeta } from './MetaTags';
import styles from '../css/pages/homepage.module.scss';
import { HeroArea } from '../components/default/HeroArea';
import stickyNoteImg from '../images/homepage/sticky-note.jpg';

const Homepage: React.VFC = () => (
    <Page meta={homepageMeta} clsPage={styles.homepage} fullWidth={true}>
        <HeroArea
            title='Manage your SEO plans'
            description='Create new page plans, create tasks, assign keywords, etc.'
            buttonText='Find Out More'
            buttonLink='/styles'
            image={stickyNoteImg}
            imageAlt='Sticky Note'
        />
    </Page>
);

export default Homepage;
