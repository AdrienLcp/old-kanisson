import type { FC } from 'react';
import type { UserGamesProps } from '../../types/components/others';
import { useMemo, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { userGamesTexts } from '../../translations/components/games';
import { v4 as uuidv4 } from 'uuid';
import styles from './UserGames.module.scss';

const UserGames: FC<UserGamesProps> = ({
  userGames,
  pseudo
}) => {

  const { lang } = useContext(LangContext);
  const noGameText = userGamesTexts.noGame[lang as keyof typeof userGamesTexts.noGame];
  const bestText = userGamesTexts.best[lang as keyof typeof userGamesTexts.best];
  const averageText = userGamesTexts.average[lang as keyof typeof userGamesTexts.average];
  const nbOfPlayedText = userGamesTexts.nbOfPlayed[lang as keyof typeof userGamesTexts.nbOfPlayed];

  // Get average scores for user games
  const averageScore = useMemo(() => {
    let sum = 0;
    userGames?.forEach(userGame => sum = sum + userGame.score);
    const average = Math.ceil(sum / userGames?.length);
    return average;
  }, [userGames]);

  // Get best score for user games
  const bestScore = useMemo(() => {
    const scores = [] as number[];
    userGames?.forEach(userGame => scores.push(userGame.score));
    const bestScore = Math.max(...scores);
    return bestScore;
  }, [userGames]);

  return (
    <>
      {userGames?.length > 0 ?
        <ul className={styles.list}>
          <li
            className={styles.card}
            key={uuidv4()}
          >
            {nbOfPlayedText}

            <span className={styles.data}>
              {userGames.length}
            </span>
          </li>

          <li
            className={styles.card}
            key={uuidv4()}
          >
            {bestText}

            <span className={styles.data}>
              {bestScore}/10
            </span>
          </li>

          <li
            className={styles.card}
            key={uuidv4()}
          >
            {averageText}

            <span className={styles.data}>
              {averageScore}/10
            </span>
          </li>
        </ul>
      :
        <p className={styles.no_game}>
          {pseudo} {noGameText}
        </p>
      }
    </>
  );
};

export default UserGames;