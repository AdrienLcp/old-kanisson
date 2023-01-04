import type { FC } from 'react';
import type { ParamsProps } from '../../types/layoutsProps';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import styles from './Params.module.scss';

import { title, button } from '../../langs/layouts/params';
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon';
import ParamsNav from '../../components/ParamsNav/ParamsNav';
import ParamsLang from '../../components/ParamsLang/ParamsLang';
import ParamsColor from '../../components/ParamsColor/ParamsColor';
import ParamsTheme from '../../components/ParamsTheme/ParamsTheme';

const Params: FC<ParamsProps> = ({
  toggleMenu,
  setToggleMenu
}) => {

  const { lang } = useContext(LangContext);

  const headingTtitle = title[lang as keyof typeof title];
  const buttonTitle = button[lang as keyof typeof button];

  return (
    <div className={styles.test}>
      <section
        className={toggleMenu ?
          `${styles.container} ${styles.container_opened}`
        :
          `${styles.container}`
        }
      >
        <header>
          <h1 className={styles.title}>
            {headingTtitle}
          </h1>
        </header>

        <ParamsNav setToggleMenu={setToggleMenu} />

        <ParamsColor />

        <ParamsTheme />

        <ParamsLang />
      </section>

      <button
        className={`${styles.button} ${styles.mobile_hidden}`}
        type="button"
        title={buttonTitle}
        aria-label={buttonTitle}
        onClick={() => setToggleMenu(prev => !prev)}
      >
        <BurgerIcon state={toggleMenu} />
      </button>
    </div>
  );
};

export default Params;