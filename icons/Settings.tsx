import type { FunctionComponent } from 'react';

type Props = {
  color?: string,
  height?: string
};

const IconSettings: FunctionComponent<Props> = ({
  color = "var(--white)",
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
        d="m19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01c0-.34-.03-.66-.07-.99l.01.02l2.44-1.92l-2.43-4.22l-2.87 1.16l.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01l-2.88-1.17l-2.44 4.22l2.44 1.92l.01-.02c-.04.33-.07.65-.07.99c0 .34.03.68.08 1.01l-.01-.02l-2.1 1.65l-.33.26l2.43 4.2l2.88-1.15l-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04l2.88 1.15l2.43-4.2s-.14-.12-.33-.26l-2.11-1.66zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5z"
      />
    </svg>
  );
};

export default IconSettings;