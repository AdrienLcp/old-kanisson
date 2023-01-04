import type { FC } from 'react';

type Props = {
  height?: string
};

const FrenchFlag: FC<Props> = ({
  height = "24"
}) => {

  return (
    <svg
      width={height}
      height={height}
      viewBox="0 0 36 36"
    >
      <path
        fill="#ED2939"
        d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"
      />
      <path
        fill="#002495"
        d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"
      />
      <path
        fill="#EEE"
        d="M12 5h12v26H12z"
      />
    </svg>
  );
};

export default FrenchFlag;