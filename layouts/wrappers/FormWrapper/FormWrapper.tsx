import type { FC } from 'react';
import { FormWrapperProps } from '../../../types/layouts';
import styles from './FormWrapper.module.scss';

const FormWrapper: FC<FormWrapperProps> = ({
  handleSubmit,
  submitLabel,
  submitTitle,
  loading,
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
          disabled={loading}
        >
          {submitLabel}
        </button>
      }
    </form>
  );
};

export default FormWrapper;