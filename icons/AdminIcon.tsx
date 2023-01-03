import type { FunctionComponent } from 'react';
import styles from './AdminIcon.module.scss';

type Props = {
  color?: string,
  height?: string
};

const AdminIcon: FunctionComponent<Props> = ({
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
        d="M12 23C6.443 21.765 2 16.522 2 11V5l10-4l10 4v6c0 5.524-4.443 10.765-10 12ZM4 6v5a10.58 10.58 0 0 0 8 10a10.58 10.58 0 0 0 8-10V6l-8-3Z"
      />

      <circle
        fill={color}
        cx="12"
        cy="8.5"
        r="2.5"

      />
      <path
        fill={color}
        d="M7 15a5.782 5.782 0 0 0 5 3a5.782 5.782 0 0 0 5-3c-.025-1.896-3.342-3-5-3c-1.667 0-4.975 1.104-5 3Z"
      />
    </svg>
  );
};

export default AdminIcon;