import type { FC } from 'react';
import type { CheckBoxProps } from '../../../types/components/inputs';
import { Button } from '../Button/Button';
import styles from './CheckBox.module.scss';

export const CheckBox: FC<CheckBoxProps> = ({
  state,
  setState,
  id,
  title,
  label
}) => {

  return (
    <Button
      styles={styles.button}
      title={title}
      onClick={() => setState(prev => !prev)}
    >
      <label
        className={styles.switch}
        htmlFor={id}
      >
        <input
          className={styles.input}
          type='checkbox'
          id={id}
          checked={state}
          readOnly
          onClick={() => setState(prev => !prev)}
        />
        <div className={styles.slider} />
      </label>

      {label &&
        <span className={styles.label}>
          {label}
        </span>
      }
    </Button>
  );
};