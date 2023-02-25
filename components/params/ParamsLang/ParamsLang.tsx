import type { FC } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { langs } from '../../../translations/layouts/params';
import { v4 as uuidv4 } from 'uuid';
import frenchFlag from '../../../public/img/frenchFlag.png';
import ukFlag from '../../../public/img/ukFlag.png';
import styles from './ParamsLang.module.scss';
import Image from 'next/image';
import { Button } from '../../buttons/Button/Button';

export const ParamsLang: FC = () => {

  const { lang, changeLang } = useContext(LangContext);

  const title = langs[lang as keyof typeof langs];

  return (
    <section className={styles.container}>
      <header>
        <h1 className={styles.title}>
          {title}
        </h1>
      </header>

      <ul className={styles.list}>
        <li key={uuidv4()}>
          <Button
            styles={lang === 'fr' ?
              `${styles.button} ${styles.button_active}`
            :
              `${styles.button}`
            }
            title={"Site français"}
            onClick={() => changeLang('fr')}
          >
            <Image
              alt="Drapeau français"
              width={32}
              height={32}
              src={frenchFlag}
            />
          </Button>
        </li>

        <li key={uuidv4()}>
          <Button
            styles={lang === 'en' ?
              `${styles.button} ${styles.button_active}`
            :
              `${styles.button}`
            }
            title={"English website"}
            onClick={() => changeLang('en')}
          >
            <Image
              alt="United Kingdom flag"
              width={32}
              height={32}
              src={ukFlag}
            />
          </Button>
        </li>
      </ul>
    </section>
  );
};