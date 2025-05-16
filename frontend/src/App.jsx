import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import UserLogin from './pages/UserLogin';
import CaptainRegister from './pages/CaptainRegister';
import UserPage from './pages/UserPage';
import UserDashboard from './pages/UserDashboard';
import CaptainLogin from './components/CaptainLogin';
import CaptainDashboard from './components/CaptainDashboard';


const App = () => {
  const isUserAuthenticated = localStorage.getItem('userToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-register" element={<CaptainRegister />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-dashboard" element={<CaptainDashboard />} />
        <Route
          path="/user-dashboard"
          element={
            isUserAuthenticated ? <UserDashboard /> : <Navigate to="/user-login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
