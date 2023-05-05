import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from './UserContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(UserContext);

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
