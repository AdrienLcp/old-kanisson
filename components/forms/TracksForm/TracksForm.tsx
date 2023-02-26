import type { FC } from 'react';
import type { TracksFormProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { titlesTexts } from '../../../translations/components/trackForm';
import { v4 as uuidv4 } from 'uuid';
import styles from './TracksForm.module.scss';
import { TrackList } from '../../TrackList/TrackList';
import { TrackSearch } from '../../TrackSearch/TrackSearch';
import { ListWrapper } from '../../../layouts/wrappers/ListWrapper/ListWrapper';
import { Tabs } from '../../Tabs/Tabs';

export const TracksForm: FC<TracksFormProps> = ({
  tracks,
  setTracks,
  apiKey
}) => {

  const { lang } = useContext(LangContext);

  const listTitle = titlesTexts.list[lang as keyof typeof titlesTexts.list];
  const searchTitle = titlesTexts.search[lang as keyof typeof titlesTexts.search];

  return (
    <>
      <div className={`${styles.container} ${styles.mobile}`}>
        <Tabs
          tabs={[
            <h2 key={uuidv4()}>{listTitle} ({tracks.length})</h2>,
            <h2 key={uuidv4()}>{searchTitle}</h2>
          ]}
          contents={[
            <TrackList
              key={uuidv4()}
              tracks={tracks}
              setTracks={setTracks}
            />,
            <TrackSearch
              key={uuidv4()}
              tracks={tracks}
              setTracks={setTracks}
              apiKey={apiKey}
            />
          ]}
        />
      </div>

      <div className={`${styles.container} ${styles.desktop}`}>

        <ListWrapper title={`${listTitle} (${tracks.length})`}>
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