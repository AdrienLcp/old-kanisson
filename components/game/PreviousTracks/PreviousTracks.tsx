import type { FC } from 'react';
import type { PreviousTracksProps } from '../../../types/components/game';
import type { Track } from '@prisma/client';
import { useState, useContext, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { gameTexts } from '../../../translations/pages/play';
import { v4 as uuidv4 } from 'uuid';
import styles from './PreviousTracks.module.scss';
import { Button } from '../../buttons/Button/Button';
import { CoverImage } from '../../CoverImage/CoverImage';
import ArrowIcon from '../../../icons/ArrowIcon';

export const PreviousTracks: FC<PreviousTracksProps> = ({
  previousTracks
}) => {

  const { lang } = useContext(LangContext);
  const label = gameTexts.previousTracks[lang as keyof typeof gameTexts.previousTracks];

  const [opened, setOpened] = useState<boolean>(false);

  const displayedTracks = useMemo(() => {
    return previousTracks;
  }, [previousTracks]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.desktop_hidden}>
          <Button
            onClick={() => setOpened(prev => !prev)}
            styles={styles.button}
          >
            {label} ({previousTracks.length})

            <span className={opened ?
              `${styles.arrow} ${styles.rotated}`
            :
              `${styles.arrow}`
            }>
              <ArrowIcon height='16' />
            </span>
          </Button>
        </h2>

        <h2 className={`${styles.mobile_hidden} ${styles.previous_title}`}>
          {label} ({previousTracks.length})
        </h2>
      </header>

      <ul className={opened ?
        `${styles.list} ${styles.opened}`
      :
        `${styles.list}`
      }>

        {displayedTracks?.map((track: Track) =>
          <li key={uuidv4()} className={styles.item}>
            <article className={styles.card}>

              <CoverImage url={track.img} />

              <header>
                {track.title &&
                  <h5 className={styles.title}>
                    {track.title}
                  </h5>
                }

                {track.artist &&
                  <h6 className={styles.artist}>
                    {track.artist}
                  </h6>
                }
              </header>
            </article>
          </li>
        )}
      </ul>
    </section>
  );
};