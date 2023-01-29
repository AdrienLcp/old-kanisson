import type { Dispatch, SetStateAction } from "react";
import type { Playlist, Track } from "@prisma/client";
import type { SearchResultItem } from "../youtube";

export type PlaylistCard = {
  playlist: Playlist;
};

export type TrackListCardProps = {
  track: Track;
  index: number;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
};

export type TrackSearchCardProps = {
  currentTrack: SearchResultItem;
  index: number;
  tracksResults: SearchResultItem[];
  setTracksResults: Dispatch<SetStateAction<SearchResultItem[]>>;
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>>;
};