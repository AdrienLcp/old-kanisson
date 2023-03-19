import type { FC } from 'react';
import type { GameOverProps } from '../../../types/components/game';
import { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { LangContext } from '../../../contexts/LangContext';
import { endgameTexts, gameTexts } from '../../../translations/pages/play';
import Link from 'next/link';
import styles from './GameOver.module.scss';
import { Rate } from '../Rate/container';
import { Stars } from '../../Stars/Stars';

export const GameOver: FC<GameOverProps> = ({
  playlist,
  score
}) => {

  const { logged, user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const gameOverText = endgameTexts.gameOver[lang as keyof typeof endgameTexts.gameOver];
  const rateText = endgameTexts.rate[lang as keyof typeof endgameTexts.rate];
  const homeLabel = endgameTexts.homeButton.label[lang as keyof typeof endgameTexts.homeButton.label];
  const homeTitle = endgameTexts.homeButton.title[lang as keyof typeof endgameTexts.homeButton.title];
  const scoreText = gameTexts.score[lang as keyof typeof gameTexts.score];

  const [rated, setRated] = useState<boolean>(false);
  const [playlistAverage, setPlaylistAverage] = useState<number>(playlist.average);
  const [playlistRatings, setPlaylistRatings] = useState<number[]>(playlist.ratings);

  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <header>
          <h1 className={styles.title}>
            {gameOverText}
          </h1>
        </header>

        <p className={styles.score}>
          {scoreText} : {score}
        </p>

        {logged &&
        !rated &&
        playlist.user_id !== user.id ?
          <div className={styles.rate}>
            <p>
              {rateText}
            </p>

            <footer>
              <Rate
                playlist={playlist}
                setPlaylistAverage={setPlaylistAverage}
                setPlaylistRatings={setPlaylistRatings}
                setRated={setRated}
              />
            </footer>
          </div>
        :
          <>
            {playlistRatings.length > 0 &&
              <Stars
                average={playlistAverage}
                ratings={playlistRatings}
              />
            }
          </>
        }
      </article>

      <Link
        href='/'
        title={homeTitle}
        className={styles.home}
      >
        {homeLabel}
      </Link>
    </section>
  );
};