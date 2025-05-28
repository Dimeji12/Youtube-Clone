
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isVideoPage = location.pathname.includes('/video/');

  return (
    <div className="flex flex-col h-screen">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar className={`${isVideoPage ? 'hidden lg:block' : ''}`} />}
        <main className={`flex-1 overflow-auto p-4 ${isVideoPage ? 'lg:p-6' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
