import type { FC } from 'react';
import type { BurgerIconProps } from '../../types/components/buttons';
import styles from './BurgerIcon.module.scss';

export const BurgerIcon: FC<BurgerIconProps> = ({
  state,
}) => {
  return (
    <ul
      className={state ?
        `${styles.burger} ${styles.burger_active}`
      :
        `${styles.burger}`
      }
    >
      <li className={styles.dash} />
      <li className={styles.dash} />
      <li className={styles.dash} />
    </ul>
  );
};