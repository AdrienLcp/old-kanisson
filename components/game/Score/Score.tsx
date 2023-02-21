import type { FC } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { gameTexts } from '../../../translations/pages/play';
import type { ScoreProps } from '../../../types/components/game';
import styles from './Score.module.scss';

export const Score: FC<ScoreProps> = ({
  score
}) => {

  const { lang } = useContext(LangContext);
  const scoreText = gameTexts.score[lang as keyof typeof gameTexts.score];

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {scoreText} :
      </p>

      <span className={styles.content}>
        {score}
      </span>
    </div>
  );
};