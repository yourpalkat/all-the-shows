import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Wrapper = styled.div`
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Layout = ({ children, addShowPage }) => {
  return (
    <Wrapper>
      <Header addShowPage={addShowPage} />
      {children}
    </Wrapper>
  );
}

export default Layout;