import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';

import UserContextProvider from '../../contexts/UserContext';
import LangContextProvider from '../../contexts/LangContext';

import Background from '../Background/Background';
import Navbar from '../Navbar/Navbar';
import Params from '../Params/Params';

const Container: FC<PropsWithChildren> = ({ children }) => {

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <UserContextProvider>
      <LangContextProvider>

        <Background />

        {children}

        <Params
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
        />

        <Navbar
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
        />

      </LangContextProvider>
    </UserContextProvider>
  );
};

export default Container;