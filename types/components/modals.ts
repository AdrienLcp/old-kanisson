import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { Playlist } from "@prisma/client";

export type PlaylistModalProps = PropsWithChildren<{
  playlist: Playlist;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}>;