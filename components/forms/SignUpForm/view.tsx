import type { FC } from 'react';
import type { SignUpFormProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { emailTexts, pseudoTexts } from '../../../translations/components/inputs';
import { rememberMeTexts, signInTexts } from '../../../translations/pages/login';

import CheckBox from '../../buttons/CheckBox/CheckBox';
import InputField from '../../inputs/InputField/InputField';
import PasswordValidation from '../../PasswordValidation/container';
import FormWrapper from '../../../layouts/wrappers/FormWrapper/FormWrapper';
import Message from '../../Message/Message';

const SignUpFormView: FC<SignUpFormProps> = ({
  handleSubmit,
  pseudo, setPseudo,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  rememberMe, setRememberMe,
  warningMessage, setWarningMessage,
  setValidPassword
}) => {

  const { lang } = useContext(LangContext);

  const pseudoInputLabel = pseudoTexts.label[lang as keyof typeof pseudoTexts.label];
  const pseudoInputTitle = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const emailInputLabel = emailTexts.label[lang as keyof typeof emailTexts.label];
  const emailInputTitle = emailTexts.title[lang as keyof typeof emailTexts.title];
  const submitLabel = signInTexts.submit.label[lang as keyof typeof signInTexts.submit.label];
  const submitTitle = signInTexts.submit.title[lang as keyof typeof signInTexts.submit.title];
  const checkBoxLabel = rememberMeTexts.label[lang as keyof typeof rememberMeTexts.label];
  const checkBoxTitle = rememberMeTexts.title[lang as keyof typeof rememberMeTexts.title];

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      submitLabel={submitLabel}
      submitTitle={submitTitle}
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
      />

      <Message
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
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

export default SignUpFormView;