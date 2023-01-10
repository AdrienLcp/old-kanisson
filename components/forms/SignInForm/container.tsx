import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import SignInFormView from './view';

const SignInForm: FC = () => {

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('Vadrial');
  const [password, setPassword] = useState<string>('Test123&');
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