import React from 'react';
import styled from 'styled-components';

import { AvatarUpload } from '@/components/upload';
import { UPLOAD_URL } from '@/constants';

const Container = styled.div``;

export default function AdminHomePage(): React.ReactElement {

  return (
    <Container className="admin-home-container">
      <div>
        <h1>Welcome!</h1>
        <AvatarUpload
          url={UPLOAD_URL}
          onSuccess={() => {}}
          onFailed={() => {}}
        />
      </div>
    </Container>
  );
}
