import type { FunctionComponent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import CloseButton from '../../components/CloseButton/CloseButton';
import styles from './Modal.module.scss';

type Props = PropsWithChildren<{
  setToggleModal: Dispatch<SetStateAction<boolean>>
}>;

const Modal: FunctionComponent<Props> = ({
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