import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { Playlist, Notification } from "@prisma/client";

export type NotificationModalProps = {
  notification: Notification;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

export type PlaylistModalProps = PropsWithChildren<{
  playlist: Playlist;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}>;