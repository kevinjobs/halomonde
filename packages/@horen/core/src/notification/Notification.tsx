import React, { HtmlHTMLAttributes } from 'react';

import { Icon } from '../icon';
import css from './Notification.module.less';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: React.ReactNode;
  variant?: NotificationVariant;
}

export function Notification({
  title,
  message,
  variant = 'info',
  ...rest
}: NotificationProps) {
  const icons: Record<NotificationVariant, any> = {
    info: <Icon name="info" fill="#fff" />,
    success: <Icon name="success" fill="#fff" />,
    warning: <Icon name="warning" fill="#fff" />,
    danger: <Icon name="error" fill="#fff" />,
  };

  const cls: Record<NotificationVariant, string> = {
    info: css.info,
    success: css.success,
    warning: css.warning,
    danger: css.danger,
  };

  const titles: Record<NotificationVariant, string> = {
    info: '消息',
    success: '成功',
    warning: '警告',
    danger: '错误',
  };

  return (
    <div className={css.notification + ' ' + cls[variant]} {...rest}>
      <div className={css.icon}>{icons[variant]}</div>
      <div className={css.right}>
        <div className={css.title}>{titles[variant]}</div>
        <div className={css.message}>{message}</div>
      </div>
    </div>
  );
}
