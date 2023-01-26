import type { FC } from 'react';
import type { CloseButtonProps } from '../../../types/components/buttons';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { closeButton } from '../../../translations//components/buttons';
import CrossIcon from '../../../icons/CrossIcon';
import IconButton from '../IconButton/IconButton';
import styles from './CloseButton.module.scss';

const CloseButton: FC<CloseButtonProps> = ({
  handleFunction,
  color = "var(--black)",
  height = "18"
}) => {

  const { lang } = useContext(LangContext);

  const title = closeButton.title[lang as keyof typeof closeButton.title];

  return (
    <div className={styles.close}>
      <IconButton
        handleFunction={handleFunction}
        title={title}
      >
        <CrossIcon
          height={height}
          color={color}
        />
      </IconButton>
    </div>
  );
};

export default CloseButton;