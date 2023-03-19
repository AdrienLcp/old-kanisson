import type { FC } from 'react';
import type { PageWrapperProps } from '../../../types/layouts';
import { Footer } from '../../Footer/Footer';
import styles from './PageWrapper.module.scss';

export const PageWrapper: FC<PageWrapperProps> = ({
  title,
  subtitle,
  children
}) => {

  return (
    <>
      <div className={styles.wrapper}>
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
      </div>

      <Footer />
    </>
  );
};