import type { FC } from 'react';
import type { InputAreaProps } from '../../types/componentsProps';
import styles from './TextArea.module.scss';

const TextArea: FC<InputAreaProps> = ({
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