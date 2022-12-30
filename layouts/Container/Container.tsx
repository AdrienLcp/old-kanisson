import type { FunctionComponent, PropsWithChildren } from 'react';
import CurrentUserContextProvider from '../../contexts/CurrentUserContext';
import LangContextProvider from '../../contexts/LangContext';
import Background from '../Background/Background';

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => {

  return (
    <CurrentUserContextProvider>
      <LangContextProvider>

        <Background />

        {children}

      </LangContextProvider>
    </CurrentUserContextProvider>
  );
};

export default Container;