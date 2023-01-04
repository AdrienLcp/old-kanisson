import type { GetServerSideProps, NextPage } from 'next';
import { api, youtube } from '../api/api';
import styles from '../styles/Home.module.scss';

const API_KEY = process.env.API_KEY;

type Props = {
};

const Home: NextPage<Props> = () => {

  return (
    <>
      Accueil
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async() => {

//   const dataFromAPI = await fetch(`${api}/playlist/getAllVisible`);
//   const data = await dataFromAPI.json();

//   const dataTestFromYoutube = await fetch(`${youtube}jjg&key=${API_KEY}&maxResults=50`);
//   const dataTest = await dataTestFromYoutube.json();

//   return {
//     props: {
//       data,
//       dataTest
//     }
//   };
// };

export default Home;