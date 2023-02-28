import { Dispatch, FormEvent, SetStateAction, PropsWithChildren } from 'react';

export type ListWrapperProps = PropsWithChildren<{
  title: string;
}>;

export type FormWrapperProps = PropsWithChildren<{
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  submitTitle?: string;
  loading?: boolean;
}>;

export type HeadProps = {
  title?: string;
  description?: string;
  url?: string;
};

export type MobileListWrapperProps = PropsWithChildren<{
  title: string;
  setToggle: Dispatch<SetStateAction<boolean>>;
}>;

export type ModalProps = PropsWithChildren<{
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}>;

export type NavbarProps = {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
};

export type PageWrapperProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export type ParamsProps = {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
};