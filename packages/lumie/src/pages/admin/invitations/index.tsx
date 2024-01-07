import React, { useEffect, useState } from "react";
import { CheckOne, CloseOne, User } from '@icon-park/react';
import { notifications } from "@horen/notifications";
import { Header } from '../_partial/layout';
import { getInvitations, InvitationCode } from "@/apis/auth";
import './invitations.css';

export default function InvitaionsAdmin() {
  const [codes, setCodes] = useState<InvitationCode[]>();

  const fetchCodes = () => {
    (async () => {
      const resp = await getInvitations();
      if (typeof resp !== 'string') setCodes(resp.data.invitations);
      else notifications.show({type: 'error', message: resp});
    })();
  }

  useEffect(() => fetchCodes(), []);

  return (
    <div>
      <Header>
        <h2>邀请码</h2>
      </Header>
      <div className="code-list">
        {codes && codes.map(c => {
          return (
            <div className="code-item">
              <span id='status'>
                {
                  c.valid
                  ? <CheckOne theme="outline" size="24" fill="#6db61c"/>
                  : <CloseOne theme="outline" size="24" fill="#f3374f"/>
                }
              </span>
              <span id="code">{c.code}</span>
              <span id='register-by-icon'>
                {
                  c.registerBy &&
                  <User theme="outline" size="20" fill="#4a90e2"/>
                }
              </span>
              <span id='register-by'>{c.registerBy}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
} 