import { FC, FormEvent, useEffect } from 'react';
import { useState, useContext } from 'react';
import { api } from '../../../api/api';
import { UserContext } from '../../../contexts/UserContext';
import SignUpFormView from './view';

const SignUp: FC = () => {

  const { setUser, setLogged } = useContext(UserContext);

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  useEffect(() => {
    if(password === confirmPassword) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    };
  }, [password, confirmPassword]);

  const checkForm = () => {

  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    // Prevent reload
    event.preventDefault();

    const body = {
      pseudo,
      email,
      password,
      rememberMe
    };

    await fetch(`${api}/user/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      // If response is ok
      if(res.status === 201) {
        // set token into local storage
        localStorage.setItem('token', data.token);
        // update user context state
        setUser(data.user);
        // & logged state
        setLogged(true);

        console.log(data);
        
      } else {
        console.log(data);
      };
    })
    .catch((error) => {
      console.log('nope : ', error);
    });
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