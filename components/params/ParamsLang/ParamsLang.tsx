import type { FC } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { langs } from '../../../langs/layouts/params';
import frenchFlag from '../../../public/img/frenchFlag.png';
import ukFlag from '../../../public/img/ukFlag.png';
import styles from './ParamsLang.module.scss';
import Image from 'next/image';

const ParamsLang: FC = () => {

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
        <li key={0}>
          <button
            className={lang === 'fr' ?
              `${styles.button} ${styles.button_active}`
            :
              `${styles.button}`
            }
            type="button"
            title={"Site français"}
            aria-label={"Site français"}
            onClick={() => changeLang('fr')}
          >
            <Image
              alt="Drapeau français"
              width={32}
              height={32}
              src={frenchFlag}
            />
          </button>
        </li>

        <li key={1}>
          <button
            className={lang === 'en' ?
              `${styles.button} ${styles.button_active}`
            :
              `${styles.button}`
            }
            type="button"
            title={"English website"}
            aria-label={"English website"}
            onClick={() => changeLang('en')}
          >
            <Image
              alt="United Kingdom flag"
              width={32}
              height={32}
              src={ukFlag}
            />
          </button>
        </li>
      </ul>
    </section>
  );
};

export default ParamsLang;