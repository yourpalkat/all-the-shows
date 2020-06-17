import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
  align-items: center;
`;

const Header = ({ addShowPage }) => {
  return (
    <PageHeader>
      <h1>All the Shows</h1>
      { addShowPage ? (
        <NavLink to="/">Cancel</NavLink>
      ) : (
        <NavLink to="/add">Add a show</NavLink>
      )}
    </PageHeader>
  );
}

export default Header;