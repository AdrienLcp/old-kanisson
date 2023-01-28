import type { FC, FormEvent } from 'react';
import type { PlaylistFormProps } from '../../../types/components/forms';
import type { Track } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { api } from '../../../api/api';
import { messages } from '../../../translations/others/error';
import { errorTexts, validTexts } from '../../../translations/components/playlistForm';
import PlaylistFormView from './view';
import Loader from '../../../layouts/Loader/Loader';

const PlaylistForm: FC<PlaylistFormProps> = ({
  playlist,
  tracksData,
  apiKey
}) => {

  const { lang } = useContext(LangContext);
  const { user, logged } = useContext(UserContext);
  const router = useRouter();

  // Translated texts
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];
  const alreadyTaken = errorTexts.titleTaken[lang as keyof typeof errorTexts.titleTaken];
  const titleError = errorTexts.titleError[lang as keyof typeof errorTexts.titleError];
  const descriptionLength = errorTexts.descriptionLength[lang as keyof typeof errorTexts.descriptionLength];
  const upToDate = validTexts.alreadyUpToDate[lang as keyof typeof validTexts.alreadyUpToDate];
  const updated = validTexts.updated[lang as keyof typeof validTexts.updated];

  const [title, setTitle] = useState<string>(playlist ? playlist.title : '');
  const [description, setDescription] = useState<string>(playlist ? playlist.description : '');
  const [tracks, setTracks] = useState<Track[]>(tracksData ? tracksData : []);

  const [loading, setLoading] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const checkForm = () => {
    const special = new RegExp('(?=.*[!@/#\$%\^&\*])');

    // If nothing changed
    if(playlist && tracksData &&
      playlist.title === title &&
      playlist.description === description &&
      tracksData === tracks) {
      // Set valid message & return false
      setValidMessage(upToDate);
      return false;

    // if title isn't correct
    } else if(title.length < 3
      || title.length > 50
      || special.test(title) ) {
      // set warning message, and return false
      setWarningMessage(titleError);
      return false;
    } else if(description.length > 200) {
      setWarningMessage(descriptionLength);
      return false;
    };
    return true;
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    // Avoid refresh
    event.preventDefault();

    // Reset messages
    setWarningMessage('');
    setValidMessage('');

    if(checkForm()) {
      setLoading(true);

      // Get token from local storage for authorization
      const token = localStorage.getItem('token');

      const body = {
        id: playlist ? playlist.id : uuidv4(),
        title,
        description,
        user_id: user.id,
        creator: user.pseudo
      };

      await fetch(`${api}/playlist/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(body)
      })
      .then(async(res) => {
        const data = await res.json();

        if(res.status === 200) {
          setValidMessage(updated);
          await updateTracks(data.id);
          router.push(`/update/${data.title}`);
        } else {
          console.log(data);
          setWarningMessage(alreadyTaken);
        };
      })
      .catch((error) => {
        console.log(error);
        setWarningMessage(errorMessage);
      });

      setLoading(false);
    };
  };

  const updateTracks = async(playlist_id: string) => {
    const token = localStorage.getItem('token');

    // Update playlist_id for each track (usefull for create a playlist, not for updating)
    const newTracks = [...tracks];
    newTracks?.map(track => track.playlist_id = playlist_id);

    await fetch(`${api}/track/createMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(newTracks)
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  if(loading || !logged) return <Loader />

  return (
    <PlaylistFormView
      handleSubmit={handleSubmit}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      tracks={tracks}
      setTracks={setTracks}
      validMessage={validMessage}
      setValidMessage={setValidMessage}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
      loading={loading}
      apiKey={apiKey}
    />
  );
};

export default PlaylistForm;