import type { FC } from 'react';
import type { SearchResultItem, SearchResults } from '../../types/youtube';
import type { TrackSearchProps } from '../../types/components/tracks';
import { useState, useContext } from 'react';
import { youtube } from '../../api/api';
import { LangContext } from '../../contexts/LangContext';
import { inputTexts, buttonTexts } from '../../translations/components/trackSearch';
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackSearch.module.scss';
import InputField from '../inputs/InputField/InputField';
import IconButton from '../buttons/IconButton/IconButton';
import TrackSearchCard from '../cards/TrackSearchCard/TrackSearchCard';
import SearchIcon from '../../icons/SearchIcon';
import Loader from '../../layouts/Loader/Loader';

const TrackSearch: FC<TrackSearchProps> = ({
  tracks,
  setTracks,
  search,
  setSearch,
  previousSearch,
  setPreviousSearch,
  tracksResults,
  setTracksResults,
  apiKey
}) => {

  const { lang } = useContext(LangContext);

  const inputLabel = inputTexts.label[lang as keyof typeof inputTexts.label];
  const inputTitle = inputTexts.title[lang as keyof typeof inputTexts.title];
  const buttonTitle = buttonTexts[lang as keyof typeof buttonTexts];

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async() => {
    if(search && search !== previousSearch) {
      // Save search to avoid fechting same data
      setPreviousSearch(search);
      setLoading(true);

      // Fetch data from youtube API
      const dataSearched = await fetch(`${youtube}${search}&key=${apiKey}&maxResults=50`);
      const results: SearchResults = await dataSearched.json();

      // If track result from youtube API is already on the blind test track list, we filter it
      const filteredTracks = results.items.filter(result => {
        return tracks.map(track => {
          if(track.youtube_id !== result.id.videoId) return result;
        });
      });

      setTracksResults(filteredTracks);
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

export default TrackSearch;