import React, { useRef } from 'react';
import cls from './Popover.module.less';
import { useClickOutside } from '@horen/hooks';
import { classnames } from '../_utils';

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onClickTarget?: () => void;
  onClickContent?: () => void;
  onClickOutside?: () => void;
}

const PopoverContext = React.createContext<{
  open: boolean;
  handleClickContent: () => void;
  handleClickTarget: () => void;
}>({
  open: false,
  handleClickContent: () => {},
  handleClickTarget: () => {},
});

function Popover({
  children,
  onClickContent,
  onClickOutside,
  onClickTarget,
  open = false,
}: PopoverProps) {
  const ref = useClickOutside(() => {
    if (onClickOutside) {
      onClickOutside();
    }
  });

  const handleClickContent = () => {
    if (onClickContent) {
      onClickContent();
    }
  };

  const handleClickTarget = () => {
    if (onClickTarget) {
      onClickTarget();
    }
  };

  return (
    <PopoverContext.Provider
      value={{ open, handleClickContent, handleClickTarget }}>
      <div className={cls.popover} data-key="popover" tabIndex={1} ref={ref}>
        <div>{children}</div>
      </div>
    </PopoverContext.Provider>
  );
}

function Target({ children }: { children: React.ReactNode }) {
  const { handleClickTarget } = React.useContext(PopoverContext);

  return (
    <div className={cls.popoverTarget} onClick={() => handleClickTarget()}>
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { open, handleClickContent } = React.useContext(PopoverContext);

  const clsname = classnames({
    [cls.popoverContent]: true,
    [cls.open]: open,
    [cls.close]: !open,
  });

  return (
    <div className={clsname} onClick={() => handleClickContent()}>
      {children}
    </div>
  );
}

Popover.Target = Target;
Popover.Content = Content;

export { Popover };
