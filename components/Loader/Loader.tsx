import type { FC } from 'react';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.loader}>
        <span/>
        <span/>
      </div>
    </section>
  );
};