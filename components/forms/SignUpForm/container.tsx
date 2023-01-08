import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import useFetch from '../../../hooks/useFetch';
import SignUpFormView from './view';

const SignUp: FC = () => {

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const checkForm = () => {

  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent reload
    event.preventDefault();

    const body = {
      pseudo,
      email,
      password,
      rememberMe
    };

    // Use our personnalised hook to fetch data
    // const [items, loading] = useFetch(`${api}/user/login`, body);

    console.log(body);
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
      setValidPassword={setValidPassword}
    />
  );
};

export default SignUp;