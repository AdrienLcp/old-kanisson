import type { FC } from 'react';
import type { PlaylistCard } from '../../../types/components/cards';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import styles from './PlaylistCard.module.scss';
import Link from 'next/link';
import Stars from '../../Stars/Stars';

const PlaylistCard: FC<PlaylistCard> = ({
  playlist
}) => {

  const router = useRouter();
  const { lang } = useContext(LangContext);

  const playTitle = playlistCard.title[lang as keyof typeof playlistCard.title];
  const playLabel = playlistCard.label[lang as keyof typeof playlistCard.label];
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];
  const createdBy = playlistCard.creator[lang as keyof typeof playlistCard.creator];

  return (
    <section className={styles.container}>
      <article
        className={styles.card}
        title={playTitle}
        onClick={() => router.push(`/play/${playlist.title}`)}
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
            {playLabel}
          </p>
        </div>
      </article>

      {playlist.ratings.length > 0 &&
        <span className={styles.stars}>
          <Stars
            average={playlist.average}
            ratings={playlist.ratings}
          />
        </span>
      }

      <span className={styles.creator}>
        {createdBy}

        <Link
          href={`/profile/${playlist.creator}`}
          className={styles.link}
          title={`${linkTitle} ${playlist.creator}`}
        >
          {playlist.creator}
        </Link>
      </span>
    </section>
  );
};

export default PlaylistCard;