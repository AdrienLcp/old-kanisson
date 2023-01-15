import type { FC } from 'react';
import { FormWrapperProps } from '../../types/components/forms';
import styles from './FormWrapper.module.scss';

const FormWrapper: FC<FormWrapperProps> = ({
  handleSubmit,
  submitLabel,
  submitTitle,
  children
}) => {

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {children}

      {submitLabel &&
        <button
          className={styles.button}
          aria-label={submitTitle}
          title={submitTitle}
          type='submit'
        >
          {submitLabel}
        </button>
      }
    </form>
  );
};

export default FormWrapper;