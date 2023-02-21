import type { FC } from 'react';
import type { SideBarProps } from '../../../types/components/game';
import { Score } from '../Score/Score';
import { PreviousTracks } from '../PreviousTracks/PreviousTracks';
import styles from './SideBar.module.scss';

export const SideBar: FC<SideBarProps> = ({
  previousTracks,
  score
}) => {

  return (
    <aside className={styles.sidebar}>

      <Score score={score} />

      {previousTracks.length > 0 &&
        <PreviousTracks previousTracks={previousTracks} />
      }
    </aside>
  );
};