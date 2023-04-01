import type { FC } from 'react';
import type { ModalProps } from '../../types/layouts';
import { useRef, useEffect } from 'react';
import { CloseButton } from '../../components/buttons/CloseButton/CloseButton';
import styles from './Modal.module.scss';


export const Modal: FC<ModalProps> = ({
  setToggleModal,
  children
}) => {

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => modalRef.current?.focus());

  return (
    <div
      className={styles.wrapper}
    >
      <div
        className={styles.behind}
        onClick={() => setToggleModal(false)}
      />

      <section
        className={styles.container}
        ref={modalRef}
      >

        {children}

        <CloseButton handleFunction={() => setToggleModal(false)} />

      </section>
    </div>
  );
};