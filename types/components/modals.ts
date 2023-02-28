import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { Playlist, Notification } from "@prisma/client";

export type NotificationModalProps = {
  notification: Notification;
  index: number;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
};

export type PlaylistModalProps = PropsWithChildren<{
  playlist: Playlist;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}>;