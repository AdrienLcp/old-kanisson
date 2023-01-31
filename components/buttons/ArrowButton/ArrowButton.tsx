import type { FC } from 'react';
import type { ArrowButtonProps } from '../../../types/components/buttons';
import ArrowIcon from '../../../icons/ArrowIcon';
import styles from './ArrowButton.module.scss';

const ArrowButton: FC<ArrowButtonProps> = ({
  handleFunction,
  title,
  disabled,
  side
}) => {

  return (
    <button
      className={side.includes('left') ?
        `${styles.button} ${styles.button_left}`
      :
        `${styles.button} ${styles.button_right}`
      }
      type="button"
      title={title}
      disabled={disabled}
      onClick={handleFunction}
    >
      <ArrowIcon color="var(--white)" />
    </button>
  );
};

export default ArrowButton;