import styles from '../css/default.module.scss';

export const Section: React.FC<SectionProps> = ({
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
  children: React.ReactNode;
  clsOuter?: string;
  clsInner?: string;
  tag?: any;
  patterned?: boolean;
}

// export const Section: FC<SectionProps> = ({ children }) => (
//   <section className={styles.outerSection}>
//     <div className={styles.inner}>{children}</div>
//   </section>
// );

// export const SectionsContainer: FC<SectionsContainerProps> = ({
//   patterned,
//   children,
// }) => (
//   <div {...(patterned ? { className: styles.patterned } : '')}>{children}</div>
// );

// interface SectionProps {
//   children: ReactNode;
// }

// interface SectionsContainerProps {
//   patterned?: boolean;
//   children: ReactNode;
// }

// .outerSection {
//   padding: $content-vertical-padding 0;

//   .patterned & {
//     // padding: $content-vertical-padding 0;

//     &:nth-child(odd) {
//       background-color: $white;
//     }
//     &:nth-child(even) {
//       background-color: $grey-light;
//     }
//   }
// }
