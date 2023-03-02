import styles from '../styles/Home.module.scss';
import type { GetServerSideProps, NextPage } from 'next';
import type { Playlist } from '@prisma/client';
import type { HomeProps } from '../types/pages';
import { api } from '../api/api';
import { useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { LangContext } from '../contexts/LangContext';
import { playlistsTexts } from '../translations/pages/home';
import { NextHead } from '../layouts/Head/Head';
import { PlaylistsSlider } from '../components/PlaylistsSlider/PlaylistsSlider';

const Home: NextPage<HomeProps> = ({
  mostPlayedPlaylists,
  topRatedPlaylists,
  mostRecentPlaylists,
  kanissonPlaylists,
  randomPlaylists
}) => {

  const { user, logged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const playedText = playlistsTexts.played[lang as keyof typeof playlistsTexts.played];
  const ratedText = playlistsTexts.rated[lang as keyof typeof playlistsTexts.rated];
  const recentText = playlistsTexts.recent[lang as keyof typeof playlistsTexts.recent];
  const baseText = playlistsTexts.base[lang as keyof typeof playlistsTexts.base];
  const randomText = playlistsTexts.random[lang as keyof typeof playlistsTexts.random];
  const userPlaylistsText = playlistsTexts.userPlaylists[lang as keyof typeof playlistsTexts.userPlaylists];
  const userPlayedText = playlistsTexts.userPlayed[lang as keyof typeof playlistsTexts.userPlayed];
  const userLikedText = playlistsTexts.userLiked[lang as keyof typeof playlistsTexts.userLiked];

  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);
  const [userLikedPlaylists, setUserLikedPlaylists] = useState<Playlist[]>([]);
  const [userPlayedPlaylists, setUserPlayedPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    if(logged) {
      getUserPlaylists();
      getData(`getPlaylistsByUserRate`, setUserLikedPlaylists);
      getData(`getPlaylistsByUserPlayed`, setUserPlayedPlaylists);
    };
  }, [logged]);

  const getUserPlaylists = async() => {
    await fetch(`${api}/playlist/getUserPlaylists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo: user.pseudo })
    })
    .then(async(res) => {
      const data = await res.json();
      setUserPlaylists(data);
    })
    .catch((error) => console.log(error));
  };

  const getData = async(url: string, setState: Dispatch<SetStateAction<Playlist[]>>) => {
    const token = localStorage.getItem('token');

    await fetch(`${api}/playlist/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: user.id })
    })
    .then(async(res) => {
      const data = await res.json();
      setState(data);
    })
    .catch((error) => console.log(error));
  };

  return (
    <>
      <NextHead />

      <header className={styles.header}>
        <h1 className={styles.title}>
          Kanisson
        </h1>
      </header>

      <main className={styles.main}>

        {mostPlayedPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={mostPlayedPlaylists}
            title={playedText}
          />
        }

        {topRatedPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={topRatedPlaylists}
            title={ratedText}
          />
        }

        {mostRecentPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={mostRecentPlaylists}
            title={recentText}
          />
        }

        {kanissonPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={kanissonPlaylists}
            title={baseText}
          />
        }

        {randomPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={randomPlaylists}
            title={randomText}
          />
        }

        {userPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={userPlaylists}
            title={userPlaylistsText}
          />
        }

        {userPlayedPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={userPlayedPlaylists}
            title={userPlayedText}
          />
        }

        {userLikedPlaylists.length > 0 &&
          <PlaylistsSlider
            playlists={userLikedPlaylists}
            title={userLikedText}
          />
        }

        <div className={`${styles.filter} ${styles.filter_left}`} />
        <div className={`${styles.filter} ${styles.filter_right}`} />

      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  const fetchedMostPlayedPlaylists = await fetch(`${api}/playlist/getAllByPlayed`);
  const mostPlayedPlaylists = await fetchedMostPlayedPlaylists.json();

  const fetchedTopRatedPlaylists = await fetch(`${api}/playlist/getAllByRate`);
  const topRatedPlaylists = await fetchedTopRatedPlaylists.json();

  const fetchedMostRecentPlaylists = await fetch(`${api}/playlist/getAllByDate`);
  const mostRecentPlaylists = await fetchedMostRecentPlaylists.json();

  const fetchedKanissonPlaylists = await fetch(`${api}/playlist/getKanissonPlaylists`);
  const kanissonPlaylists = await fetchedKanissonPlaylists.json();

  const fetchedRandomPlaylists = await fetch(`${api}/playlist/getRandomPlaylists`);
  const randomPlaylists = await fetchedRandomPlaylists.json();

  return {
    props: {
      mostPlayedPlaylists,
      topRatedPlaylists,
      mostRecentPlaylists,
      kanissonPlaylists,
      randomPlaylists
    }
  };
};

export default Home;