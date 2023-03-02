import type { FC } from 'react';
import type { NotificationModalProps } from '../../types/components/modals';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LangContext } from '../../contexts/LangContext';
import { modalButtons } from '../../translations/components/notifications';
import { api } from '../../api/api';
import { Modal } from '../../layouts/Modal/Modal';
import { Button } from '../buttons/Button/Button';
import { Loader } from '../Loader/Loader';
import styles from './NotificationModal.module.scss';

export const NotificationModal: FC<NotificationModalProps> = ({
  notification,
  index,
  notifications,
  setNotifications,
  setToggleModal
}) => {

  const { user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const okButton = modalButtons.ok[lang as keyof typeof modalButtons.ok];
  const deleteButton = modalButtons.delete[lang as keyof typeof modalButtons.delete];

  const [loading, setLoading] = useState<boolean>(false);

  const deleteNotification = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      id: notification.id
    };

    await fetch(`${api}/notification/delete`, {
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
        // Delete notification from state & update it
        const previousNotifications = [...notifications];
        previousNotifications.splice(index, 1);
        setNotifications(previousNotifications);
      } else {
        console.log(data);
      };
    })
    .catch((error) => console.log(error));

    setLoading(false);
    setToggleModal(false);
  };

  return (
    <Modal setToggleModal={setToggleModal}>
      <section className={styles.container}>

        <header>
          <h3 className={styles.title}>
            {notification.title}
          </h3>
        </header>

        <div className={styles.content}>
          <pre className={styles.message}>
            {notification.message}
          </pre>
        </div>

        <footer className={styles.buttons}>
          {loading ?
            <Loader />
          :
            <>
              <Button
                onClick={() => setToggleModal(false)}
                title={okButton}
                styles={`${styles.button} ${styles.button_ok}`}
              >
                {okButton}
              </Button>

              <Button
                onClick={deleteNotification}
                title={deleteButton}
                styles={`${styles.button} ${styles.button_delete}`}
              >
                {deleteButton}
              </Button>
            </>
          }
        </footer>
      </section>
    </Modal>
  );
};