import type { FC } from "react";
import { useEffect, useState, useContext } from 'react';
import styles from './ParamsTheme.module.scss';
import CheckBox from '../CheckBox/CheckBox';
import { LangContext } from "../../contexts/LangContext";
import { theme } from "../../langs/layouts/params";

const ParamsTheme: FC = () => {

  const { lang } = useContext(LangContext);

  const title = theme.title[lang as keyof typeof theme.title];
  const darkTitle = theme.dark[lang as keyof typeof theme.dark];
  const lightTitle = theme.light[lang as keyof typeof theme.light];

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Get the previous favorite theme on local storage
    const previousTheme = localStorage.getItem('favorite-theme');

    // If the previous theme was 'dark'
    if(previousTheme === 'dark') {
      // Toggle state (false by default)
      setDarkMode(!darkMode);
    };
  }, []);

  // This useEffect watch state of dark mode
  useEffect(() => {
    // If dark mode is on
    if(darkMode) {
      // Add classlist to body for colors in CSS
      document.body.classList.add('dark');

      // & save it as favorite theme in local storage
      localStorage.setItem('favorite-theme', 'dark');
    } else {
      // If dark mode is off, remove classlist from body
      document.body.classList.remove('dark');

      // & save 'light' mode as favorite
      localStorage.setItem('favorite-theme', 'light');
    };
  }, [darkMode]);

  return (
    <section className={styles.container}>
      <header>
        <h1 className={styles.title}>
          {title}
        </h1>
      </header>

      <CheckBox
        id={'theme-switch'}
        title={darkMode ? lightTitle : darkTitle}
        state={darkMode}
        setState={setDarkMode}
      />
    </section>
  );
};

export default ParamsTheme