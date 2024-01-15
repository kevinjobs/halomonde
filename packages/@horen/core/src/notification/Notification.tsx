import React, { HtmlHTMLAttributes, } from 'react';

import { Icon, } from '../icon';
import css from './Notification.module.less';

export interface NotificationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: React.ReactNode;
  type?: string;
}

export function Notification({
  title,
  message,
  type = 'info',
  ...rest
}: NotificationProps) {
  const icons: Record<string, any> = {
    info: <Icon name='info' fill='#fff' />,
    success: <Icon name='success' fill='#fff' />,
    warning: <Icon name='warning' fill='#fff' />,
    error: <Icon name='error' fill='#fff' />,
  }

  const cls: Record<string, any> = {
    info: css.info,
    success: css.success,
    warning: css.warning,
    error: css.error,
  }

  const titles: Record<string, string> = {
    info: '消息',
    success: '成功',
    warning: '警告',
    error: '错误',
  }

  return (
    <div className={css.notification + ' ' + cls[type]} {...rest}>
      <div className={css.icon}>{icons[type]}</div>
      <div className={css.right}>
        <div className={css.title}>{titles[type]}</div>
        <div className={css.message}>{message}</div>
      </div>
    </div>
  )
}