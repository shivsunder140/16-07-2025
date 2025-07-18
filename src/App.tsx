import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import AppRouter from './components/navigation/AppRouter';
import { usePageMeta } from './hooks/usePageMeta';

const AppContent: React.FC = () => {
  usePageMeta();
  
  return (
    <div className="min-h-screen bg-gray-950 text-white relative">
      <AnimatedBackground />
      <AppRouter />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;