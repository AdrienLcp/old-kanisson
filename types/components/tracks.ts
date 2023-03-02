import type { Dispatch, SetStateAction } from 'react';
import type { Track } from '@prisma/client';
import { SearchResultItem } from '../youtube';

export type TrackEditProps = {
  track: Track;
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
  apiKey: string;
};

export type TrackSearchViewProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  tracksResults: SearchResultItem[];
  setTracksResults: Dispatch<SetStateAction<SearchResultItem[]>>;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
  fetchData: () => void;
  fetchMoreData: () => void;
  loading: boolean;
  warningMessage: string;
};