import type { FC } from 'react';
import type { Playlist } from '@prisma/client';
import { useContext, useEffect, useState, useMemo } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { buttonTexts, filterTexts, titleTexts } from '../../translations/components/myPlaylists';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../api/api';
import styles from './MyPlaylists.module.scss';
import MyPlaylistsCard from '../cards/MyPlaylistCard/container';
import Message from '../Message/Message';
import InputField from '../inputs/InputField/InputField';
import Link from 'next/link';

const MyPlaylists: FC = () => {

  const { user, logged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const titleText = titleTexts.playlists[lang as keyof typeof titleTexts.playlists];
  const noPlaylistText = titleTexts.noPlaylist[lang as keyof typeof titleTexts.noPlaylist];
  const buttonLabel = buttonTexts.label[lang as keyof typeof buttonTexts.label];
  const buttonTitle = buttonTexts.title[lang as keyof typeof buttonTexts.title];
  const filterLabel = filterTexts.label[lang as keyof typeof filterTexts.label];
  const filterTitle = filterTexts.title[lang as keyof typeof filterTexts.title];

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  useEffect(() => {
    if(logged) getUserPlaylists();
  }, [logged]);

  const getUserPlaylists = async() => {
    await fetch(`${api}/playlist/getUserPlaylists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo: user.pseudo })
    })
    .then(async(res) => {
      const data = await res.json();
      setPlaylists(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const filteredPlaylists = useMemo(() => {
    if(filter) {
      return playlists.filter((playlist: Playlist) => {
        // Filter playlists with title or description
        return playlist.title.toLowerCase().includes(filter.toLowerCase())
        || playlist.description.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return playlists;
  }, [filter, playlists]);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
          {playlists.length > 0 ?
            <h2 className={styles.title}>
              {titleText}
            </h2>
          :
            <>
              <h2 className={styles.title}>
                {noPlaylistText}
              </h2>

              <Link
                className={styles.button}
                title={buttonTitle}
                href='/create'
              >
                {buttonLabel}
              </Link>
            </>
          }
      </header>

      <Message
        validMessage={validMessage}
        setValidMessage={setValidMessage}
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
      />

      {playlists.length > 0 &&
        <>
          {playlists.length > 10 &&
            <InputField
              value={filter}
              setValue={setFilter}
              type="search"
              id="my-playlists-filter-input"
              label={filterLabel}
              title={filterTitle}
            />
          }

          <ul className={styles.list}>
            {filteredPlaylists.map((playlist: Playlist, index: number) =>
              <li key={uuidv4()}>
                <MyPlaylistsCard
                  playlist={playlist}
                  index={index}
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  setWarningMessage={setWarningMessage}
                  setValidMessage={setValidMessage}
                />
              </li>
            )}
          </ul>
        </>
      }
    </section>
  );
};

export default MyPlaylists;