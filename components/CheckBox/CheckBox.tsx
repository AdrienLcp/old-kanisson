import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import styles from './CheckBox.module.scss';

type Props = {
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  id: string,
  label: string,
  title?: string
};

const CheckBox: FunctionComponent<Props> = ({
  state,
  setState,
  id,
  label,
  title,
}) => {

  return (
    <div
      className={styles.wrapper}
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

      <p className={styles.label}>
        {label}
      </p>
    </div>
  );
};

export default CheckBox;