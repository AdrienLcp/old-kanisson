import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import ContactForm from '../components/forms/ContactForm/ContactForm';
import ValidMessage from '../components/ValidMessage/ValidMessage';
import WarningMessage from '../components/WarningMessage/WarningMessage';
import { LangContext } from '../contexts/LangContext';
import { UserContext } from '../contexts/UserContext';
import { bannedHeadTexts } from '../langs/layouts/head';
import { messages } from '../langs/others/error';
import { bannedTexts } from '../langs/pages/banned';
import NextHead from '../layouts/Head/Head';
import styles from '../styles/Banned.module.scss';

const Banned: NextPage = () => {

  const router = useRouter();
  const { lang } = useContext(LangContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if(!user.banned) {
      router.push('/');
    };
  }, []);

  // Translated texts
  const headTitle = bannedHeadTexts.title[lang as keyof typeof bannedHeadTexts.title];
  const pageTitle = bannedTexts.title[lang as keyof typeof bannedTexts.title];
  const pageSubtitle = bannedTexts.subtitle[lang as keyof typeof bannedTexts.subtitle];
  const buttonLabel = bannedTexts.button.label[lang as keyof typeof bannedTexts.button.label];
  const buttonTitle = bannedTexts.button.title[lang as keyof typeof bannedTexts.button.title];
  const deletedAccountText = bannedTexts.accountDeleted[lang as keyof typeof bannedTexts.accountDeleted];
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [validMessage, setValidMessage] = useState<string>('');

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
      <NextHead
        title={headTitle}
      />

      <section className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {pageTitle}
          </h1>

          <p className={styles.subtitle}>
            {pageSubtitle}
          </p>
        </header>

        <ContactForm />

        {warningMessage &&
          <WarningMessage
            message={warningMessage}
            setMessage={setWarningMessage}
          />
        }

        {validMessage ?
          <ValidMessage
            message={validMessage}
            setMessage={setValidMessage}
          />
        :
          <button
            className={styles.button}
            type='button'
            title={buttonTitle}
            aria-label={buttonTitle}
            onClick={deleteAccount}
          >
            {buttonLabel}
          </button>
        }
      </section>
    </>
  );
};

export default Banned;