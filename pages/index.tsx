import type { User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { api } from '../api/api';
import { useState } from 'react';
import Player from '../components/Player/Player';
import NextHead from '../layouts/Head/Head';
import PageWrapper from '../layouts/wrappers/PageWrapper/PageWrapper';
import styles from '../styles/Home.module.scss';

type Props = {
  users: User[]
};

const Home: NextPage<Props> = ({
  // users
}) => {

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <NextHead />

      <PageWrapper title='Home'>

        {toggle &&
          <Player url='493R05ifNsI' setTogglePlayer={setToggle} />
        }

        <button onClick={() => setToggle(prev => !prev)}>
          toggle
        </button>

      </PageWrapper>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async() => {

  // const dataFromAPI = await fetch(`${api}/playlist/getAllVisible`);
  // const data = await dataFromAPI.json();

  // const usersFromAPI = await fetch(`${api}/user/getAll`);
  // const users = await usersFromAPI.json();

  return {
    props: {
      // users,
      // data,
    }
  };
};

export default Home;