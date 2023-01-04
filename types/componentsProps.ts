import { Dispatch, SetStateAction, PropsWithChildren } from 'react';

export interface BurgerIconProps {
  state: boolean
};

export interface CheckBoxProps {
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  id: string,
  title?: string
};

export interface CloseButtonProps {
  handleFunction: () => void,
  color?: string
};

export interface IconProps {
  color?: string,
  height?: string
};

export type IconButtonProps = PropsWithChildren<{
  title?: string,
  name?: string,
  handleFunction: () => void
}>;

export interface InputAreaProps {
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  label: string,
  id: string,
  title?: string,
  disabled?: boolean
  required?: boolean
};

export interface InputFieldProps {
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  name: string,
  id: string,
  title?: string,
  type?: string,
  disabled?: boolean,
  required?: boolean,
  autoFocus?: boolean
};

export interface ParamsNavProps {
  setToggleMenu: Dispatch<SetStateAction<boolean>>
};

export interface PlayerProps {
  url: string,
  autoPlay?: boolean
};