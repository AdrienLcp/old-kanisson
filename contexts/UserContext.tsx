import type { FC, PropsWithChildren } from 'react';
import type { UserContextTypes } from '../types/contexts';
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
    admin: true,
    moderator: true,
    banned: false
  },
  token: '',
  logged: false,
  setUser: () => {},
  setLogged: () => {},
  logOut: () => {}
};

export const UserContext = createContext<UserContextTypes>(initialState);

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const router = useRouter();

  const [user, setUser] = useState<User>(initialState.user);
  const [logged, setLogged] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>('');

  useEffect(() => {
    // Get previous token from local storage
    const tokenFromLocalStorage = localStorage.getItem('token');

    // If there is a token in local storage, check in database if it's still valid
    if(tokenFromLocalStorage) checkToken(tokenFromLocalStorage);
  }, [logged]);

  const checkToken = async(tokenFromLocalStorage: string | null) => {
    await fetch(`${api}/user/checkToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenFromLocalStorage}`
      }
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        // If response is ok, log user & update data
        setLogged(true);
        setUser(data);
        setToken(token);

        // If user is banned
        if(data.banned) {
          // push him to banned page
          router.push('/banned');
        };
      } else {
        // logout user
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
        token,
        logged,
        setUser,
        setLogged,
        logOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;