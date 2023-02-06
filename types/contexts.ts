import { User } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

export type UserContextTypes = {
  user: User;
  token: string | null;
  logged: boolean;
  setUser: Dispatch<SetStateAction<User>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
  logOut: () => void;
};

export type LangContextTypes = {
  lang: string;
  changeLang: (newLang: string) => void;
};