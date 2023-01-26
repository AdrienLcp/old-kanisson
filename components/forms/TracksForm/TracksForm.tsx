import type { FC } from 'react';
import type { TracksFormProps } from '../../../types/components/forms';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { titlesTexts } from '../../../translations/components/trackForm';
import styles from './TracksForm.module.scss';
import TrackList from '../../TrackList/TrackList';
import TrackSearch from '../../TrackSearch/TrackSearch';
import ListWrapper from '../../../layouts/wrappers/ListWrapper/ListWrapper';

const TracksForm: FC<TracksFormProps> = ({
  tracks,
  setTracks,
  apiKey
}) => {

  const { lang } = useContext(LangContext);

  const listTitle = titlesTexts.list[lang as keyof typeof titlesTexts.list];
  const searchTitle = titlesTexts.search[lang as keyof typeof titlesTexts.search];

  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <>
      <div className={`${styles.container} ${styles.mobile}`}>

        <header className={styles.header}>
          <h2 className={toggle ?
              `${styles.title} ${styles.selected}`
            :
              `${styles.title}`
          }>
            <button
              className={styles.button}
              type="button"
              onClick={() => setToggle(true)}
            >
              {listTitle}
            </button>
          </h2>

          <h2 className={toggle ?
              `${styles.title}`
            :
              `${styles.title} ${styles.selected}`
          }>
            <button
              className={styles.button}
              type="button"
              onClick={() => setToggle(false)}
            >
              {searchTitle}
            </button>
          </h2>
        </header>

        {toggle ?
          <section className={styles.wrapper}>
            <TrackList
              tracks={tracks}
              setTracks={setTracks}
            />
          </section>
        :
          <section className={styles.wrapper}>
            <TrackSearch
              tracks={tracks}
              setTracks={setTracks}
              apiKey={apiKey}
            />
          </section>
        }
      </div>

      <div className={`${styles.container} ${styles.desktop}`}>

        <ListWrapper title={listTitle}>
          <TrackList
            tracks={tracks}
            setTracks={setTracks}
          />
        </ListWrapper>

        <ListWrapper title={searchTitle}>
          <TrackSearch
            tracks={tracks}
            setTracks={setTracks}
            apiKey={apiKey}
          />
        </ListWrapper>
      </div>
    </>
  );
};

export default TracksForm;