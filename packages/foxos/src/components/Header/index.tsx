import React from "react";

import "./style.less";

export interface HeaderProps {
  onClickAvatar?: (name: string) => void;
}

export default function Header({ onClickAvatar }: HeaderProps) {
  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClickAvatar && onClickAvatar((e.target as HTMLSpanElement).innerText);
  };

  return (
    <div className="component-header">
      <div className="component-header__title">
        <span>My Workspace</span>
      </div>
      <div className="component-header__avatar">
        <span onClick={handleClick}>Kevin Jobs</span>
      </div>
    </div>
  );
}
