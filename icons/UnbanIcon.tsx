import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const UnbanIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={height}
      fill="none"
      stroke="#2c2c2c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        stroke={color}
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      />

      <polyline
        stroke={color}
        points="10 17 15 12 10 7"
      />

      <line
        stroke={color}
        x1="15"
        y1="12"
        x2="3"
        y2="12"
      />
    </svg>
  );
};

export default UnbanIcon;