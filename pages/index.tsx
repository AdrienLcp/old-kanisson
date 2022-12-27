import { Playlist } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import { api, youtube } from '../api/api';
import styles from '../styles/Home.module.scss';

const API_KEY = process.env.API_KEY;

type Props = {
  data: Playlist[],
  dataTest: any
};

const Home: NextPage<Props> = ({
  data,
  dataTest
}) => {

  console.log(dataTest.items[0].id.videoId);

  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${dataTest.items[0].id.videoId}?autoplay=1`}
        width="560"
        height="315"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  const dataFromAPI = await fetch(`${api}/playlist/getAllVisible`);
  const data = await dataFromAPI.json();

  const dataTestFromYoutube = await fetch(`${youtube}jjg&key=${API_KEY}&maxResults=100`);
  const dataTest = await dataTestFromYoutube.json();

  return {
    props: {
      data,
      dataTest
    }
  };
};

export default Home;
