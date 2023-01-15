import { Dispatch, FormEvent, PropsWithChildren, SetStateAction } from 'react';

export type FormWrapperProps = PropsWithChildren<{
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  submitTitle?: string;
}>;

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
};