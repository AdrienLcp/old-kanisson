import { Dispatch, SetStateAction } from 'react';

export type CheckBoxProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  id: string;
  title?: string;
  label?: string;
};

export type InputAreaProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  id: string;
  title?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
};

export type InputFieldProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  id: string;
  title?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
};

export type InputPasswordProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  id: string;
  title?: string;
  disabled?: boolean;
  required?: boolean;
};