import type { Playlist, Track } from "@prisma/client";
import type { Dispatch, FormEvent, SetStateAction } from "react";

export type BeforeGameProps = {
  playlist: Playlist;
  setStep: Dispatch<SetStateAction<number>>;
};

export type GameProps = {
  playlist: Playlist;
  tracks: Track[]
};

export type GameOverProps = {
  playlist: Playlist;
  score: number;
};

export type GameScreenProps = {
  tracks: Track[];
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export type GameScreenViewProps = {
  currentTrack: Track;
  goodAnswer: Track;
  previousTracks: Track[];
  userProposal: string;
  setUserProposal: Dispatch<SetStateAction<string>>;
  handleSubmitProposal: (event: FormEvent<HTMLFormElement>) => void;
  guessingTime: boolean;
  setGuessingTime: Dispatch<SetStateAction<boolean>>;
  goodGuess: boolean;
  wrongGuess: boolean;
  gameStarted: boolean;
  score: number;
};

export type GoodAnswerProps = {
  goodAnswer: Track;
};

export type PreviousTracksProps = {
  previousTracks: Track[];
};

export type RateProps = {
  playlist: Playlist;
  setPlaylistAverage: Dispatch<SetStateAction<number>>;
  setPlaylistRatings: Dispatch<SetStateAction<number[]>>;
  setRated: Dispatch<SetStateAction<boolean>>;
};

export type RateViewProps = {
  ratePlaylist: (newRate: number) => void;
  warningMessage: string;
  setWarningMessage: Dispatch<SetStateAction<string>>;
};

export type ScoreProps = {
  score: number;
};

export type SideBarProps = {
  previousTracks: Track[];
  score: number;
};