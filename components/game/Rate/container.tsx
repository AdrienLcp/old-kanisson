import type { FC } from 'react';
import type { RateProps } from '../../../types/components/game';
import { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { LangContext } from '../../../contexts/LangContext';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import { RateView } from './view';
import { Loader } from '../../Loader/Loader';

export const Rate: FC<RateProps> = ({
  playlist,
  setPlaylistAverage,
  setPlaylistRatings,
  setRated
}) => {

  const { user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const errorText = messages.globalError[lang as keyof typeof messages.globalError];

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const ratePlaylist = async(newRate: number) => {
    // Show loader & get token from local storage for authorization
    setLoading(true);
    const token = localStorage.getItem('token');

    // Set up the body with all needed data
    const body = {
      user_id: user.id,
      playlist_id: playlist.id,
      ratings: playlist.ratings,
      ratings_id: playlist.ratings_ids,
      rate: newRate
    };

    // Update playlist rate (calculs on backend)
    await fetch(`${api}/playlist/rate`, {
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
        // Update states with new data
        setPlaylistAverage(data.average);
        setPlaylistRatings(data.ratings);
        setRated(true);
      } else {
        console.log(data);
        setWarningMessage(errorText);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(errorText);
    });

    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <RateView
      ratePlaylist={ratePlaylist}
      warningMessage={warningMessage}
      setWarningMessage={setWarningMessage}
    />
  );
};