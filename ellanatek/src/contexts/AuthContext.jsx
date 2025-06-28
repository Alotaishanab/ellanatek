import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [advertiserData, setAdvertiserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuthData = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAdvertiserData(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('advertiserData');
    localStorage.removeItem('campaignData');
    localStorage.removeItem('paymentSuccess');
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const authStatus = localStorage.getItem('isAuthenticated');
        const userData = localStorage.getItem('userData');
        const advertiserInfo = localStorage.getItem('advertiserData');

        if (authStatus === 'true' && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
          
          if (advertiserInfo) {
            setAdvertiserData(JSON.parse(advertiserInfo));
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData, advertiserInfo = null) => {
    try {
      // Set authentication state
      setIsAuthenticated(true);
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      if (advertiserInfo) {
        setAdvertiserData(advertiserInfo);
        localStorage.setItem('advertiserData', JSON.stringify(advertiserInfo));
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    try {
      clearAuthData();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateAdvertiserData = (data) => {
    try {
      setAdvertiserData(data);
      localStorage.setItem('advertiserData', JSON.stringify(data));
    } catch (error) {
      console.error('Error updating advertiser data:', error);
    }
  };

  const updateUserData = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const hasCompletedOnboarding = () => {
    return advertiserData && advertiserData.businessName;
  };

  const value = {
    isAuthenticated,
    user,
    advertiserData,
    isLoading,
    login,
    logout,
    updateAdvertiserData,
    updateUserData,
    hasCompletedOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 