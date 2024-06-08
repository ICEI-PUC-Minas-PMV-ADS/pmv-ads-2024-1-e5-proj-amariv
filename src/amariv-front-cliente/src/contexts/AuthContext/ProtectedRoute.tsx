// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate, Router } from 'react-router-dom';
import { AppContext } from './AppContext';

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { user } = useContext(AppContext);

  return user ? (

    <>
      {element}
    </>

  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
