import type { Game, Playlist, Track, User } from "@prisma/client";

export type CreateProps = {
  apiKey: string;
};

export type HomeProps = {
  mostPlayedPlaylists: Playlist[];
  topRatedPlaylists: Playlist[];
  mostRecentPlaylists: Playlist[];
  kanissonPlaylists: Playlist[];
  randomPlaylists: Playlist[];
};

export type PlayProps = {
  playlist: Playlist;
  tracks: Track[];
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
  user: User;
};