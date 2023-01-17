import type { FC } from 'react';
import type { PlayerProps } from '../../types/components/others';
import styles from './Player.module.scss';

const Player: FC<PlayerProps> = ({
  url,
  autoPlay = true
}) => {

  return (
    <iframe
      src={`https://www.youtube.com/embed/${url}?autoplay=${autoPlay ? '1' : '0'}&start=30&end=60`}
      allow="autoplay"
      className={styles.player}
    />
  );
};

export default Player;