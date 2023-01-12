import type { FC } from 'react';
import type { PasswordValidationItemProps } from '../../../types/components/components';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '../../../icons/CheckIcon';
import CrossIcon from '../../../icons/CrossIcon';
import styles from './Item.module.scss';

const PasswordValidationItem: FC<PasswordValidationItemProps> = ({
  validCase,
  text
}) => {

  return (
    <li
      key={uuidv4()}
      className={
        validCase ?
          `${styles.item} ${styles.valid}`
        :
          `${styles.item}`
      }
    >
      {validCase ?
        <CheckIcon
          color="var(--valid)"
          height='14'
        />
      :
        <CrossIcon
          color="var(--warning)"
          height='14'
        />
      }

      {text}
    </li>
  );
};

export default PasswordValidationItem;