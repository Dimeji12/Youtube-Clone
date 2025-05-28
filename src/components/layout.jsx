import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const Layout = ({ children }) =>
{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isVideoPage = location.pathname.startsWith('/video');

  return (
    <div className="flex flex-col h-screen">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} isHiddenOnVideoPage={isVideoPage} />
        <main className="flex-1 overflow-auto transition-all duration-200 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
