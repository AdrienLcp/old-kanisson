import type { FC, ChangeEvent } from 'react';
import type { InputAreaProps } from '../../../types/components/inputs';
import { useMemo } from 'react';
import styles from './TextArea.module.scss';

const TextArea: FC<InputAreaProps> = ({
  value,
  setValue,
  label,
  id,
  title,
  disabled = true,
  required = true
}) => {

  const handleChange = useMemo(
    () => (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <div
      className={styles.field}
      title={title ? title : undefined}
      aria-label={title ? title : undefined}
    >
      <textarea
        className={styles.input}
        value={value}
        id={id}
        required={required}
        disabled={disabled}
        onChange={e => handleChange(e)}
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