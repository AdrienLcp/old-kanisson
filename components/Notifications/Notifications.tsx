import type { FC } from 'react';
import type { Notification } from '@prisma/client';
import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { toggleButton } from '../../translations/components/notifications';
import { api } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import styles from './Notifications.module.scss';
import Loader from '../../layouts/Loader/Loader';
import IconButton from '../buttons/IconButton/IconButton';
import NotificationIcon from '../../icons/NotificationIcon';
import NotificationCard from '../cards/NotificationCard';

const Notifications: FC = () => {

  const { user, token } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const newNotificationText = toggleButton.new[lang as keyof typeof toggleButton.new];
  const noNotificationText = toggleButton.none[lang as keyof typeof toggleButton.none];

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toggleNotifications, setToggleNotifications] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  let newNotifications = [];

  notifications.map(notification => {

    if(!notification.seen) newNotifications.push(notification);
  });

  useEffect(() => {
    if(notifications.length === 0) getNotifications();
  }, []);

  const getNotifications = async() => {
    setLoading(true);

    await fetch(`${api}/notification/getAllFromUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id : user.id })
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) setNotifications(data);
    })
    .catch((error) => {
      console.log(error);
    });

    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <section className={styles.container}>

      <IconButton
        handleFunction={() => setToggleNotifications(prev => !prev)}
        disabled={notifications.length > 0 ? false : true}
        label={notifications.length > 0 ? '' : noNotificationText}
        title={newNotifications.length > 0 ?
          `${newNotifications.length} ${newNotificationText}`
        : '' }
      >
        <NotificationIcon />

        {newNotifications.length > 0 &&
          <span className={styles.new}>
            {newNotifications.length}
          </span>
        }
      </IconButton>

      <ul className={toggleNotifications ?
        `${styles.list} ${styles.opened}`
      :
        `${styles.list}`
      }>
        {notifications.map((notification: Notification) =>
          <li key={uuidv4()}>
            <NotificationCard
              notification={notification}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default Notifications;