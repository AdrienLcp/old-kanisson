import type { FC } from 'react';
import type { VisiblePlaylistCardViewProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistsTexts } from '../../../translations/components/moderation';
import styles from './VisiblePlaylistCard.module.scss';
import IconButton from '../../buttons/IconButton/IconButton';
import BinIcon from '../../../icons/BinIcon';
import PlaylistModal from '../../moderation/PlaylistModal/PlaylistModal';
import InputArea from '../../inputs/InputArea/InputArea';

const VisiblePlaylistCardView: FC<VisiblePlaylistCardViewProps> = ({
  playlist,
  hidePlaylist,
  message,
  setMessage
}) => {

  const { lang } = useContext(LangContext);
  const deleteTitle = playlistsTexts.delete[lang as keyof typeof playlistsTexts.delete];
  const confirmLabel = playlistsTexts.confirm[lang as keyof typeof playlistsTexts.confirm];
  const deleteText = playlistsTexts.deleteText[lang as keyof typeof playlistsTexts.deleteText];
  const areaLabel = playlistsTexts.areaLabel[lang as keyof typeof playlistsTexts.areaLabel];

  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [toggleMessage, setToggleMessage] = useState<boolean>(false);

  return (
    <>
      <article
        className={styles.card}
        onClick={() => setToggleModal(true)}
      >
        <header className={styles.header}>
          <h3 className={styles.title}>
            {playlist.title}
          </h3>
        </header>
      </article>

      {toggleModal &&
        <PlaylistModal
          playlist={playlist}
          setToggleModal={setToggleModal}
        >
          <section className={styles.buttons}>
            <IconButton
              handleFunction={() => setToggleMessage(true)}
              title={deleteTitle}
              disabled={toggleMessage}
            >
              <BinIcon />
            </IconButton>
          </section>

          <section className={toggleMessage ?
            `${styles.message} ${styles.opened}`
          :
            `${styles.message}`
          }>
            <p className={styles.text}>
              {deleteText}
            </p>

            <div className={styles.area}>
              <InputArea
                value={message}
                setValue={setMessage}
                id="message-visible-playlist-modal-input-area"
                label={areaLabel}
              />
            </div>

            <button
              className={styles.button}
              type='button'
              onClick={hidePlaylist}
            >
              {confirmLabel}
            </button>
          </section>
        </PlaylistModal>
      }
    </>
  );
};

export default VisiblePlaylistCardView;