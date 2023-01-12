import type { FC } from 'react';
import type { IconProps } from '../types/components/components';

const CheckIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
      />
    </svg>
  );
};

export default CheckIcon;