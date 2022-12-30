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
    const previousLanguage = localStorage.getItem('lang');

    // Update the state in terms of previous lang
    if (previousLanguage) {
      if(previousLanguage === 'en') {
        setLang('en');
        localStorage.setItem('lang', 'en');
      } else {
        setLang('fr');
        localStorage.setItem('lang', 'fr');
      };
    } else {
      const favoriteLang = navigator.language;

      if(favoriteLang === 'en') {
        setLang('en');
        localStorage.setItem('lang', 'en');
      };
    };
  }, []);

  const changeLang = (newLanguage: string) => {
    // When user toggle the lang, in Params component,
    // we update the state and save it in local storage
    if (newLanguage === 'en') {
      setLang('en');
      localStorage.setItem('lang', 'en');
    } else if (newLanguage === 'fr') {
      setLang('fr');
      localStorage.setItem('lang', 'fr');
    };
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
};

export default LangContextProvider;