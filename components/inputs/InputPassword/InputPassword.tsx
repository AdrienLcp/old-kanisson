import type { FC } from 'react';
import type { InputPasswordProps } from '../../../types/components/inputs';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { passwordTexts } from '../../../langs/components/inputs';
import styles from './InputPassword.module.scss';

import InputField from '../InputField/InputField';
import EyeIcon from '../../../icons/EyeIcon';
import CrossedOutEyeIcon from '../../../icons/CrossedOutEyeIcon';

const InputPassword: FC<InputPasswordProps> = ({
  value,
  setValue,
  label,
  id,
  title,
  required = true,
  disabled = false
}) => {

  const { lang } = useContext(LangContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const hideText = passwordTexts.hide[lang as keyof typeof passwordTexts.hide];
  const showText = passwordTexts.show[lang as keyof typeof passwordTexts.show];

  return(
    <div className={styles.input}>
      <InputField
        value={value}
        setValue={setValue}
        label={label}
        id={id}
        required={required}
        title={title}
        disabled={disabled}
        type={showPassword ? 'text' : 'password'}
      />

      {value.length > 0 &&
        <button
          className={styles.icon}
          type='button'
          tabIndex={-1}
          title={showPassword ? hideText : showText}
          aria-label={showPassword ? hideText : showText}
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <EyeIcon /> : <CrossedOutEyeIcon />}
        </button>
      }
    </div>
  );
};

export default InputPassword;