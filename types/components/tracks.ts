import type { Dispatch, SetStateAction } from 'react';
import type { SearchResultItem } from '../youtube';
import type { Track } from '@prisma/client';

export type TrackEditProps = {
  track: Track;
  index: number;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

export type TrackEditViewProps = {
  previousTitle: string;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  artist: string;
  setArtist: Dispatch<SetStateAction<string>>;
  updateTrack: () => void;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  deleteTrack: () => void;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type TrackListProps = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
};

export type TrackSearchProps = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  previousSearch: string;
  setPreviousSearch: Dispatch<SetStateAction<string>>;
  tracksResults: SearchResultItem[];
  setTracksResults: Dispatch<SetStateAction<SearchResultItem[]>>;
  apiKey: string;
};