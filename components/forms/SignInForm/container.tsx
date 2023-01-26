import type { FC, FormEvent } from 'react';
import { useState, useContext } from 'react';
import { api } from '../../../api/api';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { messages } from '../../../translations/others/error';
import Loader from '../../../layouts/Loader/Loader';
import SignInFormView from './view';

const SignInForm: FC = () => {

  const { lang } = useContext(LangContext);
  const { setUser, setLogged } = useContext(UserContext);

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('Vadrial');
  const [password, setPassword] = useState<string>('Test123&');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Translated texts
  const errorText = messages.globalError[lang as keyof typeof messages.globalError];
  const loginFailedText = messages.loginFailed[lang as keyof typeof messages.loginFailed];

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    // Prevent reload
    event.preventDefault();

    // Reset messages
    setWarningMessage('');

    setLoading(true);

    // Set the body
    const body = {
      pseudoOrEmail,
      password,
      rememberMe
    };

    // Get user data & new token from database
    await fetch(`${api}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      // If response is ok
      if(res.status === 200) {
        // Set new token on local storage
        localStorage.setItem('token', data.token);
        // Update user context state
        setUser(data.user);
        // & logged state
        setLogged(true);
      } else {
        setWarningMessage(loginFailedText);
      };
    })
    .catch((error) => {
      setWarningMessage(errorText);
      console.error('catch error', error);
    });

    setLoading(false);
  };

  if(loading) return <Loader />;

  return (
    <SignInFormView
      handleSubmit={handleSubmit}
      pseudoOrEmail={pseudoOrEmail}
      setPseudoOrEmail={setPseudoOrEmail}
      password={password}
      setPassword={setPassword}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
    />
  );
};

export default SignInForm;