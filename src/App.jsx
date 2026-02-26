import React, { useState } from 'react';
// Importa ang duha ka pages gikan sa imong bag-ong folder
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple Switch Logic
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <DashboardPage onLogout={() => setIsLoggedIn(false)} />;
}