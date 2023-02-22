import type { FC, FormEvent } from 'react';
import type { GameScreenProps } from '../../../types/components/game';
import type { Track } from '@prisma/client';
import { useState, useEffect } from 'react';
import { GameScreenView } from './view';

const guessTime = 30;
const goodAnswerTime = 5;
const startingTime = 4;

export const GameScreen: FC<GameScreenProps> = ({
  tracks,
  score,
  setScore,
  setStep
}) => {

  let index = 0;

  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [goodAnswer, setGoodAnswer] = useState<Track>(tracks[0]);
  const [previousTracks, setPreviousTracks] = useState<Track[]>([]);
  const [userProposal, setUserProposal] = useState<string>('');
  const [guessingTime, setGuessingTime] = useState<boolean>(false);
  const [guessed, setGuessed] = useState<boolean>(false);
  const [goodGuess, setGoodGuess] = useState<boolean>(false);
  const [wrongGuess, setWrongGuess] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    // Wait 4 seconds for starting animation '3 2 1 GO'
    const timeoutID = setTimeout(() => startGame(), startingTime * 1000);

    // Clear timeout if component unmounted
    return () => clearTimeout(timeoutID);
  }, []);

  const startGame = () => {
    // Start game & first song
    setGameStarted(true);
    nextSong();
  };

  const nextSong = () => {
    // Reset messages
    setWrongGuess(false);
    setGoodGuess(false);

    // Start game & turn on 'guessing time' state
    setGuessingTime(true);

    // Prepare good answer
    setGoodAnswer(tracks[index]);

    // After 30 seconds, show good answer
    setTimeout(() => showGoodAnswer(), guessTime * 1000);
  };

  const showGoodAnswer = () => {
    // Add current track to 'previousTracks list'
    setPreviousTracks(array => [...array, tracks[index]]);

    // Increment index to watch when it's 10th song
    index++;

    // Change current track to prepare next song
    setCurrentTrack(tracks[index]);

    // Stop 'guessing time' state & reset guessed state
    setGuessingTime(false);
    setGuessed(false);

    // After 5 seconds
    setTimeout(() => {
      if(index === tracks.length) {
        // Game is over
        setStep(value => value + 1);
      } else {
        // Start next song
        nextSong();
      };
    }, goodAnswerTime * 1000);
  };

  const handleSumbitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(guessed) return setUserProposal('');
    setWrongGuess(false);
    setGoodGuess(false);

    // Remove all spaces & specials carachters
    const title = tracks[index].title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const artist = tracks[index].artist.toLowerCase().replace(/[^a-z0-9]/g, "");
    const proposal = userProposal.toLowerCase().replace(/[^a-z0-9]/g, "");

    console.log(title, artist, proposal);

    // If proposal includes title or artist
    if(title && proposal.includes(title)
    || artist && proposal.includes(artist)) {
      setGoodGuess(true);

      // Turn on guessed state to avoid multi score on same song
      setGuessed(true);

      // Increment score
      setScore(value => value + 1);
    } else {
      // If not, try again
      setWrongGuess(true);
    };

    // Reset input
    setUserProposal('');
  };

  return (
    <GameScreenView
      currentTrack={currentTrack}
      goodAnswer={goodAnswer}
      previousTracks={previousTracks}
      userProposal={userProposal}
      setUserProposal={setUserProposal}
      handleSubmitProposal={handleSumbitProposal}
      guessingTime={guessingTime}
      goodGuess={goodGuess}
      wrongGuess={wrongGuess}
      gameStarted={gameStarted}
      score={score}
    />
  );
};