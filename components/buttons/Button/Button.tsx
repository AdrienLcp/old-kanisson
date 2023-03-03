import type { FC } from 'react';
import type { ButtonProps } from '../../../types/components/buttons';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { loadingTexts } from '../../../translations/components/buttons';

export const Button: FC<ButtonProps> = ({
  onClick,
  styles,
  title,
  type = 'button',
  disabled = false,
  loading = false,
  tabIndex,
  children
}) => {

  const { lang } = useContext(LangContext);
  const loadingText = loadingTexts[lang as keyof typeof loadingTexts];

  return (
    <button
      className={styles ?? undefined}
      type={type}
      arial-label={title ?? undefined}
      title={title ?? undefined}
      disabled={disabled || loading}
      tabIndex={tabIndex ? tabIndex : 0}
      onClick={onClick}
    >
      {loading ?
        <>
          {loadingText}
        </>
      :
        <>
          {children}
        </>
      }
    </button>
  );
};