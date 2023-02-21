import type { Dispatch, ReactElement, SetStateAction } from 'react';
import type { Game, Playlist } from '@prisma/client';

export type ColorPickerProps = {
  hue: string;
  itemHue: string;
  title: string;
  color: string;
  changeColor: (newHue: string) => void;
};

export type ConfirmModalProps = {
  title: string;
  content?: string;
  handleFunction: () => void;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

export type CoverImageProps = {
  url?: string;
  height?: number;
  alt?: string;
};

export type IconProps = {
  color?: string;
  height?: string;
};

export type MessageProps = {
  validMessage?: string;
  setValidMessage?: Dispatch<SetStateAction<string>>;
  warningMessage?: string;
  setWarningMessage?: Dispatch<SetStateAction<string>>;
};

export type ParamsNavProps = {
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
};

export type PasswordValidationItemProps = {
  validCase: boolean;
  text: string;
};

export type PasswordValidationProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
  required?: boolean;
};

export type PasswordValidationViewProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  validCases: ValidCasesState;
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  required: boolean;
};

export type PlayerProps = {
  url: string;
  setTogglePlayer?: Dispatch<SetStateAction<boolean>>;
  autoPlay?: boolean;
  start?: number;
  duration?: number;
};

export type PlaylistsFilterProps = {
  playlists: Playlist[];
};

export type PlaylistsSliderProps = {
  playlists: Playlist[];
  title: string;
};

export type StarsProps = {
  average: number;
  ratings: number[];
};

export type TabsProps = {
  tabs: string[];
  contents: ReactElement<any>[];
};

export type UserGamesProps = {
  userGames: Game[];
  pseudo: string;
};

export type UserPlaylistsProps = {
  userPlaylists: Playlist[];
};

export type ValidCasesState = {
  lowerCase: boolean;
  upperCase: boolean;
  number: boolean;
  special: boolean;
  lengthPass: boolean;
};