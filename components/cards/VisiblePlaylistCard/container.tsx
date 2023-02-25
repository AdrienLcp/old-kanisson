import type { FC } from 'react';
import type { ModerationPlaylistCardProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { playlistsTexts } from '../../../translations/components/moderation';
import { moderationMessage } from '../../../translations/others/notification';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import { VisiblePlaylistCardView } from './view';
import { Loader } from '../../../layouts/Loader/Loader';

export const VisiblePlaylistCard: FC<ModerationPlaylistCardProps> = ({
  playlist,
  index,
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
  const deletedText = playlistsTexts.deleted[lang as keyof typeof playlistsTexts.deleted];
  const notificationTitle = moderationMessage[lang as keyof typeof moderationMessage];

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const updateState = () => {
    // Remove playlist from visible playlists
    const previousVisiblePlaylists = [...visiblePlaylists];
    previousVisiblePlaylists.splice(index, 1);
    setVisiblePlaylists(previousVisiblePlaylists);

    // Toggle visible state
    playlist.visible = false;

    // And add it to deleted playlists
    const previousHiddenPlaylists = [playlist, ...hiddenPlaylists];
    setHiddenPlaylists(previousHiddenPlaylists);

    // "Playlist has been correctly removed"
    setValidMessage(deletedText);
  };

  const hidePlaylist = async() => {
    // Show loader & get token from local storage for authorization
    setLoading(true);
    const token = localStorage.getItem('token');

    // Set the body with toggled visible state
    const body = {
      playlist_id: playlist.id,
      visible: false
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
    .then(async(res) => {
      if(res.status === 200) {
        if(message) await sendNotificationToUser();
        updateState();
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

  const sendNotificationToUser = async() => {
    const token = localStorage.getItem('token');

    const body = {
      user_id: playlist.user_id,
      title: notificationTitle,
      message,
      date: new Date().toLocaleDateString(),
      seen: false
    };

    await fetch(`${api}/notification/createOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  if(loading) return <Loader />

  return (
    <VisiblePlaylistCardView
      playlist={playlist}
      hidePlaylist={hidePlaylist}
      message={message}
      setMessage={setMessage}
    />
  );
};