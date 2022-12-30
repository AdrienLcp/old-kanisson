import type { GetServerSideProps, NextPage } from 'next';
import type { Playlist } from '@prisma/client';
import { useEffect, useState, useMemo, useContext } from 'react';
import { api, youtube } from '../api/api';
import styles from '../styles/Home.module.scss';
import Player from '../components/Player/Player';
import { LangContext } from '../contexts/LangContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useFetch from '../hooks/useFetch';
import { SearchResults } from '../types/youtube';

const API_KEY = process.env.API_KEY;

type Props = {
  data: Playlist[],
  dataTest: SearchResults
};

const Home: NextPage<Props> = ({
  data,
  dataTest
}) => {

  const { user, setUser } = useContext(CurrentUserContext);

  const [toggle, setToggle] = useState<boolean>(false);
  const [id, setID] = useState<string>(dataTest.items[0].id.videoId);

  const [list, setList] = useState<Playlist[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setID("fCK8-2pdtFU");
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // const [test, loading] = useFetch(`${youtube}jjg&key=${API_KEY}&maxResults=50`);

  const displayedList = useMemo(() => {
    const newList: string[] = [];

    // test?.map((item: any) => newList.push(item.snippet.title));

    return newList;
  }, [list]);

  return (
    <>
      {toggle &&
        <Player url={id} />
      }

      <br />
      <br />
      <br />
      <br />

      {/* {loading ?
        "Chargement..."
      :
        test?.map((item: Playlist, index: number) => {
          return (

          <li key={index}>{item.title}</li>
          );
        }
        )
      } */}

      <br />
      <br />
      <br />
      <br />

      <button onClick={() => setUser({...user, pseudo: "Vadrial", admin: true})}>User</button>

      <br />
      <br />
      <br />
      <br />

      <button onClick={() => setToggle(prev => !prev)}>Toggle player</button>

      <br />
      <br />
      <br />
      <br />

      <ul>
        {displayedList.map((item: any, index: number) =>
          <li key={index}>
            {item}
          </li>
        )}
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  const dataFromAPI = await fetch(`${api}/playlist/getAllVisible`);
  const data = await dataFromAPI.json();

  const dataTestFromYoutube = await fetch(`${youtube}jjg&key=${API_KEY}&maxResults=50`);
  const dataTest = await dataTestFromYoutube.json();

  return {
    props: {
      data,
      dataTest
    }
  };
};

export default Home;