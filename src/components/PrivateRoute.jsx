import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('token');
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute; 