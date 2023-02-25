import type { FC } from 'react';
import type { ArrowButtonProps } from '../../../types/components/buttons';
import ArrowIcon from '../../../icons/ArrowIcon';
import styles from './ArrowButton.module.scss';
import { Button } from '../Button/Button';

export const ArrowButton: FC<ArrowButtonProps> = ({
  handleFunction,
  title,
  disabled,
  side
}) => {

  return (
    <Button
      styles={side.includes('left') ?
        `${styles.button} ${styles.button_left}`
      :
        `${styles.button} ${styles.button_right}`
      }
      title={title}
      disabled={disabled}
      onClick={handleFunction}
    >
      <ArrowIcon color="var(--white)" />
    </Button>
  );
};