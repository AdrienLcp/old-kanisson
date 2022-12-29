import type { GetServerSideProps, NextPage } from 'next';
import type { Playlist } from '@prisma/client';
import { useEffect, useState, useMemo } from 'react';
import { api, youtube } from '../api/api';
import styles from '../styles/Home.module.scss';0
import Player from '../components/Player/Player';

const API_KEY = process.env.API_KEY;

type Props = {
  data: Playlist[],
  dataTest: any
};

const Home: NextPage<Props> = ({
  data,
  dataTest
}) => {

  console.log(dataTest.items[0].snippet.title);

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

  const displayedList = useMemo(() => {
    const newList: string[] = [];

    dataTest.items.map((item: any) => newList.push(item.snippet.title));

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
      <button onClick={() => setToggle(prev => !prev)}>Toggle</button>

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
