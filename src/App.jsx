import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import './index.css';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isLoggedIn ? <LoginPage onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/dashboard" />} 
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <DashboardPage onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}