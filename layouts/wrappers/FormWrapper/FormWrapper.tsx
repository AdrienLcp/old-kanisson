import type { FC } from 'react';
import { Button } from '../../../components/buttons/Button/Button';
import { Loader } from '../../../components/Loader/Loader';
import { FormWrapperProps } from '../../../types/layouts';
import styles from './FormWrapper.module.scss';

export const FormWrapper: FC<FormWrapperProps> = ({
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
        <>
          {loading ?
            <Loader />
          :
            <Button
              styles={styles.button}
              title={submitTitle}
              type='submit'
              disabled={loading}
            >
              {submitLabel}
            </Button>
          }
        </>
      }
    </form>
  );
};