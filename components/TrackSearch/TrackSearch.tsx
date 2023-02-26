import type { FC } from 'react';
import type { SearchResultItem, SearchResults } from '../../types/youtube';
import type { TrackSearchProps } from '../../types/components/tracks';
import { useState, useContext } from 'react';
import { youtube } from '../../api/api';
import { LangContext } from '../../contexts/LangContext';
import { inputTexts, buttonTexts } from '../../translations/components/trackSearch';
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackSearch.module.scss';
import { InputField } from '../inputs/InputField/InputField';
import { IconButton } from '../buttons/IconButton/IconButton';
import { TrackSearchCard } from '../cards/TrackSearchCard/TrackSearchCard';
import { Loader } from '../../layouts/Loader/Loader';
import SearchIcon from '../../icons/SearchIcon';

export const TrackSearch: FC<TrackSearchProps> = ({
  tracks,
  setTracks,
  apiKey
}) => {

  const { lang } = useContext(LangContext);
  const inputLabel = inputTexts.label[lang as keyof typeof inputTexts.label];
  const inputTitle = inputTexts.title[lang as keyof typeof inputTexts.title];
  const buttonTitle = buttonTexts[lang as keyof typeof buttonTexts];

  // Search states in this component to prevent to many fetchs with toggle state
  const [search, setSearch] = useState<string>('');
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const [tracksResults, setTracksResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async() => {
    if(search && search !== previousSearch) {
      setLoading(true);
      // Save search to avoid fechting same data
      setPreviousSearch(search);

      // Fetch data from youtube API
      const dataSearched = await fetch(`${youtube}${search}&key=${apiKey}&maxResults=50`);
      const fetchedResults: SearchResults = await dataSearched.json();

      const results = [...fetchedResults.items];
      const validTracks = [] as SearchResultItem[];
      const tracksIDs = [] as string[];

      tracks.map(track => tracksIDs.push(track.youtube_id));

      // If track is already in tracksList, filter it
      results.map(result => {
        if(!tracksIDs.includes(result.id.videoId)) validTracks.push(result);
      });

      setTracksResults(validTracks);
      setLoading(false);
    };
  };

  if(loading) return <Loader />

  return (
    <>
      <div className={styles.fetch}
        onKeyDown={(event) => {
          if(event.code === 'Enter' || event.code === 'NumpadEnter') fetchData();
        }}
      >
        <InputField
          value={search}
          setValue={setSearch}
          id="search-track-input"
          type="search"
          title={inputTitle}
          label={inputLabel}
        />

        {search &&
          <IconButton
            handleFunction={fetchData}
            title={buttonTitle}
            disabled={loading}
          >
            <SearchIcon />
          </IconButton>
        }
      </div>

      <ul className={styles.list}>
        {tracksResults?.map((track: SearchResultItem, index: number) =>
          <li key={uuidv4()}>
            <TrackSearchCard
              currentTrack={track}
              index={index}
              tracks={tracks}
              setTracks={setTracks}
              tracksResults={tracksResults}
              setTracksResults={setTracksResults}
            />
          </li>
        )}
      </ul>
    </>
  );
};