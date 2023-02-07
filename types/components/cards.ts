import type { Dispatch, SetStateAction } from "react";
import type { Notification, Playlist, Track } from "@prisma/client";
import type { SearchResultItem } from "../youtube";

export type MyPlaylistCard = {
  playlist: Playlist;
  index: number;
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
};

export type MyPlaylistCardView = {
  playlist: Playlist;
  deletePlaylist: () => void;
};

export type NotificationCardProps = {
  notification: Notification;
};

export type NotificationCardViewProps = {
  notification: Notification;
  notificationSeen: () => void;
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

export type UserPlaylistCardProps = {
  playlist: Playlist;
};