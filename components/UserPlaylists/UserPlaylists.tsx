import type { FC } from 'react';
import type { Playlist } from '@prisma/client';
import type { UserPlaylistsProps } from '../../types/components/others';
import { useContext, useMemo, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { playlistsFilter } from '../../translations/components/filters';
import { v4 as uuidv4 } from 'uuid';
import styles from './UserPlaylists.module.scss';
import Link from 'next/link';
import UserPlaylistCard from '../cards/UserPlaylistCard/UserPlaylistCard';
import InputField from '../inputs/InputField/InputField';

const UserPlaylists: FC<UserPlaylistsProps> = ({
  userPlaylists
}) => {

  const { lang } = useContext(LangContext);
  const filterLabel = playlistsFilter.list.label[lang as keyof typeof playlistsFilter.list.label];

  const [filter, setFilter] = useState<string>('');

  const filteredPlaylists = useMemo(() => {
    if(filter) {
      return userPlaylists.filter((playlist: Playlist) => {
        // Filter playlists with title
        return playlist.title.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return userPlaylists;
  }, [filter, userPlaylists]);

  return (
    <section className={styles.container}>

      {userPlaylists.length > 10 &&
        <InputField
          value={filter}
          setValue={setFilter}
          id='user-playlist-filter-input'
          label={filterLabel}
        />
      }

      <ul className={styles.list}>
        {filteredPlaylists.map((playlist: Playlist) =>
          <li key={uuidv4()}>
            <Link href={`/play/${playlist.title}`}>
              <UserPlaylistCard playlist={playlist} />
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
};

export default UserPlaylists;