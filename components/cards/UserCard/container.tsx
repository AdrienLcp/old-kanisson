import type { FC } from 'react';
import type { UserCardProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import UserCardView from './view';
import Loader from '../../../layouts/Loader/Loader';

const UserCard: FC<UserCardProps> = ({
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
    // Update users state
    const previousUsers = [...users];
    previousUsers.splice(index, 1);
    setUsers(previousUsers);

    // Update banned users state
    user.banned = true;
    const previousBannnedUsers = [...bannedUsers];
    const newBannedUsers = [user, ...previousBannnedUsers];
    setBannedUsers(newBannedUsers);

    // Set message
    setValidMessage('');
    //! valid message
  };

  const banUser = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      banned: true
    };

    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
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

  if(loading) return <Loader />

  return (
    <UserCardView
      user={user}
      banUser={banUser}
    />
  );
};

export default UserCard;