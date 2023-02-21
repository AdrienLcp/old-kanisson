import type { FC } from 'react';
import type { ButtonProps } from '../../../types/components/buttons';

const Button: FC<ButtonProps> = ({
  handleFunction,
  styles,
  title,
  type = 'button',
  children
}) => {

  return (
    <button
      className={styles ?? undefined}
      type={type}
      arial-label={title ?? undefined}
      title={title ?? undefined}
      onClick={handleFunction}
    >
      {children}
    </button>
  );
};

export default Button;