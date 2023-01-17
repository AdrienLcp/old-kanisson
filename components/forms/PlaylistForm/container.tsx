import type { FC, FormEvent } from 'react';
import type { PlaylistFormProps } from '../../../types/components/forms';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import { api } from '../../../api/api';
import { messages } from '../../../langs/others/error';
import { errorTexts, validTexts } from '../../../langs/components/playlistForm';
import PlaylistFormView from './view';
import Loader from '../../../layouts/Loader/Loader';

const PlaylistForm: FC<PlaylistFormProps> = ({
  playlist
}) => {

  const { lang } = useContext(LangContext);
  const { user, logged } = useContext(UserContext);
  const router = useRouter();

  // If user is not logged or not the playlist creator, redirect to home page
  if(!logged || playlist && playlist.user_id !== user.id) router.push('/');

  // Translated texts
  const errorMessage = messages.globalError[lang as keyof typeof messages.globalError];
  const alreadyTaken = errorTexts.titleTaken[lang as keyof typeof errorTexts.titleTaken];
  const titleError = errorTexts.titleError[lang as keyof typeof errorTexts.titleError];
  const descriptionLength = errorTexts.descriptionLength[lang as keyof typeof errorTexts.descriptionLength];
  const upToDate = validTexts.alreadyUpToDate[lang as keyof typeof validTexts.alreadyUpToDate];
  const updated = validTexts.updated[lang as keyof typeof validTexts.updated];

  const [title, setTitle] = useState<string>(playlist ? playlist.title : '');
  const [description, setDescription] = useState<string>(playlist ? playlist.description : '');
  const [songs_ids, setSongs_ids] = useState<string[]>(playlist ? playlist.songs_ids : []);

  const [loading, setLoading] = useState<boolean>(false);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const checkForm = () => {
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');

    // If nothing changed
    if(playlist &&
      playlist.title === title &&
      playlist.description === description &&
      playlist.songs_ids === songs_ids) {
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
        songs_ids,
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
          console.log(data);
          setValidMessage(updated);
          if(router.pathname.includes('/create')) router.push(`/update/${title}`);
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

  if(loading) return <Loader />

  return (
    <PlaylistFormView
      handleSubmit={handleSubmit}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      songs_ids={songs_ids}
      setSongs_ids={setSongs_ids}
      validMessage={validMessage}
      setValidMessage={setValidMessage}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
    />
  );
};

export default PlaylistForm;