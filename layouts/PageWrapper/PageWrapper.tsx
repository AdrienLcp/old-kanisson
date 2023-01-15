import type { FC } from 'react';
import type { PageWrapperProps } from '../../types/layouts';
import styles from './PageWrapper.module.scss';

const PageWrapper: FC<PageWrapperProps> = ({
  title,
  subtitle,
  children
}) => {

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {title}
        </h1>

        {subtitle &&
          <span>
            {subtitle}
          </span>
        }
      </header>

      {children}

    </section>
  );
};

export default PageWrapper;