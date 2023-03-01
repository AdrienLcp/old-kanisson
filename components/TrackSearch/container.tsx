import type { FC } from 'react';
import type { SearchResultItem } from '../../types/youtube';
import type { TrackSearchProps } from '../../types/components/tracks';
import { useState, useContext } from 'react';
import { youtube } from '../../api/api';
import { LangContext } from '../../contexts/LangContext';
import { messages } from '../../translations/others/error';
import { TrackSearchView } from './view';

const max = 20;

export const TrackSearch: FC<TrackSearchProps> = ({
  tracks,
  setTracks,
  apiKey
}) => {

  const { lang } = useContext(LangContext);
  const youtubeQuotaText = messages.youtubeQuota[lang as keyof typeof messages.youtubeQuota];

  // Search states in this component to prevent to many fetchs with toggle state
  const [search, setSearch] = useState<string>('');
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const [tracksResults, setTracksResults] = useState<SearchResultItem[]>([]);
  const [pageToken, setPageToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const fetchData = async() => {
    if(search && search !== previousSearch) {
      // Save search to avoid fechting same data
      setPreviousSearch(search);

      getDataFromYoutube(`${youtube}${search}&key=${apiKey}&maxResults=${max}`);
    };
  };

  const fetchMoreData = () => getDataFromYoutube(`${youtube}${previousSearch}&key=${apiKey}&maxResults=${max}&pageToken=${pageToken}`);

  const getDataFromYoutube = async(url: string) => {
    setLoading(true);

    const dataSearched = await fetch(url);
    const fetchedResults = await dataSearched.json();

    if(fetchedResults.error) return setWarningMessage(youtubeQuotaText);

    // Save nextPageToken if user want to fetch more data
    setPageToken(fetchedResults.nextPageToken);

    const results = [...fetchedResults.items];

    const validTracks = [] as SearchResultItem[];
    const tracksIDs = [] as string[];

    tracks.map(track => tracksIDs.push(track.youtube_id));

    // If track is already in tracksList, filter it
    results.map(result => {
      if(!tracksIDs.includes(result.id.videoId)) validTracks.push(result);
    });

    const newTracksResults = [...tracksResults, ...validTracks];
    setTracksResults(newTracksResults);

    setLoading(false);
  };

  return (
    <TrackSearchView
      search={search}
      setSearch={setSearch}
      tracksResults={tracksResults}
      setTracksResults={setTracksResults}
      tracks={tracks}
      setTracks={setTracks}
      fetchData={fetchData}
      fetchMoreData={fetchMoreData}
      loading={loading}
      warningMessage={warningMessage}
    />
  );
};