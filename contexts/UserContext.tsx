import type { FunctionComponent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { User } from '@prisma/client';
import { api } from '../api/api';
import { useRouter } from 'next/router';

const initialState = {
  user: {
    id: '',
    pseudo: '',
    email: '',
    password: '',
    admin: false,
    moderator: false,
    banned: false
  },
  logged: false,
  setUser: () => {},
  setLogged: () => {},
  logOut: () => {}
};

type Props = {
  user: User,
  logged: boolean,
  setUser: Dispatch<SetStateAction<User>>,
  setLogged: Dispatch<SetStateAction<boolean>>,
  logOut: () => void
};

export const UserContext = createContext<Props>(initialState);

const UserContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const router = useRouter();

  const [user, setUser] = useState<User>(initialState.user);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    if(logged) {
      const token: string | null = localStorage.getItem('token');
      checkToken(token);
    };
  }, [logged]);

  const checkToken = async(token: string | null) => {
    await fetch(`${api}/user/checkToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        setLogged(true);
        setUser(data);

        if(data.banned) {
          router.push('/banned');
        };
      } else {
        logOut();
      };
    })
    .catch((error) => {
      console.log(error);
      logOut();
    });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setLogged(false);
    setUser(initialState.user);
    router.push('/');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        logged,
        setUser,
        setLogged,
        logOut
      }}>

      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;