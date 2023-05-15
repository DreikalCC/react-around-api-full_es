import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element, loggedIn }) {
  return loggedIn ? element : <Navigate to='/login' />;
}
