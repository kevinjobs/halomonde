import React from 'react';
import css from './Layout.module.less';


function Header ({children}: {children?: React.ReactNode}) {
  return (
    <div className={css.header}>
      { children }
    </div>
  );
}

export default function Container ({children}: {children?: React.ReactNode}) {
  return (
    <div className={css.container}>
      { children }
    </div>
  );
}

export { Header, Container }
