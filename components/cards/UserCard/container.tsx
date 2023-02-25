import type { FC } from 'react';
import type { UserCardProps } from '../../../types/components/moderation';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { usersTexts } from '../../../translations/components/moderation';
import { messages } from '../../../translations/others/error';
import { api } from '../../../api/api';
import { UserCardView } from './view';
import { Loader } from '../../../layouts/Loader/Loader';

export const UserCard: FC<UserCardProps> = ({
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
  const bannedText = usersTexts.banned[lang as keyof typeof usersTexts.banned];
  const promotedText = usersTexts.promoted[lang as keyof typeof usersTexts.promoted];
  const downgradedText = usersTexts.downgraded[lang as keyof typeof usersTexts.downgraded];

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
    setValidMessage(bannedText);
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

  const manageUser = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      moderator: !user.moderator
    };

    await fetch(`${api}/user/manage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        // If response is ok, set message
        user.moderator ? setValidMessage(downgradedText) : setValidMessage(promotedText);

        // & update state
        const previousUsers = [...users];
        previousUsers[index].moderator = !user.moderator;
        setUsers(previousUsers);

      } else {
        setWarningMessage(authError);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <UserCardView
      currentUser={user}
      banUser={banUser}
      manageUser={manageUser}
    />
  );
};