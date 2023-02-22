import type { FC } from 'react';
import type { PlayerProps } from '../../types/components/others';
import { useEffect, useState } from 'react';
import styles from './Player.module.scss';

const Player: FC<PlayerProps> = ({
  url,
  setTogglePlayer,
  autoPlay = true,
  start = 30,
  duration = 30,
}) => {

  const end = start + duration;

  // useEffect(() => {
  //   if(setTogglePlayer) {
  //     // Close player after 30 seconds
  //     const timer = setTimeout(() => {
  //       setTogglePlayer(false);
  //     }, (duration * 1000));

  //     return () => clearTimeout(timer);
  //   };
  // }, [url]);

  const [mute, setMute] = useState(1);

  let muteTest = 0;

  useEffect(() => {
    setTimeout(() => {
      setMute(0);
    },1000);
  }, []);

  return (
    <iframe
      className={styles.player}
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      src={`
        https://www.youtube.com/embed/${url}?autoplay=${autoPlay ? '1' : '0'}&mute=${mute}&start=${start}&end=${end}
      `}
    />
  );
};

export default Player;