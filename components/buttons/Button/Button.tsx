import type { FC } from 'react';
import type { ButtonProps } from '../../../types/components/buttons';

export const Button: FC<ButtonProps> = ({
  onClick,
  styles,
  title,
  type = 'button',
  disabled = false,
  tabIndex,
  children
}) => {

  return (
    <button
      className={styles ?? undefined}
      type={type}
      arial-label={title ?? undefined}
      title={title ?? undefined}
      disabled={disabled}
      tabIndex={tabIndex ? tabIndex : 0}
      onClick={onClick}
    >
      {children}
    </button>
  );
};