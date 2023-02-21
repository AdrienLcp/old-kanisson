import type { FC } from 'react';
import type { RateViewProps } from '../../../types/components/game';
import { useState } from 'react';
import styles from './Rate.module.scss';
import Message from '../../Message/Message';
import StarIcon from '../../../icons/StarIcon';
import Button from '../../buttons/Button/Button';

export const RateView: FC<RateViewProps> = ({
  ratePlaylist,
  warningMessage,
  setWarningMessage
}) => {

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const stars = Array(5).fill(0);

  return (
    <>
      <ul className={styles.list}>
        {stars.map((star, index) => {

          const value = index + 1;

          return (
            <li
              key={index}
              onPointerEnter={() => setHover(value)}
            >
              <Button
                handleFunction={() => {
                  setRating(value);
                  ratePlaylist(value);
                }}
              >
                <StarIcon
                  color={value <= (hover || rating) ? 'var(--gold)' : 'var(--input-color)'}
                  height='32'
                />
              </Button>
            </li>
          );
        })}
      </ul>

      <Message
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
      />
    </>
  );
};