import type { FC } from 'react';
import type { SignUpFormProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { emailTexts, pseudoTexts } from '../../../translations/components/inputs';
import { rememberMeTexts, signUpTexts } from '../../../translations/pages/login';
import { CheckBox } from '../../buttons/CheckBox/CheckBox';
import { InputField } from '../../inputs/InputField/InputField';
import { PasswordValidation } from '../../PasswordValidation/container';
import { FormWrapper } from '../../../layouts/wrappers/FormWrapper/FormWrapper';
import { Message } from '../../Message/Message';

export const SignUpFormView: FC<SignUpFormProps> = ({
  handleSubmit,
  pseudo, setPseudo,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  rememberMe, setRememberMe,
  validMessage, setValidMessage,
  warningMessage, setWarningMessage,
  setValidPassword,
  loading
}) => {

  const { lang } = useContext(LangContext);

  const pseudoInputLabel = pseudoTexts.label[lang as keyof typeof pseudoTexts.label];
  const pseudoInputTitle = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const emailInputLabel = emailTexts.label[lang as keyof typeof emailTexts.label];
  const emailInputTitle = emailTexts.title[lang as keyof typeof emailTexts.title];
  const submitLabel = signUpTexts.submit.label[lang as keyof typeof signUpTexts.submit.label];
  const submitTitle = signUpTexts.submit.title[lang as keyof typeof signUpTexts.submit.title];
  const checkBoxLabel = rememberMeTexts.label[lang as keyof typeof rememberMeTexts.label];
  const checkBoxTitle = rememberMeTexts.title[lang as keyof typeof rememberMeTexts.title];

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      submitLabel={submitLabel}
      submitTitle={submitTitle}
      loading={loading}
    >
      <InputField
        value={pseudo}
        setValue={setPseudo}
        label={pseudoInputLabel}
        title={pseudoInputTitle}
        id='sign-up-pseudo-input'
        limit={30}
      />

      <InputField
        value={email}
        setValue={setEmail}
        label={emailInputLabel}
        title={emailInputTitle}
        id='sign-up-email-input'
      />

      <PasswordValidation
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        setValidPassword={setValidPassword}
        setValidMessage={setValidMessage}
      />

      <Message
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
        validMessage={validMessage}
        setValidMessage={setValidMessage}
      />

      <CheckBox
        state={rememberMe}
        setState={setRememberMe}
        id='sign-in-remember-me-switch'
        label={checkBoxLabel}
        title={checkBoxTitle}
      />
    </FormWrapper>
  );
};