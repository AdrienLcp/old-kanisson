import type { FunctionComponent } from 'react';

type Props = {
  color?: string,
  height?: string
};

const CrossIcon: FunctionComponent<Props> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 16 16"
    >
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
      />
    </svg>
  );
};

export default CrossIcon;