import type { FC } from 'react';
import type { ModerationPlaylistCardProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistsTexts } from '../../../translations/components/moderation';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import { HiddenPlaylistCardView } from './view';
import { Loader } from '../../Loader/Loader';

export const HiddenPlaylistCard: FC<ModerationPlaylistCardProps> = ({
  playlist,
  visiblePlaylists,
  setVisiblePlaylists,
  hiddenPlaylists,
  setHiddenPlaylists,
  setValidMessage,
  setWarningMessage
}) => {

  const { lang } = useContext(LangContext);
  const globalError = messages.globalError[lang as keyof typeof messages.globalError];
  const authError = messages.authorization[lang as keyof typeof messages.authorization];
  const restored = playlistsTexts.deleted[lang as keyof typeof playlistsTexts.restored];
  const permanentlyDeleted = playlistsTexts.permanentlyDeleted[lang as keyof typeof playlistsTexts.permanentlyDeleted];

  const [loading, setLoading] = useState<boolean>(false);

  const updateRestoredState = () => {
    // Remove playlist from visible playlists
    const previousDeletedPlaylists = [...hiddenPlaylists];
    const index = previousDeletedPlaylists.indexOf(playlist);
    previousDeletedPlaylists.splice(index, 1);
    setHiddenPlaylists(previousDeletedPlaylists);

    // Toggle visible state
    playlist.visible = true;

    // And add it to deleted playlists
    const previousVisiblePlaylists = [playlist, ...visiblePlaylists];
    setVisiblePlaylists(previousVisiblePlaylists);

    // "Playlist has been correctly restored"
    setValidMessage(restored);
  };

  const restorePlaylist = async() => {
    // Show loader & get token from local storage for authorization
    setLoading(true);
    const token = localStorage.getItem('token');

    // Set the body with toggled visible state
    const body = {
      playlist_id: playlist.id,
      visible: true
    };

    // Delete or restore current playlist
    await fetch(`${api}/playlist/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        updateRestoredState();
      } else {
        // Unauthorized
        setWarningMessage(authError);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(globalError);
    });

    // Hide loader
    setLoading(false);
  };

  const deletePlaylist = async() => {
    // Show loader & get token from local storage for authorization
    setLoading(true);
    const token = localStorage.getItem('token');

    // Delete or restore current playlist
    await fetch(`${api}/playlist/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ playlist_id: playlist.id })
    })
    .then((res) => {
      if(res.status === 200) {
        setValidMessage(permanentlyDeleted);
        const previousHiddenPlaylists = [...hiddenPlaylists];
        const index = previousHiddenPlaylists.indexOf(playlist);
        previousHiddenPlaylists.splice(index, 1);
        setHiddenPlaylists(previousHiddenPlaylists);
      } else {
        // Unauthorized
        setWarningMessage(authError);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(globalError);
    });

    // Hide loader
    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <HiddenPlaylistCardView
      playlist={playlist}
      restorePlaylist={restorePlaylist}
      deletePlaylist={deletePlaylist}
    />
  );
};