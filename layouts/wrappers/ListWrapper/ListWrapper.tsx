import type { FC } from 'react';
import type { ListWrapperProps } from '../../../types/layouts';
import styles from './ListWrapper.module.scss';

const ListWrapper: FC<ListWrapperProps> = ({
  title,
  children
}) => {

  return (
    <section className={styles.wrapper}>
      <header>
        <h2 className={styles.title}>
          {title}
        </h2>
      </header>

      <section className={styles.container}>
        {children}
      </section>
    </section>
  );
};

export default ListWrapper;