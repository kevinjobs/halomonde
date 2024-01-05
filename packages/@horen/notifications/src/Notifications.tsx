import { useEffect } from "react";
import { Notification } from "@horen/core";
import { useNotifications } from "./use-notifications";
// import css from './Notifications.module.less';

export type NotificationPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export function Notifications() {
  const nos = useNotifications();

  useEffect(() => {

  }, [])

  return (
    <div className="">

    </div>
  )
}