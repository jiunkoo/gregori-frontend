import React from 'react';
import Header from '@components/common/Header';
import '@styles/layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header showSearch={true} showNav={true} />
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
