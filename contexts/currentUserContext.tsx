import type { FunctionComponent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { User } from '@prisma/client';

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
  setLogged: () => {}
};

type Props = {
  user: User,
  logged: boolean,
  setUser: Dispatch<SetStateAction<User>>,
  setLogged: Dispatch<SetStateAction<boolean>>
};

export const CurrentUserContext = createContext<Props>(initialState);

const CurrentUserContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [user, setUser] = useState<User>(initialState.user);
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {

  }, []);

  useEffect(() => {

  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ user, logged, setUser, setLogged }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;