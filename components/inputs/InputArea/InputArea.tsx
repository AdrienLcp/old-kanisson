import type { FC, ChangeEvent } from 'react';
import type { InputAreaProps } from '../../../types/components/inputs';
import { useMemo, useContext } from 'react';
import styles from './InputArea.module.scss';
import { LangContext } from '../../../contexts/LangContext';
import { limitTexts } from '../../../translations/components/inputs';

export const InputArea: FC<InputAreaProps> = ({
  value,
  setValue,
  label,
  id,
  title,
  name,
  disabled = false,
  required = true,
  limit
}) => {

  const { lang } = useContext(LangContext);

  const limitRemaining = limitTexts.remaining[lang as keyof typeof limitTexts.remaining];
  const limitMaximum = limitTexts.maximum[lang as keyof typeof limitTexts.maximum];

  const limitText = limit && (limit - value.length) < 0 ? limitMaximum : limitRemaining;
  const limitLeft = limit && (limit - value.length) < 0 ? limit : limit && limit - value.length;

  const handleChange = useMemo(
    () => (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        className={styles.input}
        value={value}
        id={id}
        name={name}
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

      {limit &&
        <span className={styles.limit}>
          {limitLeft} {limitText}
        </span>
      }
    </div>
  );
};