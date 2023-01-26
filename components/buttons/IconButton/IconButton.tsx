import type { FC } from 'react';
import type { IconButtonProps } from '../../../types/components/buttons';
import styles from './IconButton.module.scss';

const IconButton: FC<IconButtonProps> = ({
  title,
  name,
  disabled,
  handleFunction,
  children
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title}
      aria-label={title ? title : name}
      disabled={disabled}
      onClick={handleFunction}
    >
      {children}

      {name &&
        <label className={styles.button_label}>
          {name}
        </label>
      }
    </button>
  );
};

export default IconButton;