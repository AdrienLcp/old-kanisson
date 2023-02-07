import type { FC } from 'react';
import type { IconProps } from '../types/components/others';

const NotificationIcon: FC<IconProps> = ({
  color = 'var(--black)',
  height = '32'
}) => {

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
      />
    </svg>
  );
};

export default NotificationIcon;