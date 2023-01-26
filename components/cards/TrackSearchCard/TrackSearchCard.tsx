import type { FC } from 'react';
import type { TrackSearchCardProps } from '../../../types/components/cards';
import type { Track } from '@prisma/client';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { searchCardTitle, trackCardTexts } from '../../../translations/components/cards';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import styles from './TrackSearchCard.module.scss';
import ImageIcon from '../../../icons/ImageIcon';

const TrackSearchCard: FC<TrackSearchCardProps> = ({
  currentTrack,
  index,
  tracksResults,
  setTracksResults,
  tracks,
  setTracks
}) => {

  const { lang } = useContext(LangContext);

  const cardTitle = searchCardTitle[lang as keyof typeof searchCardTitle];
  const altText = trackCardTexts.coverAlt[lang as keyof typeof trackCardTexts.coverAlt];
  const img = currentTrack.snippet.thumbnails.default.url;

  const addToList = () => {
    // Create the new track to add
    const newTrack: Track = {
      id: uuidv4(),
      playlist_id: '',
      youtube_id: currentTrack.id.videoId,
      youtube_title: currentTrack.snippet.title,
      title: '',
      artist: '',
      img: currentTrack.snippet.thumbnails.high.url
    };

    // Add it to previous list and update state
    const newTrackList = [...tracks, newTrack];
    setTracks(newTrackList);

    // Remove this track from results list and update state
    const searchList = [...tracksResults];
    searchList.splice(index, 1);
    setTracksResults(searchList);
  };

  return (
    <article
      className={styles.card}
      title={cardTitle}
      aria-label={cardTitle}
      onClick={addToList}
    >
      <header className={styles.header}>
        <div className={styles.image}>
          {img ?
            <Image
              alt={altText}
              width={30}
              height={30}
              src={img}
            />
          :
            <ImageIcon height='30' />
          }
        </div>

        <h3 className={styles.title}>
          {currentTrack.snippet.title}
        </h3>
      </header>
    </article>
  );
};

export default TrackSearchCard;