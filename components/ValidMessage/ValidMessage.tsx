import type { FC } from 'react';
import type { MessageProps } from '../../types/components/components';
import CheckIcon from '../../icons/CheckIcon';
import CloseButton from '../buttons/CloseButton/CloseButton';
import styles from './ValidMessage.module.scss';

const ValidMessage: FC<MessageProps> = ({
  message,
  setMessage
}) => {

  return (
    <section className={styles.valid}>
      <CloseButton
        handleFunction={() => setMessage('')}
        color="var(--valid)"
      />

      <span className={styles.icon}>
        <CheckIcon color="var(--valid)" />
      </span>

      {message}
    </section>
  );
};

export default ValidMessage;