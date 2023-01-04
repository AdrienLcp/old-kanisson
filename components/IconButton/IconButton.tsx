import type { FC } from 'react';
import type { IconButtonProps } from '../../types/componentsProps';
import styles from './IconButton.module.scss';

const IconButton: FC<IconButtonProps> = ({
  title,
  name,
  handleFunction,
  children
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title ? title : ''}
      aria-label={title ? title : name}
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