import type { FunctionComponent } from 'react';
import { useContext, useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactForm.module.scss';
import { LangContext } from '../../../contexts/LangContext';
import { areaTexts, mailTexts, sendTexts, sentTexts } from '../../../langs/pages/contact';
import SendIcon from '../../../icons/SendIcon';
import ValidMessage from '../../ValidMessage/ValidMessage';
import InputField from '../../inputs/InputField/InputField';
import FormWrapper from '../FormWrapper/FormWrapper';
import InputArea from '../../inputs/InputArea/InputArea';

// We use FormSpree for this contact form
// ==>    https://formspree.io/

const ContactForm: FunctionComponent = () => {

  const { lang } = useContext(LangContext);

  const mailLabel = mailTexts.label[lang as keyof typeof mailTexts.label];
  const mailTitle = mailTexts.title[lang as keyof typeof mailTexts.title];
  const areaPlaceholder = areaTexts[lang as keyof typeof areaTexts];
  const sendLabel = sendTexts.label[lang as keyof typeof sendTexts.label];
  const sendTitle = sendTexts.title[lang as keyof typeof sendTexts.title];
  const sentText = sentTexts[lang as keyof typeof sentTexts];

  const [state, handleSubmit] = useForm('mknkynke');
  const [sent, setSent] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [area, setArea] = useState<string>('');

  useEffect(() => {
    if(state.succeeded) {
      setSent(sentText)
    } else {
      setSent('');
    };
  }, [state]);

  return (
    <FormWrapper handleSubmit={handleSubmit}>

      <InputField
        value={email}
        setValue={setEmail}
        id="email"
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

      {sent &&
        <ValidMessage
          message={sent}
          setMessage={setSent}
        />
      }

      <button
        className={styles.button}
        type='submit'
        title={sendTitle}
        aria-label={sendTitle}
        disabled={state.submitting}
      >
        <SendIcon color={"var(--white)"} />

        {sendLabel}
      </button>
    </FormWrapper>
  );
};

export default ContactForm;