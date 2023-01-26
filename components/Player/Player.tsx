import type { FC } from 'react';
import type { PlayerProps } from '../../types/components/others';
import { useEffect } from 'react';
import styles from './Player.module.scss';

const Player: FC<PlayerProps> = ({
  url,
  setTogglePlayer,
  autoPlay = true,
  start = 30,
  duration = 30,
}) => {

  const end = start + duration;

  useEffect(() => {
    const timer = setTimeout(() => {
      setTogglePlayer(false);
    }, (duration * 1000));

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <iframe
      className={styles.player}
      allow="autoplay"
      src={`
        https://www.youtube.com/embed/${url}?autoplay=${autoPlay ? '1' : '0'}&start=${start}&end=${end}
      `}
    />
  );
};

export default Player;