import type { FC } from 'react';
import type { PasswordValidationViewProps } from '../../types/components/others';
import { useState, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { passwordTexts } from '../../translations/components/inputs';
import { InputPassword } from '../inputs/InputPassword/InputPassword';
import styles from './PasswordValidation.module.scss';
import { PasswordValidationItem } from './Item/Item';
import { Message } from '../Message/Message';

export const PasswordValidationView: FC<PasswordValidationViewProps> = ({
  password, setPassword,
  confirmPassword, setConfirmPassword,
  validMessage, setValidMessage,
  validCases,
  required
}) => {

  const { lang } = useContext(LangContext);
  const { logged } = useContext(UserContext);

  const newPasswordLabel = passwordTexts.newPassword[lang as keyof typeof passwordTexts.newPassword];
  const passwordLabel = passwordTexts.label[lang as keyof typeof passwordTexts.label];
  const passwordTitle = passwordTexts.title[lang as keyof typeof passwordTexts.title];
  const passwordConfirmLabel = passwordTexts.confirmLabel[lang as keyof typeof passwordTexts.confirmLabel];
  const passwordConfirmTitle = passwordTexts.confirmTitle[lang as keyof typeof passwordTexts.confirmTitle];

  const lowerText = passwordTexts.passLower[lang as keyof typeof passwordTexts.passLower];
  const upperText = passwordTexts.passUpper[lang as keyof typeof passwordTexts.passUpper];
  const numberText = passwordTexts.passNumber[lang as keyof typeof passwordTexts.passNumber];
  const specialText = passwordTexts.passSpecial[lang as keyof typeof passwordTexts.passSpecial];
  const lengthText = passwordTexts.passLength[lang as keyof typeof passwordTexts.passLength];

  const [toggleValidation, setToggleValidation] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.inputBox}
        onFocus={() => setToggleValidation(true)}
        onBlur={() => setToggleValidation(false)}
      >
        <InputPassword
          value={password}
          setValue={setPassword}
          id={'password'}
          title={passwordTitle}
          label={logged ? newPasswordLabel : passwordLabel}
          required={required}
        />
      </div>

      <div className={styles.inputBox}>
        <InputPassword
          value={confirmPassword}
          setValue={setConfirmPassword}
          id={'confirm-password'}
          title={passwordConfirmTitle}
          label={passwordConfirmLabel}
          required={required}
        />
      </div>

      <ul
        className={
          toggleValidation ?
            `${styles.list} ${styles.opened}`
          :
            `${styles.list}`
        }
      >
        <PasswordValidationItem
          validCase={validCases.lowerCase}
          text={lowerText}
        />

        <PasswordValidationItem
          validCase={validCases.upperCase}
          text={upperText}
        />

        <PasswordValidationItem
          validCase={validCases.number}
          text={numberText}
        />

        <PasswordValidationItem
          validCase={validCases.special}
          text={specialText}
        />

        <PasswordValidationItem
          validCase={validCases.lengthPass}
          text={lengthText}
        />
      </ul>

      <Message
        validMessage={validMessage}
        setValidMessage={setValidMessage}
      />
    </>
  );
};