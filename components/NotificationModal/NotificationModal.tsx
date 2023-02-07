import type { FC } from 'react';
import type { NotificationModalProps } from '../../types/components/modals';
import Modal from '../../layouts/Modal/Modal';
import styles from './NotificationModal.module.scss';

const NotificationModal: FC<NotificationModalProps> = ({
  notification,
  setToggleModal
}) => {

  return (
    <Modal setToggleModal={setToggleModal}>
      <section className={styles.container}>

        <header>
          <h3 className={styles.title}>
            {notification.title}
          </h3>
        </header>

        <div className={styles.content}>
          <p className={styles.message}>
            {notification.message}
          </p>

          <span className={styles.date}>
            {notification.date}
          </span>
        </div>
      </section>
    </Modal>
  );
};

export default NotificationModal;