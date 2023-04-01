import type { FC, FormEvent } from 'react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../../api/api';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { emailTexts, passwordTexts, pseudoTexts } from '../../../translations/components/inputs';
import { messages } from '../../../translations/others/error';
import { nothingChangedText, updatedText, wrongPasswordText } from '../../../translations/pages/profile';
import { Loader } from '../../Loader/Loader';
import { UpdateUserFormView } from './view';

export const UpdateUserForm: FC = () => {

  const { user, setUser, setLogged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const router = useRouter();

  // Translated texts
  const errorText = messages.globalError[lang as keyof typeof messages.globalError];
  const alreadyTakenText = messages.alreadyTaken[lang as keyof typeof messages.alreadyTaken];
  const validPasswordText = passwordTexts.title[lang as keyof typeof passwordTexts.title];
  const emptyText = messages.empty[lang as keyof typeof messages.empty];
  const validPseudoText = pseudoTexts.title[lang as keyof typeof pseudoTexts.title];
  const validEmailText = emailTexts.title[lang as keyof typeof emailTexts.title];
  const validPasswordsMatch = messages.passwordsDoesntMatch[lang as keyof typeof messages.passwordsDoesntMatch];
  const updated = updatedText[lang as keyof typeof updatedText];
  const wrongPassword = wrongPasswordText[lang as keyof typeof wrongPasswordText];
  const nothingChanged = nothingChangedText[lang as keyof typeof nothingChangedText];

  const [pseudo, setPseudo] = useState<string>(user.pseudo);
  const [email, setEmail] = useState<string>(user.email);
  const [previousPassword, setpreviousPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const special = new RegExp(/^[a-zA-Z0-9\s,'"\-\(\)\[\]\.:À-ÖØ-öø-ÿ]+$/);

  const checkForm = () => {
    // Reset messages
    setWarningMessage('');
    setValidMessage('');

    if(pseudo === user.pseudo && email === user.email) {
      // Nothing change
      setValidMessage(nothingChanged);
      return false;

    } else if(pseudo.trim() === ''
    || email.trim() === '') {
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

    } else if(pseudo.length < 3
    || pseudo.length > 30
    || special.test(pseudo)) {
      // You can't use special character in username, return false
      setWarningMessage(validPseudoText);
      return false;
    };
    return true;
  };

  const checkPasswords = () => {
    // If inputs are empty
    if(!previousPassword || !newPassword || !confirmPassword) {
      // return false
      return false;

    } else if(!validPassword) {
      // Set warning message
      setWarningMessage(validPasswordText);
      // & return false
      return false;
    } else if(newPassword !== confirmPassword) {
      // If new passwords are not the same
      setWarningMessage(validPasswordsMatch);
      return false
    };
    return true;
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    // Show loader
    setLoading(true);

    // Avoid refresh
    event.preventDefault();

    // Reset messages
    setWarningMessage('');
    setValidMessage('');

    if(checkForm()) await updateUser();
    if(checkPasswords()) await updatePassword();

    // Hide loader
    setLoading(false);
  };

  const updateUser = async() => {
    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Set up the body
    const body = {
      user_id: user.id,
      pseudo,
      email
    };

    // Update user in database
    await fetch(`${api}/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        setValidMessage(updated);
        setUser(data);
      } else {
        console.log(data);
        setWarningMessage(alreadyTakenText);
      };
    })
    .catch((error) => {
      console.log("Catch error : ", error);
      setWarningMessage(errorText);
    });
  };

  const updatePassword = async() => {
    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Set up the body
    const body = {
      user_id: user.id,
      previousPassword,
      newPassword
    };

    // Update user in database
    await fetch(`${api}/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        setValidMessage(updated);
      } else {
        console.log(data);
        setWarningMessage(wrongPassword);
      };
    })
    .catch((error) => {
      console.log("Catch error : ", error);
      setWarningMessage(errorText);
    });
  };

  const deleteAccount = async() => {
    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: user.id })
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        setLogged(false);
        router.push('/');
      } else {
        console.log(data);
        setWarningMessage(errorText);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(errorText);
    });
  };

  if(loading) return <Loader />;

  return (
    <UpdateUserFormView
      handleSubmit={handleSubmit}
      pseudo={pseudo}
      setPseudo={setPseudo}
      email={email}
      setEmail={setEmail}
      previousPassword={previousPassword}
      setPreviousPassword={setpreviousPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      validMessage={validMessage}
      setValidMessage={setValidMessage}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
      setValidPassword={setValidPassword}
      deleteAccount={deleteAccount}
    />
  );
};