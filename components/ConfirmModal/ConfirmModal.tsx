import type { FC } from 'react';
import type { ConfirmModalProps } from '../../types/components/others';
import { useContext } from 'react';
import { confirmModalTexts } from '../../translations/components/confirmModal';
import { LangContext } from '../../contexts/LangContext';
import styles from './ConfirmModal.module.scss';
import { Modal } from '../../layouts/Modal/Modal';
import { Button } from '../buttons/Button/Button';

export const ConfirmModal: FC<ConfirmModalProps> = ({
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
          <Button
            styles={`${styles.button} ${styles.confirm}`}
            title={confirmText}
            onClick={() => {
              handleFunction();
              setToggleModal(false);
            }}
          >
            {confirmText}
          </Button>

          <Button
            styles={`${styles.button} ${styles.cancel}`}
            title={cancelText}
            onClick={() => setToggleModal(false)}
          >
            {cancelText}
          </Button>
        </div>
      </section>
    </Modal>
  );
};