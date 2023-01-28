import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const StopIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "32"
}) => {

  return (
    <svg 
      width={height}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M6 7v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"
      />
    </svg>
  );
};

export default StopIcon;