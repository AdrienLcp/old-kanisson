import type { FC } from 'react';
import type { IconButtonProps } from '../../../types/components/buttons';
import { Button } from '../Button/Button';
import styles from './IconButton.module.scss';

export const IconButton: FC<IconButtonProps> = ({
  title,
  label,
  disabled,
  handleFunction,
  children
}) => {

  return (
    <Button
      styles={styles.button}
      title={title ? title : label}
      disabled={disabled}
      onClick={handleFunction}
    >
      {children}

      {label &&
        <label className={styles.button_label}>
          {label}
        </label>
      }
    </Button>
  );
};