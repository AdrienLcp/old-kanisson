import { Playlist } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { api } from '../api/api';
import styles from '../styles/Home.module.scss';

export default function Home({ data }: {data: Playlist[]}) {

  console.log(data);
  
  return (
    <>
      Hello World
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  const dataFromAPI = await fetch(`${api}/playlist/getAllVisible`);

  const data = await dataFromAPI.json();

  return {
    props: {
      data,
    }
  };
};