import type { FunctionComponent, PropsWithChildren } from 'react';
import { createContext, useState, useEffect } from 'react';

const initialState = {
  lang: 'fr',
  changeLang: (newLang: string) => {}
};

export const LangContext = createContext<typeof initialState>(initialState);

const LangContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [lang, setLang] = useState<string>('fr');

  useEffect(() => {
    // The favorite lang is saved in local storage
    const previousLang = localStorage.getItem('lang');

    // Update the state in terms of previous lang
    if (previousLang) {
      setLang(previousLang);
      localStorage.setItem('lang', previousLang);
    } else {
      const favoriteLang = navigator.language;

      setLang(favoriteLang);
      localStorage.setItem('lang', favoriteLang);
    };
  }, []);

  const changeLang = (newLang: string) => {
    // When user toggle the lang, in Params component,
    // we update the state and save it in local storage
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContextProvider;