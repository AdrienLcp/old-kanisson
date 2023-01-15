import type { FC } from 'react';
import type { UpdateUserFormProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { emailTexts, passwordTexts, pseudoTexts } from '../../../langs/components/inputs';
import { submitButton } from '../../../langs/components/updateUser';
import InputField from '../../inputs/InputField/InputField';
import PasswordValidation from '../../PasswordValidation/container';
import ValidMessage from '../../ValidMessage/ValidMessage';
import WarningMessage from '../../WarningMessage/WarningMessage';
import FormWrapper from '../../../layouts/FormWrapper/FormWrapper';
import InputPassword from '../../inputs/InputPassword/InputPassword';

const UpdateUserFormView: FC<UpdateUserFormProps> = ({
  handleSubmit,
  pseudo, setPseudo,
  email, setEmail,
  previousPassword, setPreviousPassword,
  newPassword, setNewPassword,
  confirmPassword, setConfirmPassword,
  validMessage, setValidMessage,
  warningMessage, setWarningMessage,
  setValidPassword
}) => {

  const { lang } = useContext(LangContext);

  const submitLabelText = submitButton.label[lang as keyof typeof submitButton.label];
  const submitTitleText = submitButton.title[lang as keyof typeof submitButton.title];
  const pseudoLabel = pseudoTexts.label[lang as keyof typeof pseudoTexts.label];
  const pseudoTitle = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const emailLabel = emailTexts.label[lang as keyof typeof emailTexts.label];
  const emailTitle = emailTexts.title[lang as keyof typeof emailTexts.title];
  const passwordLabel = passwordTexts.label[lang as keyof typeof passwordTexts.label];

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      submitLabel={submitLabelText}
      submitTitle={submitTitleText}
    >
      <InputField
        value={pseudo}
        setValue={setPseudo}
        id="update-user-pseudo-input"
        label={pseudoLabel}
        title={pseudoTitle}
      />

      <InputField
        value={email}
        setValue={setEmail}
        id="update-user-email-input"
        label={emailLabel}
        title={emailTitle}
      />

      <InputPassword
        value={previousPassword}
        setValue={setPreviousPassword}
        id="update-user-previous-password"
        label={passwordLabel}
      />

      <PasswordValidation
        password={newPassword}
        setPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        setValidPassword={setValidPassword}
      />

      {validMessage &&
        <ValidMessage
          message={validMessage}
          setMessage={setValidMessage}
        />
      }

      {warningMessage &&
        <WarningMessage
          message={warningMessage}
          setMessage={setWarningMessage}
        />
      }

    </FormWrapper>
  );
};

export default UpdateUserFormView;