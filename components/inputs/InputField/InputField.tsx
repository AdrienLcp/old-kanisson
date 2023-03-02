import type { FC, ChangeEvent } from 'react';
import type { InputFieldProps } from '../../../types/components/inputs';
import { useRef, useContext, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { clearTexts, limitTexts } from '../../../translations/components/inputs';
import { Button } from '../../buttons/Button/Button';
import CrossIcon from '../../../icons/CrossIcon';
import styles from './InputField.module.scss';

export const InputField: FC<InputFieldProps> = ({
  value,
  setValue,
  label,
  id,
  limit,
  title,
  name,
  type = "text",
  disabled = false,
  required = true,
  autoFocus = false,
  onKeyDown
}) => {

  const { lang } = useContext(LangContext);

  const clearButtonTitle = clearTexts.title[lang as keyof typeof clearTexts.title];
  const clearButtonLabel = clearTexts.label[lang as keyof typeof clearTexts.label];
  const limitRemaining = limitTexts.remaining[lang as keyof typeof limitTexts.remaining];
  const limitMaximum = limitTexts.maximum[lang as keyof typeof limitTexts.maximum];

  const limitText = limit && (limit - value.length) < 0 ? limitMaximum : limitRemaining;
  const limitLeft = limit && (limit - value.length) < 0 ? limit : limit && limit - value.length;

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
      title={title}
      aria-label={title}
      className={
        limit && (limit - value.length) < 0 ?
          `${styles.field} ${styles.warning}`
        :
          `${styles.field}`
      }
    >
      <input
        onKeyDown={onKeyDown}
        className={styles.input}
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        name={name}
      />

      <label
        htmlFor={id}
        className={styles.label}
      >
        {label}
      </label>

      <Button
        styles={styles.clear}
        type='reset'
        title={clearButtonTitle}
        aria-label={clearButtonLabel}
        tabIndex={-1}
        onClick={clear}
      >
        <CrossIcon height='18' />
      </Button>

      {limit &&
        <span className={styles.limit}>
          {limitLeft} {limitText}
        </span>
      }
    </div>
  );
};