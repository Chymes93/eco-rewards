import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the authentication context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState(null); // 'email' or 'phone'
  const [tempUserData, setTempUserData] = useState(null);

  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoRewardsUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('ecoRewardsUser');
      }
    }
    setLoading(false);
  }, []);

  // Simulate signup process
  const signup = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store temporary user data for verification
      setTempUserData(userData);

      // Generate a random verification ID
      const verificationId = Math.random().toString(36).substring(2, 10);
      setVerificationId(verificationId);

      // Determine verification method based on provided data
      const method = userData.email ? 'email' : 'phone';
      setVerificationMethod(method);

      // Navigate to verification page
      navigate(`/verify-${method}`);

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'An error occurred during signup');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Simulate login process
  const login = async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll accept any credentials
      // In a real app, this would validate against a backend
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        points: 1000,
        ...credentials,
      };

      // Store user in local storage
      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      // Navigate to landing page
      navigate('/');

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Invalid email or password');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Simulate OTP verification
  const verifyOTP = async (otp) => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll accept any 6-digit OTP
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        throw new Error('Invalid OTP format');
      }

      // Create user from temporary data
      const user = {
        id: Math.random().toString(36).substring(2, 10),
        ...tempUserData,
        points: 0,
      };

      // Store user in local storage
      localStorage.setItem('ecoRewardsUser', JSON.stringify(user));
      setCurrentUser(user);

      // Clear temporary data
      setTempUserData(null);
      setVerificationId(null);
      setVerificationMethod(null);

      // Navigate to landing page
      navigate('/');

      return { success: true };
    } catch (error) {
      setAuthError(error.message || 'Invalid OTP');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('ecoRewardsUser');
    setCurrentUser(null);
    navigate('/');
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      setLoading(true);
      setAuthError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a new verification ID
      const newVerificationId = Math.random().toString(36).substring(2, 10);
      setVerificationId(newVerificationId);

      return { success: true, message: 'OTP resent successfully' };
    } catch (error) {
      setAuthError(error.message || 'Failed to resend OTP');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    authError,
    verificationId,
    verificationMethod,
    tempUserData,
    signup,
    login,
    logout,
    verifyOTP,
    resendOTP,
    setAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
