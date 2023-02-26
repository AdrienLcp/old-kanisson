import type { FC, PropsWithChildren } from 'react';
import type { User } from '@prisma/client';
import type { UserContextTypes } from '../types/contexts';
import { createContext, useState, useEffect } from 'react';
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

export const UserContext = createContext<UserContextTypes>(initialState);

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {

  const router = useRouter();

  const [user, setUser] = useState<User>(initialState.user);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    // Get previous token from local storage
    const token = localStorage.getItem('token');

    // If there is a token in local storage, check in database if it's still valid
    if(token) {
      checkToken(token);
    } else if(!token && logged){
      logOut();
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
        // If response is ok, log user & update data
        setLogged(true);
        setUser(data);

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