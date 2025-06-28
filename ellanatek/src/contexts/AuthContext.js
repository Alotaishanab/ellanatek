// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import ellantekAPI from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (ellantekAPI.isAuthenticated()) {
          // You might want to verify the token is still valid
          // by calling a user profile endpoint
          setIsAuthenticated(true);
          // If you have a user profile endpoint, fetch user data here
          // const userData = await ellantekAPI.getUserProfile();
          // setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        ellantekAPI.clearAuth();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await ellantekAPI.login(credentials);
      setUser(response.user || { email: credentials.email });
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await ellantekAPI.signup(userData);
      setUser(response.user || { email: userData.email });
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ellantekAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const sendVerificationCode = async (phoneNumber) => {
    return await ellantekAPI.sendVerificationCode(phoneNumber);
  };

  const verifyCode = async (phoneNumber, code) => {
    return await ellantekAPI.verifyCode(phoneNumber, code);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    sendVerificationCode,
    verifyCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;