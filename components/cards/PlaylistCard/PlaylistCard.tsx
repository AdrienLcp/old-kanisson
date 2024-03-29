import type { FC } from 'react';
import type { PlaylistCard } from '../../../types/components/cards';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import { Stars } from '../../Stars/Stars';
import Link from 'next/link';
import styles from './PlaylistCard.module.scss';

const PlaylistCard: FC<PlaylistCard> = ({
  playlist
}) => {

  const router = useRouter();
  const { lang } = useContext(LangContext);

  const playTitle = playlistCard.title[lang as keyof typeof playlistCard.title];
  const songsText = playlistCard.songs[lang as keyof typeof playlistCard.songs];
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];
  const createdBy = playlistCard.creator[lang as keyof typeof playlistCard.creator];

  const gameUrl = playlist.title.replace(/ /g, "_");
  const profileUrl = playlist.creator.replace(/ /g, "_");

  return (
    <section className={styles.container}>
      <Link href={`/play/${gameUrl}`}>
        <article
          className={styles.card}
          title={playTitle}
        >
          <header>
            <h2 className={styles.title}>
              {playlist.title}
            </h2>
          </header>

          <div className={styles.content}>
            {playlist.description &&
              <p className={styles.description}>
                {playlist.description}
              </p>
            }

            <p className={styles.play}>
              {playlist.nbOfTracks} {songsText}
            </p>
          </div>
        </article>
      </Link>

      {playlist.ratings.length > 0 &&
        <span className={styles.stars}>
          <Stars
            average={playlist.average}
            ratings={playlist.ratings}
          />
        </span>
      }

      {!router.pathname.includes('/profile/') &&
        <span className={styles.creator}>
          {createdBy}

          <Link
            href={`/profile/${profileUrl}`}
            className={styles.link}
            title={`${linkTitle} ${playlist.creator}`}
          >
            {playlist.creator}
          </Link>
        </span>
      }
    </section>
  );
};

export default PlaylistCard;