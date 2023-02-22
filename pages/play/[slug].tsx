import type { GetServerSideProps, NextPage } from 'next';
import type { PlayProps } from '../../types/pages';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LangContext } from '../../contexts/LangContext';
import { playHeadTexts } from '../../translations/layouts/head';
import { api } from '../../api/api';
import NextHead from '../../layouts/Head/Head';
import { BeforeGame } from '../../components/game/BeforeGame/BeforeGame';
import { GameOver } from '../../components/game/GameOver/GameOver';
import GameScreen from '../../components/game/GameScreen';

const Play: NextPage<PlayProps> = ({
  playlist,
  tracks
}) => {

  const router = useRouter();
  if(!playlist || !playlist.playable || !playlist.visible) router.push('/404');

  const { logged, user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const headTitle = playHeadTexts.title;
  const headDescriptionBefore = playHeadTexts.description.before[lang as keyof typeof playHeadTexts.description.before];
  const headDescriptionAfter = playHeadTexts.description.after[lang as keyof typeof playHeadTexts.description.after];

  const [step, setStep] = useState<number>(1);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if(logged && step === 3) saveGame();
  }, [step]);

  const saveGame = async() => {
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      pseudo: user.pseudo,
      playlist_id: playlist.id,
      date: new Date().toLocaleDateString(),
      score
    };

    await fetch(`${api}/game/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <NextHead
        title={`${playlist.title} ${headTitle}`}
        description={`${headDescriptionBefore} "${playlist.title}" ${headDescriptionAfter}`}
      />

      <main>
        {step === 1 &&
          <BeforeGame
            playlist={playlist}
            setStep={setStep}
          />
        }

        {step === 2 &&
          <GameScreen
            tracks={tracks}
            score={score}
            setScore={setScore}
            setStep={setStep}
          />
        }

        {step === 3 &&
          <GameOver
            playlist={playlist}
            score={score}
          />
        }
      </main>
    </>
  );
};

export default Play;

export const getServerSideProps: GetServerSideProps = async(context) => {

  const title = context.query.slug;

  // Fetch playlist data
  const fetchedPlaylist = await fetch(`${api}/playlist/getOne`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  const playlist = await fetchedPlaylist.json();

  // Fetch 10 random tracks from this playlist
  const fetchedTracks = await fetch(`${api}/track/getRandomTracksFromPlaylist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlist_id: playlist.id })
  });
  const tracks = await fetchedTracks.json();

  return {
    props: {
      playlist,
      tracks
    }
  };
};