import type { FunctionComponent } from 'react';

type Props = {
  color?: string,
  height?: string
};

const IconPlay: FunctionComponent<Props> = ({
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

export default IconPlay;