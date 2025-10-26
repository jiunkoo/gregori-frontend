import React from "react";
import { Header, BestSidebar } from "@components";
import "@styles/layout.css";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showBestSidebar?: boolean;
  selectedCategory?: number;
  onCategoryChange?: (categoryId: number) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNav = true,
  showBestSidebar = false,
  selectedCategory,
  onCategoryChange,
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
      ) : (
        <div className="layout-content">{children}</div>
      )}
    </div>
  );
};

export default Layout;
