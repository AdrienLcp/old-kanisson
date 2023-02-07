import type { Game, Playlist, Track } from "@prisma/client";

export type CreateProps = {
  apiKey: string;
};

export type PlaylistsModerationProps = {
  visiblePlaylistsData: Playlist[];
};

export type SearchProps = {
  playlists: Playlist[];
};

export type UpdateProps = {
  playlist: Playlist;
  tracks: Track[];
  apiKey: string;
};

export type UserProfileProps = {
  userPlaylists: Playlist[];
  userGames: Game[];
  pseudo: string;
};