import type { FC } from 'react';
import type { TabsProps } from '../../types/components/others';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Tabs.module.scss';

const Tabs: FC<TabsProps> = ({
  tabs,
  contents
}) => {

  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <section className={styles.container}>

      <header className={styles.buttons}>

        <ul>
          {tabs.map((tab: string, index: number) =>
            <li key={uuidv4()}>
              <button
                className={selectedTab === index ?
                  `${styles.button} ${styles.selected}`
                :
                  `${styles.button}`
                }
                type="button"
                onClick={() => setSelectedTab(index)}
              >
                <h2>{tab}</h2>
              </button>
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

export default Tabs;