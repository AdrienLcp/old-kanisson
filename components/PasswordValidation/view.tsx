import type { FC } from 'react';
import type { PasswordValidationViewProps } from '../../types/components/components';
import { useState, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { passwordTexts } from '../../langs/components/inputs';
import { v4 as uuidv4 } from 'uuid';
import InputPassword from '../inputs/InputPassword/InputPassword';
import styles from './PasswordValidation.module.scss';

const PasswordValidationView: FC<PasswordValidationViewProps> = ({
  password, setPassword,
  confirmPassword, setConfirmPassword,
  checkPassword,
  checkPasswordsMatch,
  validCases,
  validMessage
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
        onKeyUp={() => {
          checkPassword();
          checkPasswordsMatch();
        }}
      >
        <InputPassword
          value={password}
          setValue={setPassword}
          id={'password'}
          title={passwordTitle}
          label={logged ? newPasswordLabel : passwordLabel}
        />
      </div>

      <div
        className={styles.inputBox}
        onKeyUp={() => checkPasswordsMatch()}
      >
        <InputPassword
          value={confirmPassword}
          setValue={setConfirmPassword}
          id={'confirm-password'}
          title={passwordConfirmTitle}
          label={passwordConfirmLabel}
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
        <li
          key={uuidv4()}
          className={
            validCases.lowerCase ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
        >
          {lowerText}
        </li>
        <li
          key={uuidv4()}
          className={
            validCases.upperCase ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
        >
          {upperText}
        </li>
        <li
          key={uuidv4()}
          className={
            validCases.number ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
        >
          {numberText}
        </li>
        <li
          key={uuidv4()}
          className={
            validCases.special ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
        >
          {specialText}
        </li>
        <li
          key={uuidv4()}
          className={
            validCases.lengthPass ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
        >
          {lengthText}
        </li>
      </ul>

      {validMessage &&
        // créer une composant notif
        <span></span>
      }
    </>
  );
};

export default PasswordValidationView;