import type { FC } from 'react';
import type { CloseButtonProps } from '../../../types/components/buttons';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { closeButton } from '../../../translations//components/buttons';
import { Button } from '../Button/Button';
import CrossIcon from '../../../icons/CrossIcon';
import styles from './CloseButton.module.scss';

export const CloseButton: FC<CloseButtonProps> = ({
  handleFunction,
  color = "var(--black)",
  height = "18"
}) => {

  const { lang } = useContext(LangContext);

  const title = closeButton.title[lang as keyof typeof closeButton.title];

  return (
    <div className={styles.close}>
      <Button
        styles={styles.button}
        title={title}
        onClick={handleFunction}
      >
        <CrossIcon
          height={height}
          color={color}
        />
      </Button>
    </div>
  );
};