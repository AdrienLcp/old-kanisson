import type { FunctionComponent } from 'react';
import styles from './Player.module.scss';

type Props = {
  url: string,
  autoPlay?: boolean
};

const Player: FunctionComponent<Props> = ({
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