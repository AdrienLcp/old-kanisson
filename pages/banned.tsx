import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import { LangContext } from '../contexts/LangContext';
import { UserContext } from '../contexts/UserContext';
import { bannedHeadTexts } from '../translations/layouts/head';
import { messages } from '../translations/others/error';
import { bannedTexts } from '../translations/pages/banned';
import { confirmModalTexts } from '../translations/pages/profile';
import { NextHead } from '../layouts/Head/Head';
import { PageWrapper } from '../layouts/wrappers/PageWrapper/PageWrapper';
import { ConfirmModal } from '../components/ConfirmModal/ConfirmModal';
import { ContactForm } from '../components/forms/ContactForm/ContactForm';
import { Message } from '../components/Message/Message';
import { Button } from '../components/buttons/Button/Button';
import styles from '../styles/Banned.module.scss';

const Banned: NextPage = () => {

  const router = useRouter();
  const { lang } = useContext(LangContext);
  const { user, setUser, setLogged } = useContext(UserContext);

  useEffect(() => {
    if(!user.banned) router.push('/');
  }, [user]);

  // Translated texts
  const headTitle = bannedHeadTexts.title[lang as keyof typeof bannedHeadTexts.title];
  const pageTitle = bannedTexts.title[lang as keyof typeof bannedTexts.title];
  const pageSubtitle = bannedTexts.subtitle[lang as keyof typeof bannedTexts.subtitle];
  const buttonLabel = bannedTexts.button.label[lang as keyof typeof bannedTexts.button.label];
  const buttonTitle = bannedTexts.button.title[lang as keyof typeof bannedTexts.button.title];
  const deletedAccountText = bannedTexts.accountDeleted[lang as keyof typeof bannedTexts.accountDeleted];
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];
  const modalTitle = confirmModalTexts.title[lang as keyof typeof confirmModalTexts.title];
  const modalContent = confirmModalTexts.content[lang as keyof typeof confirmModalTexts.content];

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [validMessage, setValidMessage] = useState<string>('');
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const disconnectUser = () => {
    setLogged(false);
    setUser({
      id: '',
      pseudo: '',
      email: '',
      password: '',
      admin: false,
      moderator: false,
      banned: false
    });

    // Push user to home page
    router.push('/');
  };

  const deleteAccount = async() => {
    // Get token from local storage, for authorization
    const token = localStorage.getItem('token');

    // delete user from database
    await fetch(`${api}/user/deleteBannedUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `${token}`
      },
      body: JSON.stringify({ user_id: user.id})
    })
    .then((res) => {
      if(res.ok) {
        // Set messages to notify user
        setWarningMessage('');
        setValidMessage(deletedAccountText);
        disconnectUser();
      } else {
        setWarningMessage(errorMessage);
      };
    })
    .catch((error) => {
      setWarningMessage(errorMessage);
      console.log(error);
    });
  };

  return (
    <>
      <NextHead title={headTitle} />

      <PageWrapper
        title={pageTitle}
        subtitle={pageSubtitle}
      >
        <ContactForm />

        <Message
          validMessage={validMessage}
          setValidMessage={setValidMessage}
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />

        <Button
          styles={styles.button}
          title={buttonTitle}
          onClick={() => setToggleModal(true)}
        >
          {buttonLabel}
        </Button>

        {toggleModal &&
          <ConfirmModal
            title={modalTitle}
            content={modalContent}
            handleFunction={deleteAccount}
            setToggleModal={setToggleModal}
          />
        }
      </PageWrapper>
    </>
  );
};

export default Banned;