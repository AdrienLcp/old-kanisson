import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const HomeIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={height}
    >
      <path
        fill={color}
        d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z"
      />
    </svg>
  );
};

export default HomeIcon;