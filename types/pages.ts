import { Playlist } from "@prisma/client";

export type CreateProps = {
  apiKey: string;
};

export type UpdateProps = {
  playlist: Playlist;
  apiKey: string;
};