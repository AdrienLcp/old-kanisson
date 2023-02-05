import type { FC } from 'react';
import type { Playlist } from '@prisma/client';
import type { PlaylistsListProps } from '../../../types/components/moderation';
import { useContext, useState, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistsFilter } from '../../../translations/components/filters';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../inputs/InputField/InputField';
import styles from './HiddenPlaylistsList.module.scss';
import HiddenPlaylistCard from '../../cards/HiddenPlaylistCard/container';

const HiddenPlaylistsList: FC<PlaylistsListProps> = ({
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
      return hiddenPlaylists.filter((playlist: Playlist) => {
        // Filter playlists with title or creator username
        return playlist.title.toLowerCase().includes(filter.toLowerCase())
        || playlist.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return hiddenPlaylists;
  }, [filter, hiddenPlaylists]);

  return (
    <section className={styles.container}>
      {hiddenPlaylists.length > 10 &&
        <InputField
          value={filter}
          setValue={setFilter}
          id="moderation-hidden-playlists-filter"
          type="search"
          label={filterLabel}
          title={filterTitle}
        />
      }

      <ul className={styles.list}>
        {filteredPlaylists.map((playlist: Playlist, index: number) =>
          <li key={uuidv4()}>
            <HiddenPlaylistCard
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

export default HiddenPlaylistsList;