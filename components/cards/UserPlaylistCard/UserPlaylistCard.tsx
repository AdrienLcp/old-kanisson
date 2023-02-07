import type { FC } from 'react';
import type { UserPlaylistCardProps } from '../../../types/components/cards';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import styles from './UserPlaylistCard.module.scss';
import Stars from '../../Stars/Stars';

const UserPlaylistCard: FC<UserPlaylistCardProps> = ({
  playlist
}) => {

  const { lang } = useContext(LangContext);
  const playTitle = playlistCard.title[lang as keyof typeof playlistCard.title];
  const songsText = playlistCard.songs[lang as keyof typeof playlistCard.songs];

  return (
    <article
      className={styles.card}
      title={playTitle}
    >
      <header>
        <h3>
          {playlist.title}
        </h3>
      </header>

      <div className={styles.content}>
        {playlist.description &&
          <p className={styles.description}>
            {playlist.description}
          </p>
        }

        <span className={styles.tracks}>
          {playlist.nbOfTracks} {songsText}
        </span>
      </div>

      {playlist.ratings.length > 0 &&
        <footer className={styles.rate}>
          <Stars
            average={playlist.average}
            ratings={playlist.ratings}
          />
        </footer>
      }
    </article>
  );
};

export default UserPlaylistCard;