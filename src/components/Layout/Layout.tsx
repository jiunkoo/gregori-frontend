import React from "react";
import Header from "@components/common/Header";
import "@styles/layout.css";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="layout-container">
      <Header showSearch={true} showNav={showNav} />
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default Layout;
