import { Dispatch, SetStateAction } from 'react';

export type IconProps = {
  color?: string;
  height?: string;
};

export type ParamsNavProps = {
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
};

export type PasswordValidationProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
};

export type PasswordValidationViewProps = {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  checkPassword: () => void;
  checkPasswordsMatch: () => void;
  validCases: validCasesState;
  validMessage: string;
};

export type PlayerProps = {
  url: string;
  autoPlay?: boolean;
};

export type validCasesState = {
  lowerCase: boolean;
  upperCase: boolean;
  number: boolean;
  special: boolean;
  lengthPass: boolean;
};