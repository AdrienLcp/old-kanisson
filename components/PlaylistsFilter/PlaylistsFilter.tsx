import type { FC } from 'react';
import type { PlaylistsFilterProps } from '../../types/components/others';
import type { Playlist } from '@prisma/client';
import { useMemo, useContext, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { filterTexts } from '../../translations/pages/search';
import { v4 as uuidv4 } from 'uuid';
import styles from './PlaylistsFilter.module.scss';
import { InputField } from '../inputs/InputField/InputField';
import PlaylistCard from '../cards/PlaylistCard/PlaylistCard';

export const PlaylistFilter: FC<PlaylistsFilterProps> = ({
  playlists
}) => {

  const { lang } = useContext(LangContext);
  const filterLabel = filterTexts.label[lang as keyof typeof filterTexts.label];
  const filterTitle = filterTexts.title[lang as keyof typeof filterTexts.title];

  const [filter, setFilter] = useState<string>('');

  const filteredPlaylists = useMemo(() => {
    if(filter) {
      return playlists.filter((playlist: Playlist) => {
        // Filter playlists with title or creator username
        return playlist.title.toLowerCase().includes(filter.toLowerCase())
        || playlist.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return playlists;
  }, [filter, playlists]);

  return (
    <>
      <div className={styles.input}>
        <InputField
          value={filter}
          setValue={setFilter}
          type="search"
          id="playlists-filter-input"
          label={filterLabel}
          title={filterTitle}
        />
      </div>

      <ul className={styles.list}>
        {filteredPlaylists?.map((playlist: Playlist) =>
          <li key={uuidv4()}>
            <PlaylistCard
              playlist={playlist}
            />
          </li>
        )}
      </ul>
    </>
  );
};