import type { FC } from 'react';
import styles from './CreateIcon.module.scss';

type Props = {
  color?: string,
  height?: string
};

const CreateIcon: FC<Props> = ({
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
        d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5h2z"
      />
      <path
        fill={color}
        d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"
      />
    </svg>
  );
};

export default CreateIcon;