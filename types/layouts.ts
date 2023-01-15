import { Dispatch, SetStateAction, PropsWithChildren } from 'react';

export type HeadProps = {
  title?: string,
  description?: string
};

export type ModalProps = PropsWithChildren<{
  setToggleModal: Dispatch<SetStateAction<boolean>>
}>;

export type NavbarProps = {
  toggleMenu: boolean,
  setToggleMenu: Dispatch<SetStateAction<boolean>>
};

export type PageWrapperProps = PropsWithChildren<{
  title: string;
  subtitle?: string;

}>;

export type ParamsProps = {
  toggleMenu: boolean,
  setToggleMenu: Dispatch<SetStateAction<boolean>>
};