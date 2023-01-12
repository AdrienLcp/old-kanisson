import { PropsWithChildren } from 'react';

export type BurgerIconProps = {
  state: boolean;
};

export type CloseButtonProps = {
  handleFunction: () => void;
  color?: string;
  height?: string;
};

export type IconButtonProps = PropsWithChildren<{
  title?: string;
  name?: string;
  handleFunction: () => void;
}>;