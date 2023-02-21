import type { FC } from 'react';
import type { TrackListCardProps } from '../../../types/components/cards';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { trackCardTexts } from '../../../translations/components/cards';
import styles from './TrackListCard.module.scss';
import Modal from '../../../layouts/Modal/Modal';
import TrackEdit from '../../TrackEdit';
import CoverImage from '../../CoverImage/CoverImage';

const TrackListCard: FC<TrackListCardProps> = ({
  track,
  index,
  tracks,
  setTracks
}) => {

  const { lang } = useContext(LangContext);
  const warningText = trackCardTexts.warning[lang as keyof typeof trackCardTexts.warning];
  const titleText = trackCardTexts.title[lang as keyof typeof trackCardTexts.title];

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  // If user gave personalized title and artist name, it's a valid track
  const validTrack = track.artist || track.title;

  return (
    <>
      <article
        className={validTrack ?
          `${styles.card}`
        :
          `${styles.card} ${styles.warning}`
        }
        title={validTrack ? titleText : warningText}
        onClick={() => setToggleModal(true)}
      >
        <CoverImage
          url={track.img}
          height={30}
        />

        {!validTrack &&
          <span>
            ⚠️
          </span>
        }

        <header className={styles.header}>
          {track.title || track.artist ?
            <>
              {track.title &&
                <h3 className={styles.title}>
                  {track.title}
                </h3>
              }

              {track.artist &&
                <h4 className={styles.artist}>
                  {track.artist}
                </h4>
              }
            </>
          :
            <h3 className={styles.title}>
              {track.youtube_title}
            </h3>
          }
        </header>
      </article>

      {toggleModal &&
        <Modal setToggleModal={setToggleModal}>
          <TrackEdit
            track={track}
            index={index}
            tracks={tracks}
            setTracks={setTracks}
            setToggleModal={setToggleModal}
          />
        </Modal>
      }
    </>
  );
};

export default TrackListCard;