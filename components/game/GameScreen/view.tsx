import type { FC } from 'react';
import type { GameScreenViewProps } from '../../../types/components/game';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { gameTexts } from '../../../translations/pages/play';
import { CountDown } from '../CountDown/CountDown';
import { InputField } from '../../inputs/InputField/InputField';
import { Timer } from '../Timer/Timer';
import { Player } from '../../Player/Player';
import { SideBar } from '../SideBar/SideBar';
import { GoodAnswer } from '../GoodAnswer/GoodAnswer';
import styles from './GameScreen.module.scss';

export const GameScreenView: FC<GameScreenViewProps> = ({
  currentTrack,
  goodAnswer,
  previousTracks,
  userProposal,
  setUserProposal,
  handleSubmitProposal,
  guessingTime,
  goodGuess,
  wrongGuess,
  gameStarted,
  score
}) => {

  const { lang } = useContext(LangContext);
  const wrongText = gameTexts.wrongGuess[lang as keyof typeof gameTexts.wrongGuess];
  const goodText = gameTexts.goodGuess[lang as keyof typeof gameTexts.goodGuess];
  const inputLabel = gameTexts.inputLabel[lang as keyof typeof gameTexts.inputLabel];
  const inputTitle = gameTexts.inputTitle[lang as keyof typeof gameTexts.inputTitle];

  return (
    <>
      {gameStarted ?
        <div className={styles.container}>
          <form
            className={styles.input}
            onSubmit={handleSubmitProposal}
          >
            <InputField
              value={userProposal}
              setValue={setUserProposal}
              label={inputLabel}
              title={inputTitle}
              id='game-guess-input'
              autoFocus={true}
            />
          </form>

          {guessingTime ?
            <>
              <Player url={currentTrack.youtube_id} />

              {goodGuess &&
                <p className={`${styles.guess} ${styles.guess_good}`}>
                  {goodText}
                </p>
              }

              {wrongGuess &&
                <p className={`${styles.guess} ${styles.guess_wrong}`}>
                  {wrongText}
                </p>
              }

              <Timer />
            </>
          :
            <GoodAnswer goodAnswer={goodAnswer} />
          }

          <SideBar
            previousTracks={previousTracks}
            score={score}
          />
        </div>
      :
        <CountDown />
      }
    </>
  );
};