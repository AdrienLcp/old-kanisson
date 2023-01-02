import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { useRef, useContext } from 'react';
import CrossIcon from '../../icons/CrossIcon';
import styles from './InputField.module.scss';
import { LangContext } from '../../contexts/LangContext';
import { inputsTexts } from '../../langs/components/inputs';

type Props = {
  state: string,
  setState: Dispatch<SetStateAction<string>>
  name: string,
  id: string,
  title?: string,
  type?: string,
  disabled?: boolean,
  required?: boolean,
  autoFocus?: boolean,
};

const InputField: FunctionComponent<Props> = ({
  state,
  setState,
  name,
  id,
  title,
  type = "text",
  disabled = false,
  required = true,
  autoFocus = false
}) => {

  const { lang } = useContext(LangContext);

  const clearButtonTitle = inputsTexts.clear.title[lang as keyof typeof inputsTexts.clear.title];
  const clearButtonLabel = inputsTexts.clear.label[lang as keyof typeof inputsTexts.clear.label];

  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    inputRef.current?.focus();
    setState('');
  };

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
        value={state}
        onChange={e => setState(e.target.value)}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />

      <label
        htmlFor={id}
        className={styles.label}
      >
        {name}
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