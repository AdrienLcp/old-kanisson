import type { FC, ChangeEvent } from 'react';
import type { InputFieldProps } from '../../../types/components/inputs';
import { useRef, useContext, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { clearTexts } from '../../../langs/components/inputs';
import styles from './InputField.module.scss';

import CrossIcon from '../../../icons/CrossIcon';

const InputField: FC<InputFieldProps> = ({
  value,
  setValue,
  label,
  id,
  title,
  type = "text",
  disabled = false,
  required = true,
  autoFocus = false
}) => {

  const { lang } = useContext(LangContext);

  const clearButtonTitle = clearTexts.title[lang as keyof typeof clearTexts.title];
  const clearButtonLabel = clearTexts.label[lang as keyof typeof clearTexts.label];

  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    inputRef.current?.focus();
    setValue('');
  };

  const handleChange = useMemo(
    () => (event: ChangeEvent<HTMLInputElement>) => {
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
      <input
        className={styles.input}
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />

      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>

      <button
        className={styles.clear}
        type="button"
        title={clearButtonTitle}
        aria-label={clearButtonLabel}
        tabIndex={-1}
        onClick={clear}
      >
        <CrossIcon height='18'/>
      </button>
    </div>
  );
};

export default InputField;