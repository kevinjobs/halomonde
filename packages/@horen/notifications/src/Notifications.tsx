import { forwardRef, useEffect, useRef, } from 'react';
import {
    Transition as _Transition, TransitionGroup, TransitionStatus,
} from 'react-transition-group';

import { Notification, } from '@horen/core';

import css from './Notifications.module.less';
import { LetopItem, notifications, useLp, } from './notifications.store';

const Transition: any = _Transition;

export type NotificationPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export function Notifications() {
  const notices = useLp();
  const refs = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {

  }, [])

  return (
    <div className={css.notifications}>
      <TransitionGroup>
      {
        notices.lp.map(notice => {
          const id = notice.id;
          if (id) setTimeout(() => notifications.hide(id), 3000);
          return (
            <Transition
              key={id}
              timeout={500}
              onEnter={() => refs.current[id!].offsetHeight}
              nodeRef={{ current: refs.current[id!] }}
            >
              {(state: TransitionStatus) => (
                <NotificationContainer
                  styles={getStyles({state})}
                  notice={notice}
                  ref={(node) => refs.current[id!] = node!}
                />
              )}
            </Transition>
          )
        })
      }
      </TransitionGroup>
    </div>
  )
}

type ContainerProps = {
  styles: React.CSSProperties,
  notice?: LetopItem,
}

const NotificationContainer = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  return (
    <div
      ref={ref}
      style={props.styles}
    >
      <Notification {...props.notice} />
    </div>
  )
});

const transforms = {
  'top-center': 'translateY(-100%)',
}

const noTransfroms = {
  'top-center': 'translateY(0)',
}

function getStyles({state}: {state: TransitionStatus}) {
  const commonStyles: React.CSSProperties = {
    opacity: 0,
    transform: transforms['top-center'],
    transitionDuration: `500ms, 500ms, 500ms`,
    transitionTimingFunction: 'cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear',
    transitionProperty: 'opacity, transform',
  }

  const inState: React.CSSProperties = {
    opacity: 1,
    transform: noTransfroms['top-center'],
  }

  const outState: React.CSSProperties = {
    opacity: 0,
    transform: transforms['top-center'],
  }

  const transitionStyles = {
    entering: inState,
    entered: inState,
    exiting: outState,
    exited: outState,
  }

  return  { ...commonStyles, ...transitionStyles[state as keyof typeof transitionStyles] }
}