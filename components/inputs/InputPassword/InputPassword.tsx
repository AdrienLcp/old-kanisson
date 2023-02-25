import type { FC } from 'react';
import type { InputPasswordProps } from '../../../types/components/inputs';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { passwordTexts } from '../../../translations/components/inputs';
import { InputField } from '../InputField/InputField';
import { Button } from '../../buttons/Button/Button';
import styles from './InputPassword.module.scss';
import EyeIcon from '../../../icons/EyeIcon';
import CrossedOutEyeIcon from '../../../icons/CrossedOutEyeIcon';

export const InputPassword: FC<InputPasswordProps> = ({
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
        <Button
          styles={styles.icon}
          tabIndex={-1}
          title={showPassword ? hideText : showText}
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? <EyeIcon /> : <CrossedOutEyeIcon />}
        </Button>
      }
    </div>
  );
};