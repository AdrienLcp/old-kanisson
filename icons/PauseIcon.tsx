import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const PauseIcon: FC<IconProps> = ({
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
        d="M6 5h4v14H6zm8 0h4v14h-4z"
      />
    </svg>
  );
};

export default PauseIcon;