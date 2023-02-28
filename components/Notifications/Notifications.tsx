import type { FC } from 'react';
import type { Notification } from '@prisma/client';
import { useState, useEffect, useContext, useMemo } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { toggleButton } from '../../translations/components/notifications';
import { api } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import styles from './Notifications.module.scss';
import { Loader } from '../Loader/Loader';
import { IconButton } from '../buttons/IconButton/IconButton';
import { NotificationModal } from '../NotificationModal/NotificationModal';
import { NotificationCard } from '../cards/NotificationCard/NotificationCard';
import NotificationIcon from '../../icons/NotificationIcon';

export const Notifications: FC = () => {

  const { user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const newNotificationText = toggleButton.new[lang as keyof typeof toggleButton.new];
  const noNotificationText = toggleButton.none[lang as keyof typeof toggleButton.none];
  const noNewNotificationText = toggleButton.noNew[lang as keyof typeof toggleButton.noNew];

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Notification>(notifications[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [toggleNotifications, setToggleNotifications] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const newNotifications = useMemo(() =>  notifications.filter(notification => !notification.seen), [notifications]);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

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
    .catch((error) => console.log(error));

    setLoading(false);
  };

  if(loading) return <Loader />

  return (
    <>
      <section className={styles.container}>
        <IconButton
          handleFunction={() => setToggleNotifications(prev => !prev)}
          disabled={notifications.length > 0 ? false : true}
          label={notifications.length > 0 ? '' : noNotificationText}
          title={newNotifications.length > 0 ?
            `${newNotifications.length} ${newNotificationText}`
          :
            noNewNotificationText
          }
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
          {notifications.map((notification: Notification, index: number) =>
            <li key={uuidv4()} onClick={() => {
              setToggleModal(true);
              setCurrentNotification(notification);
              setCurrentIndex(index);
            }}>
              <NotificationCard
                notification={notification}
                index={index}
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </li>
          )}
        </ul>
      </section>

      {toggleModal &&
        <NotificationModal
          notification={currentNotification}
          index={currentIndex}
          notifications={notifications}
          setNotifications={setNotifications}
          setToggleModal={setToggleModal}
        />
      }
    </>
  );
};