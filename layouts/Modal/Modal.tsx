import type { FC } from 'react';
import type { ModalProps } from '../../types/layouts';
import CloseButton from '../../components/buttons/CloseButton/CloseButton';
import styles from './Modal.module.scss';


const Modal: FC<ModalProps> = ({
  setToggleModal,
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.behind}
        onClick={() => setToggleModal(false)}
      />

      <section className={styles.container}>

        <CloseButton handleFunction={() => setToggleModal(false)} />

        {children}

      </section>
    </div>
  );
};

export default Modal;