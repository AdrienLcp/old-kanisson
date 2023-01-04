import { Dispatch, SetStateAction, PropsWithChildren } from 'react';

export interface HeadProps {
  title?: string,
  description?: string
};

export type ModalProps = PropsWithChildren<{
  setToggleModal: Dispatch<SetStateAction<boolean>>
}>;

export interface NavbarProps {
  toggleMenu: boolean,
  setToggleMenu: Dispatch<SetStateAction<boolean>>
};

export interface ParamsProps {
  toggleMenu: boolean,
  setToggleMenu: Dispatch<SetStateAction<boolean>>
};