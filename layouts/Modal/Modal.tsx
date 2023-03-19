import type { FC } from 'react';
import type { ModalProps } from '../../types/layouts';
import { CloseButton } from '../../components/buttons/CloseButton/CloseButton';
import styles from './Modal.module.scss';


export const Modal: FC<ModalProps> = ({
  setToggleModal,
  children
}) => {

  return (
    <div
      className={styles.wrapper}
      onKeyDown={(event) => {
        if(event.key === "Escape") setToggleModal(false);
      }}
    >
      <div
        className={styles.behind}
        onClick={() => setToggleModal(false)}
      />

      <section className={styles.container}>

        {children}

        <CloseButton handleFunction={() => setToggleModal(false)} />

      </section>
    </div>
  );
};