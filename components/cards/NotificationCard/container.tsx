import type { FC } from 'react';
import type { NotificationCardProps } from '../../../types/components/cards';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { api } from '../../../api/api';
import NotificationCardView from './view';

const NotificationCard: FC<NotificationCardProps> = ({
  notification,
}) => {

  const { user } = useContext(UserContext);

  const notificationSeen = async() => {
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      id: notification.id
    };

    await fetch(`${api}/notification/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <NotificationCardView
      notification={notification}
      notificationSeen={notificationSeen}
    />
  );
};

export default NotificationCard;