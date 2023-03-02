import type { FC, KeyboardEvent } from 'react';
import type { TrackSearchViewProps } from '../../types/components/tracks';
import type { SearchResultItem } from '../../types/youtube';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { buttonTexts, inputTexts, refetchTexts } from '../../translations/components/trackSearch';
import { IconButton } from '../buttons/IconButton/IconButton';
import { TrackSearchCard } from '../cards/TrackSearchCard/TrackSearchCard';
import { InputField } from '../inputs/InputField/InputField';
import { Loader } from '../Loader/Loader';
import { Message } from '../Message/Message';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../buttons/Button/Button';
import SearchIcon from '../../icons/SearchIcon';
import styles from './TrackSearch.module.scss';

export const TrackSearchView: FC<TrackSearchViewProps> = ({
  search,
  setSearch,
  tracksResults,
  setTracksResults,
  tracks,
  setTracks,
  fetchData,
  fetchMoreData,
  loading,
  warningMessage
}) => {

  const { lang } = useContext(LangContext);
  const inputLabel = inputTexts.label[lang as keyof typeof inputTexts.label];
  const inputTitle = inputTexts.title[lang as keyof typeof inputTexts.title];
  const buttonTitle = buttonTexts[lang as keyof typeof buttonTexts];
  const refetchLabel = refetchTexts.label[lang as keyof typeof refetchTexts.label];
  const refetchTitle = refetchTexts.title[lang as keyof typeof refetchTexts.title];

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!loading && event.code === 'Enter' || !loading && event.code === 'NumpadEnter') fetchData();
  };

  return (
    <>
      {warningMessage ?
        <Message warningMessage={warningMessage} />
      :
        <div className={styles.fetch}>
          <InputField
            onKeyDown={handleKeyDown}
            value={search}
            setValue={setSearch}
            id='search-track-input'
            type='search'
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
      }

      {tracksResults.length > 0 ?
        <div className={styles.container}>
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

          {loading ?
            <Loader />
          :
            <Button
              onClick={fetchMoreData}
              title={refetchTitle}
              styles={styles.button}
            >
              {refetchLabel}
            </Button>
          }
        </div>
      :
        loading && <Loader />
      }
    </>
  );
};