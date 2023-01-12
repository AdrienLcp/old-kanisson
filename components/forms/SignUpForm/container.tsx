import type { FC, FormEvent } from 'react';
import { useState, useContext, useEffect } from 'react';
import { api } from '../../../api/api';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { emailTexts, passwordTexts, pseudoTexts } from '../../../langs/components/inputs';
import { messages } from '../../../langs/others/error';
import SignUpFormView from './view';

const SignUp: FC = () => {

  // Contexts for language & user
  const { lang } = useContext(LangContext);
  const { setUser, setLogged } = useContext(UserContext);

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  // Translated texts
  const errorText = messages.globalError[lang as keyof typeof messages.globalError];
  const alreadyTakenText = messages.alreadyTaken[lang as keyof typeof messages.alreadyTaken];
  const validPasswordText = passwordTexts.title[lang as keyof typeof passwordTexts.title];
  const emptyText = messages.empty[lang as keyof typeof messages.empty];
  const validPseudoText = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const validEmailText = emailTexts.title[lang as keyof typeof emailTexts.title];
  const validPasswordsMatch = messages.passwordsDoesntMatch[lang as keyof typeof messages.passwordsDoesntMatch];

  useEffect(() => {
    if(pseudo) {
      if(pseudo.length > 30 || pseudo.includes('@') || pseudo.includes('.')) {
        setWarningMessage(validPseudoText);
      } else {
        setWarningMessage('');
      };
    };
  }, [pseudo]);

  // Check if everything is ok
  const checkForm = () => {
    // If password doesn't have a lowercase, a uppercase, a special caracter, a number & at least 8 caracters
    if(!validPassword) {
      // Set warning message
      setWarningMessage(validPasswordText);
      // & return false
      return false;

    } else if(pseudo.trim() === ''
    || email.trim() === ''
    || password.trim() === ''
    || confirmPassword.trim() === '') {
      // If one input is empty, return false
      setWarningMessage(emptyText);
      return false;

    } else if(!email.includes('@')
    || !email.includes('.')
    || email.length < 3
    || email.length > 100) {
      // If email is not valid, return false
      setWarningMessage(validEmailText);
      return false;

    } else if(pseudo.includes('@')
    || pseudo.includes('.')
    || pseudo.length < 3
    || pseudo.length > 30) {
      // You can't use '@' or '.' in username, return false
      setWarningMessage(validPseudoText);
      return false;

    } else if(password !== confirmPassword) {
      // If passwords doesn't match, return false
      setWarningMessage(validPasswordsMatch);
      return false;
    };
    // If everything is ok, return true
    return true;
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    // Prevent reload
    event.preventDefault();

    if(checkForm()) {
      // Set body with all needed data
      const body = {
        pseudo,
        email,
        password,
        rememberMe
      };

      // Create user on database
      await fetch(`${api}/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async(res) => {
        const data = await res.json();
        // If response is ok (201 = created)
        if(res.status === 201) {
          // set token into local storage
          localStorage.setItem('token', data.token);
          // update user context state
          setUser(data.user);
          // & logged state
          setLogged(true);
        } else {
          setWarningMessage(`
            ${data.meta.target[0].at(0).toUpperCase() + data.meta.target[0].slice(1)}
            ${alreadyTakenText}
          `);
        };
      })
      .catch((error) => {
        setWarningMessage(errorText);
        console.error('catch Error : ', error);
      });
    };
  };

  return (
    <SignUpFormView
      handleSubmit={handleSubmit}
      pseudo={pseudo}
      setPseudo={setPseudo}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
      setValidPassword={setValidPassword}
    />
  );
};

export default SignUp;