import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

export const Timer: FC = () => {

  const [progress, setProgress] = useState<number>(30);
  const [progressColor, setProgressColor] = useState<string>('var(--green)');

  useEffect(() => {
    let timeLeft = progress;

    const intervalID = setInterval(() => {
      if(timeLeft > 0) {
        setProgress(value => value - 1);
        timeLeft--;
      } else {
        setProgress(0);
        clearInterval(intervalID);
      };

      if(timeLeft === 10) setProgressColor('var(--orange)');
      if(timeLeft === 5) setProgressColor('var(--red)');
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className={styles.timer}>
      <svg>
        <circle
          cx="70"
          cy="70"
          r="70"
          className={styles.circle}
        />

        <circle
          cx="70"
          cy="70"
          r="70"
          stroke={progressColor}
          className={styles.progress_bar}
        />
      </svg>

      <span className={styles.time}>
        {progress}
      </span>
    </div>
  );
};