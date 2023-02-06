import type { Dispatch, SetStateAction } from "react";
import type { Playlist, User } from "@prisma/client";

export type BannedUsersCardViewProps = {
  user: User;
  unbanUser: () => void;
  deleteUser: () => void;
};

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
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
};

export type PlaylistsListProps = {
  visiblePlaylists: Playlist[];
  setVisiblePlaylists: Dispatch<SetStateAction<Playlist[]>>;
  hiddenPlaylists: Playlist[];
  setHiddenPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type UserCardProps = {
  user: User;
  index: number;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  bannedUsers: User[];
  setBannedUsers: Dispatch<SetStateAction<User[]>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type UserCardViewProps = {
  currentUser: User;
  manageUser: () => void;
  banUser: () => void;
};

export type UsersListProps = {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  bannedUsers: User[];
  setBannedUsers: Dispatch<SetStateAction<User[]>>;
  setValidMessage: Dispatch<SetStateAction<string>>;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};