import type { FC } from 'react';
import type { TrackEditProps } from '../../types/components/tracks';
import { useState, useEffect } from 'react';
import TrackEditView from './view';
import Player from '../Player/Player';

const TrackEdit: FC<TrackEditProps> = ({
  track,
  index,
  tracks,
  setTracks,
  setToggleModal
}) => {

  const previousTitle = track.youtube_title;
  const [title, setTitle] = useState<string>(track.title);
  const [artist, setArtist] = useState<string>(track.artist);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setIsPlaying(false);
    };
  }, []);

  const updateTrack = () => {
    // Change title & artist for the right track
    const tracksList = [...tracks];
    tracksList[index].title = title;
    tracksList[index].artist = artist;

    // Update state & close modal
    setTracks(tracksList);
    setToggleModal(false);
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