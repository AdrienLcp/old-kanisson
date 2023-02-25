import type { FC } from 'react';
import type { TracksFormProps } from '../../../types/components/forms';
import type { SearchResultItem } from '../../../types/youtube';
import { useContext, useState } from 'react';
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

  // Search states in this component to prevent to many fetchs with toggle state
  const [search, setSearch] = useState<string>('');
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const [tracksResults, setTracksResults] = useState<SearchResultItem[]>([]);

  return (
    <>
      <div className={`${styles.container} ${styles.mobile}`}>
        <Tabs
          tabs={[`${listTitle} (${tracks.length})`, `${searchTitle}`]}
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
              search={search}
              setSearch={setSearch}
              previousSearch={previousSearch}
              setPreviousSearch={setPreviousSearch}
              tracksResults={tracksResults}
              setTracksResults={setTracksResults}
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
            search={search}
            setSearch={setSearch}
            previousSearch={previousSearch}
            setPreviousSearch={setPreviousSearch}
            tracksResults={tracksResults}
            setTracksResults={setTracksResults}
            apiKey={apiKey}
          />
        </ListWrapper>
      </div>
    </>
  );
};