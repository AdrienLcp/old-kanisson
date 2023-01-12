import type { FC } from 'react';
import type { MessageProps } from '../../types/components/components';
import CloseButton from '../buttons/CloseButton/CloseButton';
import styles from './WarningMessage.module.scss';
import CrossIcon from '../../icons/CrossIcon';

const WarningMessage: FC<MessageProps> = ({
  message,
  setMessage
}) => {

  return (
    <section className={styles.warning}>
      <CloseButton
        handleFunction={() => setMessage('')}
        color="var(--warning)"
      />

      <span className={styles.icon}>
        <CrossIcon color="var(--warning)" />
      </span>

      {message}
    </section>
  );
};

export default WarningMessage;