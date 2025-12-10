import React from "react";

import Header from "@/features/Header";
import MyPageSidebar from "@/features/mypage/MyPageSidebar";
import "@/features/layout.css";

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
  if (showMyPageSidebar) {
    return (
      <div className="layout-container">
        <Header showNav={false} showSearch={false} />
        <div className="layout-content-with-sidebar">
          <MyPageSidebar />
          <div className="layout-content">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Header showNav={showNav} />
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
