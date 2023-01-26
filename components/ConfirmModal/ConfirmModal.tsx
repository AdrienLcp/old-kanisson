import type { FC } from 'react';
import type { ConfirmModalProps } from '../../types/components/others';
import { useContext } from 'react';
import { confirmModalTexts } from '../../translations/components/confirmModal';
import { LangContext } from '../../contexts/LangContext';
import styles from './ConfirmModal.module.scss';
import Modal from '../../layouts/Modal/Modal';
import CloseButton from '../buttons/CloseButton/CloseButton';

const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  content,
  handleFunction,
  setToggleModal
}) => {

  const { lang } = useContext(LangContext);

  const confirmText = confirmModalTexts.confirm[lang as keyof typeof confirmModalTexts.confirm];
  const cancelText = confirmModalTexts.cancel[lang as keyof typeof confirmModalTexts.cancel];

  return (
    <Modal setToggleModal={setToggleModal}>
      <section className={styles.container}>
        <p className={styles.title}>
          {title}
        </p>

        {content &&
          <p className={styles.content}>
            {content}
          </p>
        }

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.confirm}`}
            type='button'
            title={confirmText}
            aria-label={confirmText}
            onClick={() => {
              handleFunction();
              setToggleModal(false);
            }}
          >
            {confirmText}
          </button>

          <button
            className={`${styles.button} ${styles.cancel}`}
            type='button'
            title={cancelText}
            aria-label={cancelText}
            onClick={() => setToggleModal(false)}
          >
            {cancelText}
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default ConfirmModal;