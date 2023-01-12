import type { FC } from 'react';
import type { IconProps } from '../types/components/components';

const AvatarIcon: FC<IconProps> = ({
  color = "var(--black)",
  height = "24"
}) => {

  return (
    <svg
      viewBox="0 0 48 48"
      height={height}
      width={height}
    >
      <path
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth="4"
        d="M5.004 42.231a.78.78 0 0 0 .791.769h36.407a.78.78 0 0 0 .792-.769v-.918c.018-.277.055-1.657-.855-3.184c-.574-.963-1.407-1.794-2.476-2.472c-1.293-.82-2.938-1.413-4.928-1.77a29.236 29.236 0 0 1-3.002-.584c-2.632-.672-2.862-1.267-2.864-1.273a.763.763 0 0 0-.066-.169c-.022-.11-.075-.528.027-1.647c.258-2.843 1.783-4.523 3.008-5.873c.386-.425.751-.828 1.032-1.222c1.213-1.7 1.325-3.635 1.33-3.755a2 2 0 0 0-.087-.628c-.12-.37-.343-.6-.507-.77a2.874 2.874 0 0 1-.113-.12c-.012-.014-.044-.052-.015-.243a19.01 19.01 0 0 0 .203-1.857c.056-1.002.099-2.5-.16-3.959a6.031 6.031 0 0 0-.172-.825c-.273-1.004-.711-1.862-1.32-2.57c-.105-.115-2.653-2.8-10.05-3.35c-1.023-.076-2.034-.035-3.03.016a4.39 4.39 0 0 0-.875.108c-.764.197-.968.681-1.021.952c-.089.45.067.798.17 1.03c.015.033.034.074.001.182c-.171.266-.442.506-.717.733c-.08.067-1.934 1.667-2.036 3.756c-.275 1.589-.255 4.064.07 5.775c.02.095.047.235.002.33c-.35.313-.746.668-.745 1.478c.004.082.117 2.016 1.33 3.717c.28.394.645.796 1.03 1.221l.002.001c1.225 1.35 2.75 3.03 3.008 5.872c.101 1.12.048 1.537.027 1.648a.758.758 0 0 0-.067.169c-.001.006-.23.599-2.85 1.27c-1.512.387-3 .585-3.045.59c-1.934.327-3.569.906-4.86 1.721c-1.065.673-1.9 1.507-2.48 2.477c-.928 1.55-.903 2.962-.89 3.22v.923Z"
      />
    </svg>
  );
};

export default AvatarIcon;