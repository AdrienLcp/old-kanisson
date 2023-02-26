import type { FunctionComponent } from 'react';
import { useContext, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { LangContext } from '../../../contexts/LangContext';
import { areaTexts, mailTexts, sendTexts, sentTexts } from '../../../translations/pages/contact';
import styles from './ContactForm.module.scss';
import SendIcon from '../../../icons/SendIcon';
import { Message } from '../../Message/Message';
import { InputField } from '../../inputs/InputField/InputField';
import { InputArea } from '../../inputs/InputArea/InputArea';
import { FormWrapper } from '../../../layouts/wrappers/FormWrapper/FormWrapper';
import { Button } from '../../buttons/Button/Button';
import { Loader } from '../../Loader/Loader';

// We use FormSpree for this contact form
// ==>    https://formspree.io/

export const ContactForm: FunctionComponent = () => {

  const { lang } = useContext(LangContext);

  const mailLabel = mailTexts.label[lang as keyof typeof mailTexts.label];
  const mailTitle = mailTexts.title[lang as keyof typeof mailTexts.title];
  const areaPlaceholder = areaTexts[lang as keyof typeof areaTexts];
  const sendLabel = sendTexts.label[lang as keyof typeof sendTexts.label];
  const sendTitle = sendTexts.title[lang as keyof typeof sendTexts.title];
  const sentText = sentTexts[lang as keyof typeof sentTexts];

  const [state, handleSubmit] = useForm('mknkynke');
  const [email, setEmail] = useState<string>('');
  const [area, setArea] = useState<string>('');

  if(state.succeeded) return (
    <section className={styles.success}>
      <Message validMessage={sentText} />
    </section>
  );

  return (
    <FormWrapper handleSubmit={handleSubmit}>
      <InputField
        value={email}
        setValue={setEmail}
        id="email"
        name="email"
        title={mailTitle}
        label={mailLabel}
        autoFocus={true}
      />

      <ValidationError
        prefix='Email'
        field='email'
        errors={state.errors}
      />

      <InputArea
        value={area}
        setValue={setArea}
        id="message"
        name="message"
        label={areaPlaceholder}
      />

      <ValidationError
        prefix='Message'
        field='message'
        errors={state.errors}
      />

      {state.submitting ?
        <Loader />
      :
        <Button
          styles={styles.button}
          type='submit'
          title={sendTitle}
          disabled={state.submitting}
        >
          <SendIcon color={"var(--white)"} />

          {sendLabel}
        </Button>
      }
    </FormWrapper>
  );
};