import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const RefreshIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "20"
}) => {

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M4 20v-7h7l-3.217 3.22A5.917 5.917 0 0 0 12 18a6 6 0 0 0 5.648-4h.018c.114-.325.201-.66.259-1h2.012A8 8 0 0 1 12 20h-.01a7.941 7.941 0 0 1-5.653-2.34L4 20Zm2.074-9H4.062a8 8 0 0 1 7.933-7H12a7.94 7.94 0 0 1 5.654 2.34L20 4v7h-7l3.222-3.22A5.916 5.916 0 0 0 12 6a6 6 0 0 0-5.648 4h-.018c-.115.325-.202.66-.259 1h-.001Z"
      />
    </svg>
  );
};

export default RefreshIcon;