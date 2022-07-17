import { FormEvent, useEffect, useState } from 'react';
import { ContactDataType, ResponseDataType } from '../../pages/api/contact';
import Notification, { NotificationType } from '../ui/Notification';

import styles from './ContactForm.module.css';

export enum RequestStatusType {
  PENDING,
  SUCCESS,
  ERROR,
}

const sendContactData = async (contactData: ContactDataType): Promise<void> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData: ResponseDataType = await response.json();

  if (!response.ok) {
    throw Error(resData.message || 'Somethins went wrong!');
  }
};

const ContactForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<RequestStatusType | null>(
    null
  );
  const [errMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (
      requestStatus === RequestStatusType.ERROR ||
      requestStatus === RequestStatusType.SUCCESS
    ) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const clearForm = (): void => {
    setEmail('');
    setName('');
    setMessage('');
  };

  const sendMessageHandler = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault();

    setRequestStatus(RequestStatusType.PENDING);

    try {
      await sendContactData({ email, name, message });
      setRequestStatus(RequestStatusType.SUCCESS);
      clearForm();
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      }
      setRequestStatus(RequestStatusType.ERROR);
    }
  };

  let notification: NotificationType | undefined;

  if (requestStatus === RequestStatusType.PENDING) {
    notification = {
      status: RequestStatusType.PENDING,
      title: 'Sending message...',
      message: 'Your message is on its way.',
    };
  }
  if (requestStatus === RequestStatusType.ERROR) {
    notification = {
      status: RequestStatusType.ERROR,
      title: 'Error',
      message: errMessage,
    };
  }
  if (requestStatus === RequestStatusType.SUCCESS) {
    notification = {
      status: RequestStatusType.SUCCESS,
      title: 'Success!',
      message: 'Message sent successfully!',
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">You Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(evt): void => setEmail(evt.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">You Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(evt): void => setName(evt.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">You Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={message}
            onChange={(evt): void => setMessage(evt.target.value)}
          ></textarea>
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          status={notification.status}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
