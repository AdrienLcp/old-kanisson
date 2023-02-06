import type { FC } from 'react';
import type { UserCardProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import BannedUserCardView from './view';
import Loader from '../../../layouts/Loader/Loader';

const BannedUserCard: FC<UserCardProps> = ({
  user,
  index,
  users,
  setUsers,
  bannedUsers,
  setBannedUsers,
  setValidMessage,
  setWarningMessage
}) => {

  const { lang } = useContext(LangContext);
  const globalError = messages.globalError[lang as keyof typeof messages.globalError];
  const authError = messages.authorization[lang as keyof typeof messages.authorization];

  const [loading, setLoading] = useState<boolean>(false);

  const updateState = () => {
    // Update banned users state
    const previousBannedUsers = [...bannedUsers];
    previousBannedUsers.splice(index, 1);
    setBannedUsers(previousBannedUsers);

    // Update users state
    user.banned = false;
    const previousUsers = [...users];
    const newUsers = [user, ...previousUsers];
    setUsers(newUsers);

    // Set message
    setValidMessage('');
    //! valid message
  };

  const unbanUser = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      banned: false
    };

    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 200) {
        updateState();
      } else {
        setWarningMessage(authError);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(globalError);
    });

    setLoading(false);
  };

  const deleteUser = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: user.id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        // Update state
        const previousBannedUsers = [...bannedUsers];
        previousBannedUsers.splice(index, 1);
        setBannedUsers(previousBannedUsers);
      } else {
        setWarningMessage(authError);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage(globalError);
    });

    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <BannedUserCardView
      user={user}
      unbanUser={unbanUser}
      deleteUser={deleteUser}
    />
  );
};

export default BannedUserCard;