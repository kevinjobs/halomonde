import React, { useEffect, useState } from 'react';

import {
  genInvitations,
  getInvitationList,
  InvitationListRespData,
} from '@/utils/apis';
import { AddButton } from '@horen/core';
import { notifications } from '@horen/notifications';
import { CheckOne, CloseOne, User } from '@icon-park/react';

import style from './Invitation.module.less';

export function Invitation() {
  const [codes, setCodes] = useState<InvitationListRespData['invitations']>();

  const fetchCodes = () => {
    (async () => {
      const resp = await getInvitationList();
      if (typeof resp !== 'string') setCodes(resp.data.invitations);
      else notifications.show({ variant: 'danger', message: resp });
    })();
  };

  const handleGenCodes = () => {
    if (window.confirm('确定生成?')) {
      (async () => {
        const resp = await genInvitations();
        if (typeof resp !== 'string') {
          fetchCodes();
          notifications.show({ variant: 'success', message: resp.msg });
        } else notifications.show({ variant: 'danger', message: resp });
      })();
    }
  };

  useEffect(() => fetchCodes(), []);

  return (
    <div className={style.invitation}>
      <div className={style.operate}>
        <AddButton onClick={handleGenCodes}>生成邀请码</AddButton>
      </div>
      <div className={style.codeList}>
        {codes &&
          codes.map((c) => {
            return (
              <div className={style.codeItem} key={c.code}>
                <span className={style.status}>
                  {c.valid ? (
                    <CheckOne theme="outline" size="24" fill="#6db61c" />
                  ) : (
                    <CloseOne theme="outline" size="24" fill="#f3374f" />
                  )}
                </span>
                <span className={style.code}>{c.code}</span>
                <span className={style.registerByIcon}>
                  {c.registerBy && (
                    <User theme="outline" size="20" fill="#4a90e2" />
                  )}
                </span>
                <span className={style.registerBy}>{c.registerBy}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
