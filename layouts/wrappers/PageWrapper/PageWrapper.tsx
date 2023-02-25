import type { FC } from 'react';
import type { PageWrapperProps } from '../../../types/layouts';
import styles from './PageWrapper.module.scss';

export const PageWrapper: FC<PageWrapperProps> = ({
  title,
  subtitle,
  children
}) => {

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {title}
        </h1>

        {subtitle &&
          <h2 className={styles.subtitle}>
            {subtitle}
          </h2>
        }
      </header>

      <main className={styles.container}>
        {children}
      </main>
    </>
  );
};