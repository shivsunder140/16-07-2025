import React from 'react';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 relative">
      {children}
    </div>
  );
};

export default MinimalLayout;