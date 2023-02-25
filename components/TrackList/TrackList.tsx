import type { FC } from 'react';
import type { Track } from '@prisma/client';
import type { TrackListProps } from '../../types/components/tracks';
import { useState, useContext, useMemo } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { trackFilter } from '../../translations/components/filters';
import { warningTexts } from '../../translations/components/trackForm';
import { v4 as uuidv4 } from 'uuid';
import styles from './TrackList.module.scss';
import { InputField } from '../inputs/InputField/InputField';
import { TrackListCard } from '../cards/TrackListCard/TrackListCard';

export const TrackList: FC<TrackListProps> = ({
  tracks,
  setTracks
}) => {

  const { lang } = useContext(LangContext);

  const filterLabel = trackFilter.list.label[lang as keyof typeof trackFilter.list.label];
  const filterTitle = trackFilter.list.title[lang as keyof typeof trackFilter.list.title];
  const warning = warningTexts[lang as keyof typeof warningTexts];

  const [filter, setFilter] = useState<string>('');

  const filteredTracks = useMemo(() => {
    if(filter) {
      return tracks.filter((track: Track) => {
        // Filter track user with title, name of the artist, or the youtube video title
        return track.title.toLowerCase().includes(filter.toLocaleLowerCase())
        || track.artist.toLowerCase().includes(filter.toLocaleLowerCase())
        || track.youtube_title.toLocaleLowerCase().includes(filter.toLowerCase());
      });
    };
    return tracks;
  }, [filter, tracks]);

  return (
    <>
      {tracks.length < 10 ?
        <span className={styles.warning}>
          {warning} ({tracks.length}/10)
        </span>
      :
        <div className={styles.filter}>
          <InputField
            value={filter}
            setValue={setFilter}
            id='filter-track-list-input'
            type='search'
            title={filterTitle}
            label={filterLabel}
          />
        </div>
      }

      <ul className={styles.list}>
        {filteredTracks.map((track: Track, index: number) =>
          <li key={uuidv4()}>
            <TrackListCard
              track={track}
              index={index}
              tracks={tracks}
              setTracks={setTracks}
            />
          </li>
        )}
      </ul>
    </>
  );
};