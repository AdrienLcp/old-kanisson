import type { FC } from 'react';
import type { BeforeGameProps } from '../../../types/components/game';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { beforeTexts } from '../../../translations/pages/play';
import { playlistCard } from '../../../translations/components/cards';
import Button from '../../buttons/Button/Button';
import styles from './BeforeGame.module.scss';
import Link from 'next/link';
import Stars from '../../Stars/Stars';

export const BeforeGame: FC<BeforeGameProps> = ({
  playlist,
  setStep
}) => {

  const { lang } = useContext(LangContext);
  const playLabel = beforeTexts.play.label[lang as keyof typeof beforeTexts.play.label];
  const playTitle = beforeTexts.play.title[lang as keyof typeof beforeTexts.play.title];
  const createdByText = playlistCard.creator[lang as keyof typeof playlistCard.creator];
  const nbOfTracksText = playlistCard.nbOfTracks[lang as keyof typeof playlistCard.nbOfTracks];
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];

  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <header>
          <h2 className={styles.title}>
            {playlist.title}
          </h2>

          <h3 className={styles.description}>
            {playlist.description}
          </h3>
        </header>

        <section className={styles.details}>
          <p>
            {createdByText}

            <Link
              className={styles.link}
              title={`${linkTitle} ${playlist.creator}`}
              href={`/profile/${playlist.creator}`}
            >
              {playlist.creator}
            </Link>
          </p>

          <p>
            {nbOfTracksText} {playlist.nbOfTracks}
          </p>
        </section>

        {playlist.ratings.length > 0 &&
          <footer>
            <Stars
              average={playlist.average}
              ratings={playlist.ratings}
            />
          </footer>
        }


      </article>

      <div className={styles.box}>
        <Button
          handleFunction={() => setStep(value => value + 1)}
          title={playTitle}
          styles={styles.button}
        >
          {playLabel}
        </Button>
      </div>
    </section>
  );
};