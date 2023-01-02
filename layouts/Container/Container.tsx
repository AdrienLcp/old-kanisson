import type { FunctionComponent, PropsWithChildren } from 'react';
import UserContextProvider from '../../contexts/UserContext';
import LangContextProvider from '../../contexts/LangContext';
import Background from '../Background/Background';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => {

  return (
    <UserContextProvider>
      <LangContextProvider>

        <Background />

        {children}

      </LangContextProvider>
    </UserContextProvider>
  );
};

export default Container;