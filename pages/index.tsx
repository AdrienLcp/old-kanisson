import type { GetServerSideProps, NextPage } from 'next';
import { useState, useContext } from 'react';
import { api, youtube } from '../api/api';
import styles from '../styles/Home.module.scss';
import InputField from '../components/InputField/InputField';
import { LangContext } from '../contexts/LangContext';
import Modal from '../layouts/Modal/Modal';
import CheckBox from '../components/CheckBox/CheckBox';

import { inputsTexts } from '../langs/components/inputs';

const API_KEY = process.env.API_KEY;

type Props = {
};

const Home: NextPage<Props> = () => {

  const { lang, changeLang } = useContext(LangContext);

  const [title, setTitle] = useState<string>('');
  const [toggleModal, setToggleModal] = useState<boolean>(true);

  return (
    <>

      <br/>
      <br/>
      <br/>
      <br/>

      <InputField
        state={title}
        setState={setTitle}
        name={lang === "fr" ? "Je fais un test" : "test english"}
        id="input-test"
        title="Entrez un titre entre 3 et 25 caractères"
      />

      <br/>
      <br/>
      <br/>
      <br/>

      <CheckBox
        state={toggleModal}
        setState={setToggleModal}
        id="checkbox-modal"
        label='click me'
        title="Cliquez pour changer le thème"
      />

      <br/>
      <br/>
      <br/>
      <br/>

      <button onClick={() => changeLang('en')}>
        {lang === 'fr' ? "Anglais" : "English"}
      </button>

      <br/>
      <br/>

      <button onClick={() => changeLang('fr')}>
        {lang === 'fr' ? "Français" : "French"}
      </button>

      <br/>
      <br/>
      <br/>
      <br/>

      {toggleModal &&
        <p>TEST</p>
      }
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