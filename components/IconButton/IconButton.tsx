import type { FunctionComponent, PropsWithChildren } from 'react';
import styles from './IconButton.module.scss';

type Props = PropsWithChildren<{
  title?: string,
  name?: string,
  handleFunction: () => void
}>;

const IconButton: FunctionComponent<Props> = ({
  title,
  name,
  handleFunction,
  children
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title ? title : ''}
      aria-label={title ? title : name}
      onClick={handleFunction}
    >
      {children}

      {name &&
        <label className={styles.button_label}>
          {name}
        </label>
      }
    </button>
  );
};

export default IconButton;