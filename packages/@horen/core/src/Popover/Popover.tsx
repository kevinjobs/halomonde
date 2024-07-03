import React from 'react';
import cls from './Popover.module.less';
import { classnames } from '../_utils';

export interface PopoverProps {
  children: React.ReactNode;
}

const PopoverContext = React.createContext<{
  open: boolean;
}>({
  open: false,
});

function Popover({ children }: PopoverProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const findTopTarget = (el: HTMLElement) => {
    const key = el.dataset?.key;

    if (key === 'target') {
      return el;
    } else {
      if (el.parentNode) {
        findTopTarget(el.parentNode as HTMLElement);
      }
    }
  };

  return (
    <PopoverContext.Provider value={{ open }}>
      <div
        className={cls.popover}
        onClick={handleClick}
        data-key="popover"
        tabIndex={1}
        onBlur={handleBlur}>
        <div>{children}</div>
      </div>
    </PopoverContext.Provider>
  );
}

function Target({ children }: { children: React.ReactNode }) {
  return (
    <div className={cls.popoverTarget} data-key={'target'}>
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(PopoverContext);

  const clsname = classnames({
    [cls.popoverContent]: true,
    [cls.open]: open,
    [cls.close]: !open,
  });

  return <div className={clsname}>{children}</div>;
}

Popover.Target = Target;
Popover.Content = Content;

export { Popover };
