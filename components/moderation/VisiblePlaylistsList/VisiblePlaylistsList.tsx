import type { FC } from 'react';
import type { Playlist } from '@prisma/client';
import type { PlaylistsListProps } from '../../../types/components/moderation';
import { useContext, useState, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistsFilter } from '../../../translations/components/filters';
import { v4 as uuidv4 } from 'uuid';
import styles from './VisiblePlaylistsList.module.scss';
import InputField from '../../inputs/InputField/InputField';
import VisiblePlaylistCard from '../../cards/VisiblePlaylistCard';

const VisiblePlaylistsList: FC<PlaylistsListProps> = ({
  visiblePlaylists,
  setVisiblePlaylists,
  hiddenPlaylists,
  setHiddenPlaylists,
  setWarningMessage,
  setValidMessage
}) => {

  const { lang } = useContext(LangContext);
  const filterLabel = playlistsFilter.list.label[lang as keyof typeof playlistsFilter.list.label];
  const filterTitle = playlistsFilter.list.title[lang as keyof typeof playlistsFilter.list.title];

  const [filter, setFilter] = useState<string>('');

  const filteredPlaylists = useMemo(() => {
    if(filter) {
      return visiblePlaylists.filter((playlist: Playlist) => {
        // Filter playlists with title or creator username
        return playlist.title.toLowerCase().includes(filter.toLowerCase())
        || playlist.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return visiblePlaylists;
  }, [filter, visiblePlaylists]);

  return (
    <section className={styles.container}>
      {visiblePlaylists.length > 10 &&
        <InputField
          value={filter}
          setValue={setFilter}
          id="moderation-visible-playlists-filter"
          type="search"
          label={filterLabel}
          title={filterTitle}
        />
      }

      <ul className={styles.list}>
        {filteredPlaylists.map((playlist: Playlist, index: number) =>
          <li key={uuidv4()}>
            <VisiblePlaylistCard
              playlist={playlist}
              index={index}
              visiblePlaylists={visiblePlaylists}
              setVisiblePlaylists={setVisiblePlaylists}
              hiddenPlaylists={hiddenPlaylists}
              setHiddenPlaylists={setHiddenPlaylists}
              setValidMessage={setValidMessage}
              setWarningMessage={setWarningMessage}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default VisiblePlaylistsList;