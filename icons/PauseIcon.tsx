import type { FC } from 'react';
import styles from './PauseIcon.module.scss';

type Props = {
  color?: string,
  height?: string
};

const PauseIcon: FC<Props> = ({
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