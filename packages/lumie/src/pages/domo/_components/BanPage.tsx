import React from 'react';
import { Icon } from '@horen/core';

import style from './BanPage.module.less';

export interface BanPageProps {
  message?: string;
  allowRole?: string;
  currentRole?: string;
}

export default function BanPage({
  message = '无法访问',
  allowRole,
  currentRole,
}: BanPageProps) {
  return (
    <div className={style.banPage}>
      <div>
        <Icon name="ban" size={192} fill="#919191" />
      </div>
      <div>
        <h1 className={style.message}>{message}</h1>
        {allowRole && (
          <h3 className={style.allowRole}>
            允许角色: <span>{allowRole}</span>
          </h3>
        )}
        {currentRole && (
          <h3 className={style.currentRole}>
            当前角色: <span>{currentRole}</span>
          </h3>
        )}
      </div>
    </div>
  );
}
