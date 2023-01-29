import type { Playlist, Track } from "@prisma/client";

export type CreateProps = {
  apiKey: string;
};

export type SearchProps = {
  playlists: Playlist[];
};

export type UpdateProps = {
  playlist: Playlist;
  tracks: Track[];
  apiKey: string;
};