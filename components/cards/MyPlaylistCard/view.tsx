import type { FC } from 'react';
import type { MyPlaylistCardViewProps } from '../../../types/components/cards';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { myPlaylistCard, playlistCard } from '../../../translations/components/cards';
import styles from './MyPlaylistsCard.module.scss';
import { IconButton } from '../../buttons/IconButton/IconButton';
import PlayIcon from '../../../icons/PlayIcon';
import PenIcon from '../../../icons/PenIcon';
import BinIcon from '../../../icons/BinIcon';
import { ConfirmModal } from '../../ConfirmModal/ConfirmModal';

export const MyPlaylistCardView: FC<MyPlaylistCardViewProps> = ({
  playlist,
  deletePlaylist
}) => {

  const router = useRouter();
  const { lang } = useContext(LangContext);

  const playTitle = playlistCard.title[lang as keyof typeof playlistCard.title];
  const editTitle = myPlaylistCard.buttons.update[lang as keyof typeof myPlaylistCard.buttons.update];
  const deleteTitle = myPlaylistCard.buttons.delete[lang as keyof typeof myPlaylistCard.buttons.delete];
  const confirmTitle = myPlaylistCard.confirmModal.title[lang as keyof typeof myPlaylistCard.confirmModal.title];
  const confirmContent = myPlaylistCard.confirmModal.content[lang as keyof typeof myPlaylistCard.confirmModal.content];
  const warningTitle = myPlaylistCard.warningTexts[lang as keyof typeof myPlaylistCard.warningTexts];
  const hiddenTitle = myPlaylistCard.hiddenTexts[lang as keyof typeof myPlaylistCard.hiddenTexts];
  const nbOfTracksText = playlistCard.songs[lang as keyof typeof playlistCard.songs];

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const url = playlist.title.replace(/ /g, "_");

  return (
    <>
      <article className={!playlist.visible ?
        `${styles.card} ${styles.no_visible}`
      :
        `${styles.card}`
      }>
        <header className={styles.header}>
          <h3>
            {playlist.title}
          </h3>

          <p className={styles.tracks}>
            {playlist.nbOfTracks} {nbOfTracksText}
          </p>
        </header>

        <div className={styles.warnings}>
          <>
            {!playlist.playable &&
              <span
                className={styles.warning}
                aria-label={warningTitle}
                title={warningTitle}
              >
                ⚠️
                <p className={styles.warning_text}>
                  {warningTitle}
                </p>
              </span>
            }

            {!playlist.visible &&
              <span
                className={styles.warning}
                aria-label={hiddenTitle}
                title={hiddenTitle}
              >
                ⚠️
                <p className={styles.warning_text}>
                  {hiddenTitle}
                </p>
              </span>
            }
          </>
        </div>

        <footer className={styles.footer}>
          {playlist.visible &&
            <IconButton
              handleFunction={() => router.push(`/play/${url}`)}
              title={playTitle}
            >
              <PlayIcon />
            </IconButton>
          }

          <IconButton
            handleFunction={() => router.push(`/update/${url}`)}
            title={editTitle}
          >
            <PenIcon />
          </IconButton>

          <IconButton
            handleFunction={() => setToggleModal(true)}
            title={deleteTitle}
          >
            <BinIcon />
          </IconButton>
        </footer>

      </article>

      {toggleModal &&
        <ConfirmModal
          setToggleModal={setToggleModal}
          title={confirmTitle}
          content={confirmContent}
          handleFunction={deletePlaylist}
        />
      }
    </>
  );
};