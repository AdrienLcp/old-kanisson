import type { FC } from 'react';
import type { BurgerIconProps } from '../../types/componentsProps';
import styles from './BurgerIcon.module.scss';

const BurgerIcon: FC<BurgerIconProps> = ({
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

export default BurgerIcon;