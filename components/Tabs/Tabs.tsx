import type { FC, ReactElement } from 'react';
import type { TabsProps } from '../../types/components/others';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../buttons/Button/Button';
import styles from './Tabs.module.scss';

export const Tabs: FC<TabsProps> = ({
  tabs,
  contents
}) => {

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <section className={styles.container}>

      <header className={styles.buttons}>

        <ul className={styles.list}>
          {tabs.map((tab: ReactElement, index: number) =>
            <li className={styles.item} key={uuidv4()}>
              <Button
                styles={selectedTab === index ?
                  `${styles.button} ${styles.selected}`
                :
                  `${styles.button}`
                }
                onClick={() => setSelectedTab(index)}
              >
                <h2>{tab}</h2>
              </Button>
            </li>
          )}
        </ul>
      </header>

      <div className={styles.content}>
        {contents[selectedTab]}
      </div>
    </section>
  );
};