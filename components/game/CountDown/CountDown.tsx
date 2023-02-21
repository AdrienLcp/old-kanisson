import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styles from './CountDown.module.scss';

export const CountDown: FC = () => {

  const [progress, setProgress] = useState<number>(3);

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
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      {progress === 3 &&
        <span className={styles.span}>
          3
        </span>
      }
      {progress === 2 &&
        <span className={styles.span}>
          2
        </span>
      }
      {progress === 1 &&
        <span className={styles.span}>
          1
        </span>
      }
      {progress === 0 &&
        <span className={styles.span}>
          GO
        </span>
      }
    </>
  );
};