import type { FC } from 'react';
import type { PlayerProps } from '../../types/componentsProps';
import styles from './Player.module.scss';

const Player: FC<PlayerProps> = ({
  url,
  autoPlay = true
}) => {

  return (
    <iframe
      src={`https://www.youtube.com/embed/${url}?autoplay=${autoPlay ? '1' : '0'}&start=30&end=60`}
      width="560"
      height="315"
      allow="autoplay"
      className={styles.player}
    />
  );
};

export default Player;