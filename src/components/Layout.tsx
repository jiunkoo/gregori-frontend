import React from "react";
import { Header, MyPageSidebar } from "@components";
import "@styles/layout.css";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showMyPageSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNav = true,
  showMyPageSidebar = false,
}) => {
  return (
    <div className="layout-container">
      <Header showSearch={true} showNav={showNav} />
      {showMyPageSidebar ? (
        <div className="layout-content-with-sidebar">
          <MyPageSidebar />
          {children}
        </div>
      ) : (
        <div className="layout-content">{children}</div>
      )}
    </div>
  );
};

export default Layout;
