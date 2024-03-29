import type { FC } from 'react';
import type { TrackSearchCardProps } from '../../../types/components/cards';
import type { Track } from '@prisma/client';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { searchCardTitle } from '../../../translations/components/cards';
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackSearchCard.module.scss';
import { CoverImage } from '../../CoverImage/CoverImage';

export const TrackSearchCard: FC<TrackSearchCardProps> = ({
  currentTrack,
  tracksResults,
  setTracksResults,
  tracks,
  setTracks
}) => {

  const { lang } = useContext(LangContext);

  const cardTitle = searchCardTitle[lang as keyof typeof searchCardTitle];
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
      img: currentTrack.snippet.thumbnails.default.url,
      valid: false
    };

    // Add it to previous list and update state
    const newTrackList = [newTrack, ...tracks];
    setTracks(newTrackList);

    // Remove this track from results list and update state
    const searchList = [...tracksResults];
    const index = searchList.indexOf(currentTrack);
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
      <CoverImage
        url={img}
        height={30}
      />

      <header>
        <h3>
          {currentTrack.snippet.title}
        </h3>
      </header>
    </article>
  );
};