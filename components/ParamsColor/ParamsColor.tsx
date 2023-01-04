import type { FC } from 'react';
import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { theme } from '../../langs/layouts/params';
import styles from './ParamsColor.module.scss';

const ParamsColor: FC = () => {

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
        <li key={0}>
          <button
            className={hue === '250' ?
              `${styles.purple} ${styles.button} ${styles.button_active}`
            :
              `${styles.purple} ${styles.button}`
            }
            type="button"
            aria-label={purpleTitle}
            title={purpleTitle}
            onClick={() => changeColor('250')}
          />
        </li>

        <li key={1}>
          <button
            className={hue === '230' ?
              `${styles.blue} ${styles.button} ${styles.button_active}`
            :
              `${styles.blue} ${styles.button}`
            }
            type="button"
            aria-label={blueTitle}
            title={blueTitle}
            onClick={() => changeColor('230')}
          />
        </li>

        <li key={2}>
          <button
            className={hue === '340' ?
              `${styles.pink} ${styles.button} ${styles.button_active}`
            :
              `${styles.pink} ${styles.button}`
            }
            type="button"
            aria-label={pinkTitle}
            title={pinkTitle}
            onClick={() => changeColor('340')}
          />
        </li>

        <li key={3}>
          <button
            className={hue === '360' ?
              `${styles.red} ${styles.button} ${styles.button_active}`
            :
              `${styles.red} ${styles.button}`
            }
            type="button"
            aria-label={redTitle}
            title={redTitle}
            onClick={() => changeColor('360')}
          />
        </li>

        <li key={4}>
          <button
            className={hue === '25' ?
              `${styles.orange} ${styles.button} ${styles.button_active}`
            :
              `${styles.orange} ${styles.button}`
            }
            type="button"
            aria-label={orangeTitle}
            title={orangeTitle}
            onClick={() => changeColor('25')}
          />
        </li>
      </ul>
    </section>
  );
};

export default ParamsColor;