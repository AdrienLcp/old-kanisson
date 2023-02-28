import type { Dispatch, SetStateAction } from "react";
import type { Notification, Playlist, Track } from "@prisma/client";
import type { SearchResultItem } from "../youtube";

export type MyPlaylistCardProps = {
  playlist: Playlist;
  index: number;
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
};

export type MyPlaylistCardViewProps = {
  playlist: Playlist;
  deletePlaylist: () => void;
};

export type NotificationCardProps = {
  notification: Notification;
  index: number;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
};

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