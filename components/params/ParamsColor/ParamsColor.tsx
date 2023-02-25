import type { FC } from 'react';
import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { theme } from '../../../translations//layouts/params';
import { ColorPicker } from '../../ColorPicker/ColorPicker';
import styles from './ParamsColor.module.scss';

export const ParamsColor: FC = () => {

  const { lang } = useContext(LangContext);

  const [hue, setHue] = useState<string>('250');

  const title = theme.color[lang as keyof typeof theme.color];
  const blueTitle = theme.blue[lang as keyof typeof theme.blue];
  const redTitle = theme.red[lang as keyof typeof theme.red];
  const purpleTitle = theme.purple[lang as keyof typeof theme.purple];
  const pinkTitle = theme.pink[lang as keyof typeof theme.pink];
  const orangeTitle = theme.orange[lang as keyof typeof theme.orange];

  useEffect(() => {
    // Get the previous favorite color on local storage
    const previousTheme = localStorage.getItem('favorite-color');

    // If there is a previous favorite color saved,
    if(previousTheme) {
      // We can change the hue color
      changeColor(previousTheme);
      setHue(previousTheme);
    };
  }, []);

  const changeColor = (newHue: string) => {
    // We can change de hue color on CSS root properties
    document.documentElement.style.setProperty('--hue-color', newHue);

    // Then we save the new favorite color in the local storage
    localStorage.setItem('favorite-color', newHue);

    // & in the state
    setHue(newHue);
  };

  return (
    <section className={styles.container}>
      <header>
        <h1 className={styles.title}>
          {title}
        </h1>
      </header>

      <ul className={styles.list}>
        <ColorPicker
          hue={hue}
          itemHue={'250'}
          title={purpleTitle}
          color={styles.purple}
          changeColor={changeColor}
        />

        <ColorPicker
          hue={hue}
          itemHue={'230'}
          title={blueTitle}
          color={styles.blue}
          changeColor={changeColor}
        />

        <ColorPicker
          hue={hue}
          itemHue={'25'}
          title={orangeTitle}
          color={styles.orange}
          changeColor={changeColor}
        />

        <ColorPicker
          hue={hue}
          itemHue={'360'}
          title={redTitle}
          color={styles.red}
          changeColor={changeColor}
        />

        <ColorPicker
          hue={hue}
          itemHue={'340'}
          title={pinkTitle}
          color={styles.pink}
          changeColor={changeColor}
        />
      </ul>
    </section>
  );
};