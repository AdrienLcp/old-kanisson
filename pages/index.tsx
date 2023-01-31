import type { Playlist } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { api } from '../api/api';
import { useState } from 'react';
import NextHead from '../layouts/Head/Head';
import styles from '../styles/Home.module.scss';
import PlaylistsSlider from '../components/PlaylistsSlider/PlaylistsSlider';

type Props = {
  playlists: Playlist[]
};

const Home: NextPage<Props> = ({
  // users
  playlists
}) => {

  const [toggle, setToggle] = useState<boolean>(false);

  const getTracks = async() => {
    const token = localStorage.getItem('token');

    await fetch(`${api}/playlist/getAllVisible`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <NextHead />

      <header>
        <h1 className={styles.title}>
          Kanisson
        </h1>
      </header>

      <main className={styles.main}>

        <PlaylistsSlider
          playlists={playlists}
          title="test"
        />

        <PlaylistsSlider
          playlists={playlists}
          title="test"
        />

        <PlaylistsSlider
          playlists={playlists}
          title="test"
        />

        <div className={`${styles.filter} ${styles.filter_left}`} />
        <div className={`${styles.filter} ${styles.filter_right}`} />

      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  const fetchedPlaylists = await fetch(`${api}/playlist/getAllVisible`);
  const playlists = await fetchedPlaylists.json();

  // const usersFromAPI = await fetch(`${api}/user/getAll`);
  // const users = await usersFromAPI.json();

  return {
    props: {
      playlists
      // users,
      // data,
    }
  };
};

export default Home;