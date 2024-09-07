import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is imported

const checkTokenExpiry = (token) => {
  try {
    const currentTime = Date.now() / 1000; // Convert to seconds
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // If token can't be decoded, treat it as expired
  }
};

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("admin-token");
  const isLoggedIn = !!token && !checkTokenExpiry(token); // Check if token exists and is not expired

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
