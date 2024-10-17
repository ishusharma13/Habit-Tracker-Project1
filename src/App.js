// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to show loading state.

  // Check authentication status on component mount.
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    // Optional: Show a loading indicator while checking authentication.
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && (
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      )}

      <Routes>
        {/* Redirect to dashboard if authenticated; otherwise, login */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
        
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/notes"
          element={
            isAuthenticated ? <Notes /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
