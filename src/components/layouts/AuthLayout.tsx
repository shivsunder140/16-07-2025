import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative">
      {children}
    </div>
  );
};

export default AuthLayout;