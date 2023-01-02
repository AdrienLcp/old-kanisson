import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import styles from './TextArea.module.scss';

type Props = {
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  label: string,
  id: string,
  title?: string,
  disabled?: boolean
  required?: boolean
};

const TextArea: FunctionComponent<Props> = ({
  state,
  setState,
  label,
  id,
  title,
  disabled = true,
  required = true
}) => {

  return (
    <div
      className={styles.field}
      title={title ? title : undefined}
      aria-label={title ? title : undefined}
    >

      <textarea
        className={styles.input}
        value={state}
        id={id}
        required={required}
        disabled={disabled}
        onChange={e => setState(e.target.value)}
      />

      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>

    </div>
  );
};

export default TextArea;