import type { FC } from 'react';
import type { IconProps } from '../types/components/components';

const PlayIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={height}
      aria-hidden="true"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill={color}
        d="M8 19V5l11 7Z"
      />
    </svg>
  );
};

export default PlayIcon;