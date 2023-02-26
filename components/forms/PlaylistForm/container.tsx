import type { FC, FormEvent } from 'react';
import type { PlaylistFormProps } from '../../../types/components/forms';
import type { Playlist, Track } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { api } from '../../../api/api';
import { messages } from '../../../translations/others/error';
import { errorTexts, validTexts } from '../../../translations/components/playlistForm';
import { PlaylistFormView } from './view';
import { Loader } from '../../Loader/Loader';

export const PlaylistForm: FC<PlaylistFormProps> = ({
  playlist,
  tracksData,
  apiKey
}) => {

  const { user } = useContext(UserContext);

  const router = useRouter();

  // Translated texts
  const { lang } = useContext(LangContext);
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];
  const alreadyTaken = errorTexts.titleTaken[lang as keyof typeof errorTexts.titleTaken];
  const titleError = errorTexts.titleError[lang as keyof typeof errorTexts.titleError];
  const descriptionLength = errorTexts.descriptionLength[lang as keyof typeof errorTexts.descriptionLength];
  const noTrack = errorTexts.noTrack[lang as keyof typeof errorTexts.noTrack];
  const upToDate = validTexts.alreadyUpToDate[lang as keyof typeof validTexts.alreadyUpToDate];
  const updated = validTexts.updated[lang as keyof typeof validTexts.updated];

  const [title, setTitle] = useState<string>(playlist ? playlist.title : '');
  const [description, setDescription] = useState<string>(playlist ? playlist.description : '');
  const [tracks, setTracks] = useState<Track[]>(tracksData ? tracksData : [] as Track[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const checkForm = () => {
    // Reset messages
    setValidMessage('');
    setWarningMessage('');

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
    } else if(description.length > 100) {
      setWarningMessage(descriptionLength);
      return false;
    } else if(tracks.length <= 0) {
      setWarningMessage(noTrack);
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

      const validTracks = tracks.filter(track => track.valid);

      const body: Playlist = {
        id: playlist ? playlist.id : uuidv4(),
        title: title.trim(),
        description: description.trim(),
        user_id: user.id,
        creator: user.pseudo,
        img: '',
        date: playlist ? playlist.date : new Date().toLocaleDateString(),
        average: playlist ? playlist.average : 0,
        ratings: playlist ? playlist.ratings : [],
        ratings_ids: playlist ? playlist.ratings_ids : [],
        nbOfPlayed: playlist ? playlist.nbOfPlayed : 0,
        nbOfTracks: validTracks.length,
        playable: validTracks.length < 10 ? false : true,
        visible: playlist ? playlist.visible : true
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

          if(router.pathname === '/create') router.push(`/update/${data.title}`);
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
    // Get token
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
      if(res.status !== 200) {
        const data = await res.json();
        console.log(data);
        setWarningMessage(errorMessage);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

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