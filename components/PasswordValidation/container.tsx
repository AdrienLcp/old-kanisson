import type { FC } from 'react';
import type { PasswordValidationProps, ValidCasesState } from '../../types/components/others';
import { useState, useContext, useEffect } from 'react';
import PasswordValidationView from './view';
import { LangContext } from '../../contexts/LangContext';
import { passwordTexts } from '../../langs/components/inputs';

const PasswordValidation: FC<PasswordValidationProps> = ({
  password, setPassword,
  confirmPassword, setConfirmPassword,
  setValidPassword
}) => {

  const { lang } = useContext(LangContext);

  const matchText = passwordTexts.match[lang as keyof typeof passwordTexts.match];

  const [validMessage, setValidMessage] = useState<string>('');
  const [validCases, setValidCases] = useState<ValidCasesState>({
    lowerCase: false,
    upperCase: false,
    number: false,
    special: false,
    lengthPass: false
  });

  useEffect(() => {
    if(password !== '' && password === confirmPassword) {
      setValidMessage(matchText);
    } else {
      setValidMessage('');
    };

    checkPassword()
  }, [password, confirmPassword]);

  const checkPassword = () => {
    const lowercase = new RegExp('(?=.*[a-z])');
    const uppercase = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');

    if(lowercase.test(password)) {
      setValidCases(state => ({...state, lowerCase: true}));
    } else {
      setValidCases(state => ({...state, lowerCase: false}));
    };

    if(uppercase.test(password)) {
      setValidCases(state => ({...state, upperCase: true}));
    } else {
      setValidCases(state => ({...state, upperCase: false}));
    };

    if(number.test(password)) {
      setValidCases(state => ({...state, number: true}));
    } else {
      setValidCases(state => ({...state, number: false}));
    };

    if(special.test(password)) {
      setValidCases(state => ({...state, special: true}));
    } else {745
      setValidCases(state => ({...state, special: false}));
    };

    if(length.test(password)) {
      setValidCases(state => ({...state, lengthPass: true}));
    } else {
      setValidCases(state => ({...state, lengthPass: false}));
    };

    if(lowercase.test(password)
    && uppercase.test(password)
    && number.test(password)
    && special.test(password)
    && length.test(password)) {
      setValidPassword(true);
    };
  };

  return (
    <PasswordValidationView
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      validMessage={validMessage}
      setValidMessage={setValidMessage}
      validCases={validCases}
    />
  );
};

export default PasswordValidation;