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

  const [index, setIndex] = useState<number>(0);
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

    // Use current value of setState from index to update goodAnswer state
    setIndex(currentValue => {
      setGoodAnswer(tracks[currentValue]);
      return currentValue;
    });

    // After 30 seconds, show good answer
    setTimeout(() => showGoodAnswer(), guessTime * 1000);
  };

  const showGoodAnswer = () => {
    // Use current value of setState's index to update all needed states
    setIndex(currentValue => {
      // Add current track to 'previousTracks list'
      setPreviousTracks(array => [...array, tracks[currentValue]]);

      // Prepare current track for next song
      setCurrentTrack(tracks[currentValue + 1]);

      // Reset guessingTime & guessed states
      setGuessingTime(false);
      setGuessed(false);

      // After good answer time,
      setTimeout(() => {
        // If all the tracks have been played
        if(currentValue + 1 === tracks.length) {
          // Go to step 3 => game over
          setStep(value => value + 1);
        } else {
          // Or play the next song
          nextSong();
        };
      }, goodAnswerTime * 1000);

      // Increment index
      return currentValue + 1;
    });
  };

  const replaceString = (string: string) :string => {
    const newString = string.toLowerCase();

    // Regex found on web to replace all accents, specials characters & spaces
    return newString.normalize("NFD").replace(/[^a-z0-9]/g, "").replace(" ", "").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSumbitProposal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(guessed) return setUserProposal('');
    setWrongGuess(false);
    setGoodGuess(false);

    const title = replaceString(tracks[index].title);
    const artist = replaceString(tracks[index].artist);
    const proposal = replaceString(userProposal);

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