import type { FC } from 'react';
import type { TrackListCardProps } from '../../../types/components/cards';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { trackCardTexts } from '../../../translations/components/cards';
import Image from 'next/image';
import styles from './TrackListCard.module.scss';
import ImageIcon from '../../../icons/ImageIcon';

const TrackListCard: FC<TrackListCardProps> = ({
  track,
  index,
  tracks,
  setTracks
}) => {

  const { lang } = useContext(LangContext);

  const altText = trackCardTexts.coverAlt[lang as keyof typeof trackCardTexts.coverAlt];

  return (
    <article className={styles.card}
    >

      {track.img ?
        <Image
          width={30}
          height={30}
          alt={altText}
          src={track.img}
        />
      :
        <ImageIcon />
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
  );
};

export default TrackListCard;