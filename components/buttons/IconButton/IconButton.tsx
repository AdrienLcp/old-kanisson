import type { FC } from 'react';
import type { IconButtonProps } from '../../../types/components/buttons';
import styles from './IconButton.module.scss';

const IconButton: FC<IconButtonProps> = ({
  title,
  label,
  disabled,
  handleFunction,
  children
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title}
      aria-label={title ? title : label}
      disabled={disabled}
      onClick={handleFunction}
    >
      {children}

      {label &&
        <label className={styles.button_label}>
          {label}
        </label>
      }
    </button>
  );
};

export default IconButton;