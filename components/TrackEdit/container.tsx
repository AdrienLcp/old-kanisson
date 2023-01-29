import type { FC } from 'react';
import type { TrackEditProps } from '../../types/components/tracks';
import { useState, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import TrackEditView from './view';
import Player from '../Player/Player';
import { warningTexts } from '../../translations/components/trackEdit';

const TrackEdit: FC<TrackEditProps> = ({
  track,
  index,
  tracks,
  setTracks,
  setToggleModal
}) => {

  const { lang } = useContext(LangContext);
  const warningLength = warningTexts.length[lang as keyof typeof warningTexts.length];

  const previousTitle = track.youtube_title;
  const [title, setTitle] = useState<string>(track.title);
  const [artist, setArtist] = useState<string>(track.artist);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Check if title & artist have 50 length max
  const checkTrack = () => {
    setWarningMessage('');

    if(title.length > 50) {
      setWarningMessage(warningLength)
      return false;
    } else if(artist.length > 50) {
      setWarningMessage(warningLength)
      return false;
    };
    return true;
  };

  const updateTrack = () => {
    if(checkTrack()) {
      // Change title & artist for the right track
      const tracksList = [...tracks];
      tracksList[index].title = title;
      tracksList[index].artist = artist;

      if(title && artist) tracksList[index].valid = true;

      // Update state & close modal
      setTracks(tracksList);
      setToggleModal(false);
    };
  };

  const deleteTrack = () => {
    // Delete the right track from tracksList with his index
    const tracksList = [...tracks];
    tracksList.splice(index, 1);

    // Update state & close modal
    setTracks(tracksList);
    setToggleModal(false);
  };

  return (
    <>
      <TrackEditView
        previousTitle={previousTitle}
        title={title}
        setTitle={setTitle}
        artist={artist}
        setArtist={setArtist}
        updateTrack={updateTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        deleteTrack={deleteTrack}
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
      />

      {isPlaying &&
        <Player
          url={track.youtube_id}
          setTogglePlayer={setIsPlaying}
        />
      }
    </>
  );
};

export default TrackEdit;