import { createPortal } from 'react-dom';
import { RequestStatusType } from '../contact/ContactForm';
import styles from './notification.module.css';
import { INotificationProps } from './Notification.props';

export type NotificationType = {
  title: string;
  message: string;
  status: RequestStatusType;
};

const Notification = (props: INotificationProps): JSX.Element => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === RequestStatusType.SUCCESS) {
    statusClasses = styles.success;
  }

  if (status === RequestStatusType.ERROR) {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications')!
  );
};

export default Notification;
