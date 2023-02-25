import type { FC } from 'react';
import type { HiddenPlaylistCardViewProps } from '../../../types/components/moderation';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import { playlistsTexts } from '../../../translations/components/moderation';
import styles from './HiddenPlaylistCard.module.scss';
import { IconButton } from '../../buttons/IconButton/IconButton';
import Link from 'next/link';
import BinIcon from '../../../icons/BinIcon';
import RestoreIcon from '../../../icons/RestoreIcon';

export const HiddenPlaylistCardView: FC<HiddenPlaylistCardViewProps> = ({
  playlist,
  restorePlaylist,
  deletePlaylist
}) => {

  const { lang } = useContext(LangContext);
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];
  const createdBy = playlistCard.creator[lang as keyof typeof playlistCard.creator];
  const restoreTitle = playlistsTexts.restore[lang as keyof typeof playlistsTexts.restore];
  const deleteTitle = playlistsTexts.permanentlyDelete[lang as keyof typeof playlistsTexts.permanentlyDelete];

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          {playlist.title}
        </h3>

        {playlist.description &&
          <p
            className={styles.description}
            title={playlist.description}
          >
            {playlist.description}
          </p>
        }
      </header>

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

      <section className={styles.buttons}>

        <IconButton
          handleFunction={restorePlaylist}
          title={restoreTitle}
        >
          <RestoreIcon />
        </IconButton>

        <IconButton
          handleFunction={deletePlaylist}
          title={deleteTitle}
        >
          <BinIcon />
        </IconButton>
      </section>
    </article>
  );
};