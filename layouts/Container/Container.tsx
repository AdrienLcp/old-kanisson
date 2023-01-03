import type { FunctionComponent, PropsWithChildren } from 'react';
import UserContextProvider from '../../contexts/UserContext';
import LangContextProvider from '../../contexts/LangContext';
import Background from '../Background/Background';
import Navbar from '../Navbar/Navbar';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => {

  return (
    <UserContextProvider>
      <LangContextProvider>

        <Background />

        <Navbar />

        {children}

      </LangContextProvider>
    </UserContextProvider>
  );
};

export default Container;