import { FC, ReactNode } from 'react';
import styles from '../css/default.module.scss';
import LoadingImage from '../images/loading.svg';

export const Section: FC<SectionProps> = ({
  children,
  clsOuter,
  clsInner,
  patterned,
  tag: Tag = 'section',
}) => {
  const outerClasses = `${styles.outer} ${patterned ? styles.patterned : ''} ${
    clsOuter ? clsOuter : ''
  }`;
  const innerClasses = `${styles.inner} ${clsInner ? clsInner : ''}`;

  return (
    <Tag className={outerClasses}>
      <div className={innerClasses}>{children}</div>
    </Tag>
  );
};

interface SectionProps {
  children: ReactNode;
  clsOuter?: string;
  clsInner?: string;
  tag?: any;
  patterned?: boolean;
}

export const Loading: FC<{ clsOuter?: string }> = ({ clsOuter }) => (
  <div className={clsOuter ? clsOuter : ''}>
    <img src={LoadingImage} alt='Loading' />
  </div>
);

export const Error: FC<{ msg: string }> = ({ msg }) => (
  <p className={styles.errorText}>{msg}</p>
);
