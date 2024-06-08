// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate, Router } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { user } = useContext(AuthContext);

  return user ? (

    <>
      {element}
    </>

  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
