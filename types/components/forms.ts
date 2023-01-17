import { Playlist } from '@prisma/client';
import { Dispatch, FormEvent, SetStateAction } from 'react';

export type PlaylistFormProps = {
  playlist?: Playlist
};

export type PlaylistFormViewProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  songs_ids: string[];
  setSongs_ids: Dispatch<SetStateAction<string[]>>;
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type SignInFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pseudoOrEmail: string;
  setPseudoOrEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type SignUpFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pseudo: string;
  setPseudo: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
};

export type UpdateUserFormProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pseudo: string;
  setPseudo: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  previousPassword: string;
  setPreviousPassword: Dispatch<SetStateAction<string>>;
  newPassword: string;
  setNewPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
  deleteAccount: () => void;
};