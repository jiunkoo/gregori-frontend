import React from "react";
import { Header, BestSidebar, MyPageSidebar } from "@components";
import "@styles/layout.css";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showBestSidebar?: boolean;
  selectedCategory?: number;
  onCategoryChange?: (categoryId: number) => void;
  showMyPageSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNav = true,
  showBestSidebar = false,
  selectedCategory,
  onCategoryChange,
  showMyPageSidebar = false,
}) => {
  return (
    <div className="layout-container">
      <Header showSearch={true} showNav={showNav} />
      {showBestSidebar && selectedCategory !== undefined && onCategoryChange ? (
        <div className="layout-content-with-sidebar">
          <BestSidebar
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
          {children}
        </div>
      ) : showMyPageSidebar ? (
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
