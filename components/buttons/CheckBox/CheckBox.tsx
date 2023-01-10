import type { FC } from 'react';
import type { CheckBoxProps } from '../../../types/components/inputs';
import styles from './CheckBox.module.scss';

const CheckBox: FC<CheckBoxProps> = ({
  state,
  setState,
  id,
  title,
  label
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title ? title : undefined}
      aria-label={title ? title : undefined}
      onClick={() => setState(prev => !prev)}
    >
      <label
        className={styles.switch}
        htmlFor={id}
      >
        <input
          className={styles.input}
          type="checkbox"
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
    </button>
  );
};

export default CheckBox;