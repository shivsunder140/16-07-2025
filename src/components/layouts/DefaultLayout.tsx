import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Breadcrumbs from '../navigation/Breadcrumbs';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-transparent relative z-10">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;