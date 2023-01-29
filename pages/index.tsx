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

      <PageWrapper title='Home'>

        {toggle &&
          <Player url='493R05ifNsI' setTogglePlayer={setToggle} />
        }

        <button onClick={() => setToggle(prev => !prev)}>
          toggle
        </button>

<br />
<br />
<br />
<br />
        <button onClick={getTracks}>
          GET ALL TRACKS
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