import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import VerifyPhone from './components/VerifyPhone';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import RewardsPage from './pages/RewardsPage';
import UploadReceipt from './components/UploadReceipt';
import ReceiptHistory from './components/ReceiptHistory';
import JoinChallenge from './components/JoinChallenge';
import ReferFriend from './components/ReferFriend';
import ChallengePage from './pages/ChallengePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    '/dashboard',
    '/leaderboard',
    '/rewards',
    '/upload-receipt',
    '/receipt-history',
    '/join-challenge',
    '/refer-friend',
    '/login',
    '/signup',
    '/verify-email',
    '/verify-phone',
    '/forgot-password',
  ];

  // Check if navbar should be hidden
  const shouldShowNavbar =
    !hideNavbarPaths.includes(location.pathname) &&
    !location.pathname.startsWith('/challenge/');

  return shouldShowNavbar ? <Navbar /> : null;
};

const Display = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <NavbarWrapper />
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-phone" element={<VerifyPhone />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rewards"
              element={
                <ProtectedRoute>
                  <RewardsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload-receipt"
              element={
                <ProtectedRoute>
                  <UploadReceipt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receipt-history"
              element={
                <ProtectedRoute>
                  <ReceiptHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/join-challenge"
              element={
                <ProtectedRoute>
                  <JoinChallenge />
                </ProtectedRoute>
              }
            />
            <Route
              path="/refer-friend"
              element={
                <ProtectedRoute>
                  <ReferFriend />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenge/:id"
              element={
                <ProtectedRoute>
                  <ChallengePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default Display;
