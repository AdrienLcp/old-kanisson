import { PropsWithChildren } from 'react';

export type ArrowButtonProps = {
  handleFunction: () => void;
  title: string;
  disabled: boolean;
  side: string;
};

export type BurgerIconProps = {
  state: boolean;
};

export type ButtonProps = PropsWithChildren<{
  handleFunction: () => void;
  styles?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}>;

export type CloseButtonProps = {
  handleFunction: () => void;
  color?: string;
  height?: string;
};

export type IconButtonProps = PropsWithChildren<{
  title?: string;
  label?: string;
  disabled?: boolean;
  handleFunction: () => void;
}>;