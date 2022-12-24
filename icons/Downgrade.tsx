import type { FunctionComponent } from 'react';

type Props = {
  color?: string,
  height?: string
};

const IconDowngrade: FunctionComponent<Props> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 512 512"
      height={height}
      width={height}
    >
      <path
        fill={color}
        d="m256 21.95l-5.4 4.03C187.5 73.41 125.4 104.5 30.58 120.3l-7.5 1.2v7.6c0 19 8.4 48.7 22.1 85.1c13.6 36.5 32.8 78.8 55.02 119.2c22.3 40.4 47.4 78.9 73.8 107.7c26.1 28.9 53.5 48.9 82 48.9s55.9-20 82.2-48.9c26.2-28.8 51.3-67.3 73.7-107.7c22.2-40.4 41.3-82.7 55-119.2c13.6-36.4 22-66.1 22-85.1v-7.6l-7.4-1.2c-94.6-15.8-156.9-46.89-220.1-94.32zm0 22.2c61.1 45.04 124.4 76.15 214.4 92.35c-1.9 15.2-9 41.4-20.3 71.5c-4.1 10.8-8.6 22.2-13.7 34H288v46l64-16l-96 112l-96-112l64 16v-46H75.57c-5-11.8-9.59-23.2-13.69-34c-11.2-30.1-18.4-56.3-20.3-71.5C131.6 120.3 194.8 89.19 256 44.15z"
      />
    </svg>
  );
};

export default IconDowngrade;