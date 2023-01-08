import type { FC } from 'react';
import type { ParamsProps } from '../../types/layouts';
import { LangContext } from '../../contexts/LangContext';
import { title, button } from '../../langs/layouts/params';
import { useContext } from 'react';
import styles from './Params.module.scss';

import BurgerIcon from '../../components/buttons/BurgerIcon/BurgerIcon';
import ParamsNav from '../../components/params/ParamsNav/ParamsNav';
import ParamsLang from '../../components/params/ParamsLang/ParamsLang';
import ParamsColor from '../../components/params/ParamsColor/ParamsColor';
import ParamsTheme from '../../components/params/ParamsTheme/ParamsTheme';

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