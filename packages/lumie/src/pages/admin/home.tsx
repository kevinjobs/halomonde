import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default function AdminHomePage(): React.ReactElement {

  return (
    <Container className="admin-home-container">
      <div>
        <h1>Welcome!</h1>
      </div>
    </Container>
  );
}
