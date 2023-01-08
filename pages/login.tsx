import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { LangContext } from '../contexts/LangContext';
import { UserContext } from '../contexts/UserContext';
import { loginHeadTexts } from '../langs/layouts/head';
import { signInTexts, signUpTexts } from '../langs/pages/login';

import NextHead from '../layouts/Head/Head';
import SignInForm from '../components/forms/SignInForm';
import styles from '../styles/Login.module.scss';
import SignUpForm from '../components/forms/SignUpForm';

const Login: NextPage = () => {

  const { logged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const router = useRouter();

  const signUpTitle = signUpTexts.title[lang as keyof typeof signUpTexts.title];
  const signUpLabel1 = signUpTexts.button.label_1[lang as keyof typeof signUpTexts.button.label_1];
  const signUpLabel2 = signUpTexts.button.label_2[lang as keyof typeof signUpTexts.button.label_2];
  const signUpButtonTitle = signUpTexts.button.title[lang as keyof typeof signUpTexts.button.title];

  const signInTitle = signInTexts.title[lang as keyof typeof signInTexts.title];
  const signInLabel1 = signInTexts.button.label_1[lang as keyof typeof signInTexts.button.label_1];
  const signInLabel2 = signInTexts.button.label_2[lang as keyof typeof signInTexts.button.label_2];
  const signInButtonTitle = signInTexts.button.title[lang as keyof typeof signInTexts.button.title];

  const headtitle = loginHeadTexts.title[lang as keyof typeof loginHeadTexts.title];
  const headDescription = loginHeadTexts.description[lang as keyof typeof loginHeadTexts.description];

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  useEffect(() => {
    if(logged) {
      router.push('/');
    };
  }, [logged]);

  return (
    <>
      <NextHead
        title={headtitle}
        description={headDescription}
      />

      <div className={styles.container}>
        {toggleForm ?
          <section className={styles.sign_up}>
            <header>
              <h1 className={styles.title}>
                {signUpTitle}
              </h1>
            </header>

            <SignUpForm />

            <button
              className={styles.button}
              type="button"
              aria-label={signUpButtonTitle}
              title={signUpButtonTitle}
              onClick={() => setToggleForm(prev => !prev)}
            >
              {signUpLabel1}
              <br />
              {signUpLabel2}
            </button>
          </section>
        :
          <section className={styles.sign_in}>
            <header>
              <h1 className={styles.title}>
                {signInTitle}
              </h1>
            </header>

            <SignInForm />

            <button
              className={styles.button}
              type="button"
              aria-label={signInButtonTitle}
              title={signInButtonTitle}
              onClick={() => setToggleForm(prev => !prev)}
            >
              {signInLabel1}
              <br />
              {signInLabel2}
            </button>
          </section>
        }
      </div>
   </>
  );
};

export default Login;