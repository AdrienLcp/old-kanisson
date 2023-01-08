import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import useFetch from '../../../hooks/useFetch';
import SignInFormView from './view';

const SignInForm: FC = () => {

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const checkForm = () => {

  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent reload
    event.preventDefault();

    // Set the body
    const body = {
      pseudoOrEmail,
      password,
      rememberMe
    };

    // Use our personnalised hook to fetch data
    const [items, loading] = useFetch(`${api}/user/login`, body);

    console.log(items);
  };

  return (
    <SignInFormView
      handleSubmit={handleSubmit}
      pseudoOrEmail={pseudoOrEmail}
      setPseudoOrEmail={setPseudoOrEmail}
      password={password}
      setPassword={setPassword}
      rememberMe={rememberMe}
      setRememberMe={setRememberMe}
    />
  );
};

export default SignInForm;