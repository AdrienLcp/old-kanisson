import type { FC } from 'react';
import type { MessageProps } from '../../types/components/others';
import { useEffect } from 'react';
import CheckIcon from '../../icons/CheckIcon';
import CrossIcon from '../../icons/CrossIcon';
import { CloseButton } from '../buttons/CloseButton/CloseButton';
import styles from './Message.module.scss';

export const Message: FC<MessageProps> = ({
  validMessage,
  setValidMessage,
  warningMessage,
  setWarningMessage
}) => {

  useEffect(() => {
    if(validMessage && setWarningMessage) {
      setWarningMessage('');
    } else if(warningMessage && setValidMessage) {
      setValidMessage('');
    };
  }, [validMessage, warningMessage]);

  return (
    <div>
      {validMessage &&
        <section className={`${styles.message} ${styles.valid}`}>
          {setValidMessage &&
            <CloseButton
              handleFunction={() => setValidMessage('')}
              color="var(--valid)"
            />
          }

          <span className={styles.icon}>
            <CheckIcon color="var(--valid)" />
          </span>

          {validMessage}
        </section>
      }

      {warningMessage &&
        <section className={`${styles.message} ${styles.warning}`}>
          {setWarningMessage &&
            <CloseButton
              handleFunction={() => setWarningMessage('')}
              color="var(--warning)"
            />
          }

          <span className={styles.icon}>
            <CrossIcon color="var(--warning)" />
          </span>

          {warningMessage}
        </section>
      }
    </div>
  );
};