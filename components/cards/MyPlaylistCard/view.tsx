import type { FC } from 'react';
import type { MyPlaylistCardView } from '../../../types/components/cards';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { myPlaylistCard, playlistCard } from '../../../translations/components/cards';
import styles from './MyPlaylistsCard.module.scss';
import IconButton from '../../buttons/IconButton/IconButton';
import PlayIcon from '../../../icons/PlayIcon';
import PenIcon from '../../../icons/PenIcon';
import BinIcon from '../../../icons/BinIcon';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

const MyPlaylistCardView: FC<MyPlaylistCardView> = ({
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

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  return (
    <>
      <article className={styles.card}>
        <header className={styles.header}>
          <h3>
            {playlist.title}
          </h3>

          {playlist.description &&
            <p className={styles.description}>
              {playlist.description}
            </p>
          }

        </header>

        <footer className={styles.footer}>
          <IconButton
            handleFunction={() => router.push(`/play/${playlist.title}`)}
            title={playTitle}
          >
            <PlayIcon />
          </IconButton>

          <IconButton
            handleFunction={() => router.push(`/update/${playlist.title}`)}
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

export default MyPlaylistCardView;