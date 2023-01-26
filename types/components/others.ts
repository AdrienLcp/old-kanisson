import { Track } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

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
  required?: boolean
};

export type PasswordValidationViewProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  validCases: ValidCasesState;
  validMessage: string;
  setValidMessage: Dispatch<SetStateAction<string>>;
  required: boolean
};

export type PlayerProps = {
  url: string;
  setTogglePlayer: Dispatch<SetStateAction<boolean>>;
  autoPlay?: boolean;
  start?: number;
  duration?: number;
};

export type TrackListProps = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
};

export type TrackSearchProps = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  apiKey: string;
};

export type ValidCasesState = {
  lowerCase: boolean;
  upperCase: boolean;
  number: boolean;
  special: boolean;
  lengthPass: boolean;
};