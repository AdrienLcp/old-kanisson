import type { FC } from 'react';
import type { ParamsProps } from '../../types/layouts';
import { LangContext } from '../../contexts/LangContext';
import { title } from '../../translations/layouts/params';
import { burgerButton } from '../../translations/components/buttons';
import { useContext } from 'react';
import styles from './Params.module.scss';

import { BurgerIcon } from '../../components/BurgerIcon/BurgerIcon';
import { ParamsNav } from '../../components/params/ParamsNav/ParamsNav';
import { ParamsLang } from '../../components/params/ParamsLang/ParamsLang';
import { ParamsColor } from '../../components/params/ParamsColor/ParamsColor';
import { ParamsTheme } from '../../components/params/ParamsTheme/ParamsTheme';
import { Button } from '../../components/buttons/Button/Button';

export const Params: FC<ParamsProps> = ({
  toggleMenu,
  setToggleMenu
}) => {

  const { lang } = useContext(LangContext);

  const headingTtitle = title[lang as keyof typeof title];
  const openTitle = burgerButton.open[lang as keyof typeof burgerButton.open];
  const closeTitle = burgerButton.close[lang as keyof typeof burgerButton.close];

  return (
    <aside>
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

        <div className={styles.params}>
          <ParamsNav setToggleMenu={setToggleMenu} />

          <ParamsColor />

          <ParamsTheme />

          <ParamsLang />
        </div>
      </section>

      <Button
        styles={`${styles.button} ${styles.mobile_hidden}`}
        title={toggleMenu ? closeTitle : openTitle}
        onClick={() => setToggleMenu(prev => !prev)}
      >
        <BurgerIcon state={toggleMenu} />
      </Button>
    </aside>
  );
};