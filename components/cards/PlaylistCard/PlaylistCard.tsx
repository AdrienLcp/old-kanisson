import type { FC } from 'react';
import type { PlaylistCard } from '../../../types/components/cards';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import styles from './PlaylistCard.module.scss';
import Stars from '../../Stars/Stars';
import Link from 'next/link';

const PlaylistCard: FC<PlaylistCard> = ({
  playlist
}) => {

  const router = useRouter();
  const { lang } = useContext(LangContext);

  const playTitle = playlistCard.title[lang as keyof typeof playlistCard.title];
  const playLabel = playlistCard.label[lang as keyof typeof playlistCard.label];
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];

  return (
    <>
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

            {playlist.ratings.length > 0 &&
              <Stars ratings={playlist.ratings} />
            }

            <p className={styles.description}>
              {playlist.description ? playlist.description : playLabel}
            </p>
          </div>
        </article>

        <span className={styles.creator}>
          Créé par

          <Link
            href={`/profile/${playlist.creator}`}
            className={styles.link}
            title={`${linkTitle} ${playlist.creator}`}
          >
            {playlist.creator}
          </Link>
        </span>
      </section>
    </>
  );
};

export default PlaylistCard;