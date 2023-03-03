import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';

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
  autoFocus?: boolean;
  limit?: number;
};

export type InputFieldProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  id: string;
  limit?: number;
  title?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
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