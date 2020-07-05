import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../services/tokenService';

const PrivateRoute = ({ children, ...rest }) => {
  const token = getToken();
  return (
    <Route
      {...rest}
      render={() =>
        token ? (
          children
        ) : (
            <Redirect to="/" />
          )
      }
    />
  );
};

export default PrivateRoute;