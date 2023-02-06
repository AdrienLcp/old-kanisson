import type { FC } from 'react';
import type { PlaylistModalProps } from '../../../types/components/modals';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistCard } from '../../../translations/components/cards';
import styles from './PlaylistModal.module.scss';
import Link from 'next/link';
import Modal from '../../../layouts/Modal/Modal';
import PlaylistCard from '../../cards/PlaylistCard/PlaylistCard';

const PlaylistModal: FC<PlaylistModalProps> = ({
  playlist,
  setToggleModal,
  children
}) => {

  const { lang } = useContext(LangContext);
  const title = playlistCard.detailsTitle[lang as keyof typeof playlistCard.detailsTitle];
  const description = playlistCard.description[lang as keyof typeof playlistCard.description];
  const linkTitle = playlistCard.link[lang as keyof typeof playlistCard.link];
  const createdBy = playlistCard.creator[lang as keyof typeof playlistCard.creator];
  const createdOn = playlistCard.createdOn[lang as keyof typeof playlistCard.createdOn];
  const rated = playlistCard.rate[lang as keyof typeof playlistCard.rate];
  const nbOfTracks = playlistCard.nbOfTracks[lang as keyof typeof playlistCard.nbOfTracks];
  const playable = playlistCard.playable[lang as keyof typeof playlistCard.playable];
  const visible = playlistCard.visible[lang as keyof typeof playlistCard.visible];

  return (
    <Modal setToggleModal={setToggleModal}>
      <section className={styles.container}>
        <header className={styles.header}>

          <h4 className={styles.title}>
            <span className={styles.span}>
              {title}
            </span>

            {playlist.title}
          </h4>

          {playlist.description &&
            <h5>
              <span className={styles.span}>
                {description}
              </span>
              <p
                className={styles.description}
                title={playlist.description}
              >
                {playlist.description}
              </p>
            </h5>

          }
        </header>

        <section className={styles.details}>
          <div>
            <span className={styles.span}>
              {createdBy}
            </span>

            <Link
              href={`/profile/${playlist.creator}`}
              className={styles.link}
              title={`${linkTitle} ${playlist.creator}`}
            >
              {playlist.creator}
            </Link>
          </div>

          <div>
            <span className={styles.span}>
              {createdOn}
            </span>

            {playlist.date}
          </div>

          <div>
            <span className={styles.span}>
              {rated}
            </span>

            {playlist.average}/5
          </div>

          <div>
            <span className={styles.span}>
              {nbOfTracks}
            </span>

            {playlist.nbOfTracks}
          </div>

          <div>
            <span className={styles.span}>
              {playable}
            </span>

            {playlist.playable ? "✅" : "❌"}
          </div>

          <div>
            <span className={styles.span}>
              {visible}
            </span>

            {playlist.visible ? "✅" : "❌"}
          </div>
        </section>

        {children}

      </section>
    </Modal>
  );
};

export default PlaylistModal;