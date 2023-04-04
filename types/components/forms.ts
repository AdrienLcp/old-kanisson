import type { Playlist, Track } from '@prisma/client';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import type { SearchResultItem } from '../youtube';

export type PlaylistFormProps = {
  playlist?: Playlist;
  tracksData?: Track[];
  apiKey: string;
};

export type PlaylistFormViewProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  loading: boolean;
  apiKey: string;
  tracksResults: SearchResultItem[];
  setTracksResults: Dispatch<SetStateAction<SearchResultItem[]>>;
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
  loading: boolean;
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
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

export type TracksFormProps = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  tracksResults: SearchResultItem[];
  setTracksResults: Dispatch<SetStateAction<SearchResultItem[]>>;
  apiKey: string;
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