import React, { HtmlHTMLAttributes } from 'react';
import { Icon } from '../icon';
import css from './Notification.module.less';

export interface NotificationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: React.ReactNode;
}

export function Notification({title, message, ...rest}: NotificationProps) {
  return (
    <div className={css.notification} {...rest}>
      <div className={css.icon}>
        <Icon name='info' />
      </div>
      <div className={css.right}>
        <div className={css.title}>{title}</div>
        <div className={css.message}>{message}</div>
      </div>
    </div>
  )
}