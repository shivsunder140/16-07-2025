import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ContentCreator from './pages/ContentCreator';
import PostScheduler from './pages/PostScheduler';
import Analytics from './pages/Analytics';
import ContentLibrary from './pages/ContentLibrary';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-950 text-white relative">
            <AnimatedBackground />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="create" element={<ContentCreator />} />
                <Route path="scheduler" element={<PostScheduler />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="library" element={<ContentLibrary />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;