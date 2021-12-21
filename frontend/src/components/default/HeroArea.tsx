import React, { FC } from 'react';
import { Section } from '../Default';
import styles from '../../css/components/default/hero.module.scss';
import defaultStyles from '../../css/default.module.scss';
import { Link } from 'react-router-dom';

interface HeroAreaProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    clsOuter?: string;
    clsInner?: string;
    clsBtn?: string;
    fullWidth?: boolean;
    image?: string;
}

export const HeroArea: FC<HeroAreaProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    clsOuter = '',
    clsInner = '',
    clsBtn = defaultStyles.btnPrimary,
    fullWidth,
    image,
}) => {
    const outerClasses = `${styles.heroAreaOuter} ${clsOuter}`;
    const innerClasses = `${styles.heroAreaInner} ${fullWidth ? styles.fullWidth : ''} ${clsInner}`;

    return (
        <Section clsOuter={outerClasses} clsInner={innerClasses} tag='section'>
            <div className={styles.textAndButtonContainer}>
                <h1>{title}</h1>
                <p>{description}</p>
                <Link to={buttonLink} className={clsBtn}>
                    {buttonText}
                </Link>
            </div>
            {image && <img src={image} />}
        </Section>
    );
};
