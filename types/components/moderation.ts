import type { Dispatch, SetStateAction } from "react";
import type { Playlist } from "@prisma/client";

export type HiddenPlaylistCardViewProps = {
  playlist: Playlist;
  restorePlaylist: () => void;
  deletePlaylist: () => void;
};

export type ModerationPlaylistCardProps = {
  playlist: Playlist;
  index: number;
  visiblePlaylists: Playlist[];
  setVisiblePlaylists: Dispatch<SetStateAction<Playlist[]>>;
  hiddenPlaylists: Playlist[];
  setHiddenPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type VisiblePlaylistCardViewProps = {
  playlist: Playlist;
  hidePlaylist: () => void;
};

export type PlaylistsListProps = {
  visiblePlaylists: Playlist[];
  setVisiblePlaylists: Dispatch<SetStateAction<Playlist[]>>;
  hiddenPlaylists: Playlist[];
  setHiddenPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};