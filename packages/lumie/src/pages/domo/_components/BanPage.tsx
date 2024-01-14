import React from 'react';
import style from './BanPage.module.less';

export interface BanPageProps {
  message?: string;
  allowRole?: string;
  currentRole?: string; 
}

export default function BanPage({
  message='无法访问',
  allowRole,
  currentRole
}: BanPageProps) {
  return (
    <div className={style.banPage}>
      <h1 className={style.message}>{message}</h1>
      {
        allowRole &&
        <h3 className={style.allowRole}>允许的级别: {allowRole}</h3>
      }
      {
        currentRole &&
        <h3 className={style.currentRole}>当前角色: {currentRole}</h3>
      }
    </div>
  )
}