import type { FunctionComponent } from 'react';
import styles from './LoginIcon.module.scss';

type Props = {
  color?: string,
  height?: string,
};

const LoginIcon: FunctionComponent<Props> = ({
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
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9m6-9l-4-4m4 4l-4 4m4-4H5"
      />
    </svg>
  );
};

export default LoginIcon;