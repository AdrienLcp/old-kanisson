import type { FC } from 'react';
import type { UpdateUserFormProps } from '../../../types/components/forms';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { emailTexts, passwordTexts, pseudoTexts } from '../../../langs/components/inputs';
import { confirmModalTexts, deleteAccountButtonText } from '../../../langs/pages/profile';
import { submitButton } from '../../../langs/components/updateUser';
import styles from './UpdateUserForm.module.scss';
import InputField from '../../inputs/InputField/InputField';
import PasswordValidation from '../../PasswordValidation/container';
import ValidMessage from '../../ValidMessage/ValidMessage';
import WarningMessage from '../../WarningMessage/WarningMessage';
import FormWrapper from '../../../layouts/FormWrapper/FormWrapper';
import InputPassword from '../../inputs/InputPassword/InputPassword';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

const UpdateUserFormView: FC<UpdateUserFormProps> = ({
  handleSubmit,
  pseudo, setPseudo,
  email, setEmail,
  previousPassword, setPreviousPassword,
  newPassword, setNewPassword,
  confirmPassword, setConfirmPassword,
  validMessage, setValidMessage,
  warningMessage, setWarningMessage,
  setValidPassword,
  deleteAccount
}) => {

  const { lang } = useContext(LangContext);

  const submitLabelText = submitButton.label[lang as keyof typeof submitButton.label];
  const submitTitleText = submitButton.title[lang as keyof typeof submitButton.title];
  const pseudoLabel = pseudoTexts.label[lang as keyof typeof pseudoTexts.label];
  const pseudoTitle = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const emailLabel = emailTexts.label[lang as keyof typeof emailTexts.label];
  const emailTitle = emailTexts.title[lang as keyof typeof emailTexts.title];
  const passwordLabel = passwordTexts.label[lang as keyof typeof passwordTexts.label];
  const buttonLabel = deleteAccountButtonText.label[lang as keyof typeof deleteAccountButtonText.label];
  const buttonTitle = deleteAccountButtonText.title[lang as keyof typeof deleteAccountButtonText.title];
  const modalTitle = confirmModalTexts.title[lang as keyof typeof confirmModalTexts.title];
  const modalContent = confirmModalTexts.content[lang as keyof typeof confirmModalTexts.content];

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  return (
    <section className={styles.container}>
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
          required={false}
        />

        <PasswordValidation
          password={newPassword}
          setPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setValidPassword={setValidPassword}
          required={false}
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

      <button
        className={styles.button}
        type='button'
        title={buttonTitle}
        aria-label={buttonTitle}
        onClick={() => setToggleModal(true)}
      >
        {buttonLabel}
      </button>

      {toggleModal &&
        <ConfirmModal
          title={modalTitle}
          content={modalContent}
          handleFunction={deleteAccount}
          setToggleModal={setToggleModal}
        />
      }
    </section>
  );
};

export default UpdateUserFormView;