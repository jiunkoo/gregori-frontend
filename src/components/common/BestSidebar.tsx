import React from "react";
import { CATEGORIES, CATEGORY_CONSTANTS } from "@constants";
import "@styles/best-sidebar.css";

interface BestSidebarProps {
  selectedCategory: number;
  onCategoryChange: (categoryId: number) => void;
}

const BestSidebar: React.FC<BestSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <aside className="best-sidebar">
      <h2 className="best-sidebar-title">{CATEGORY_CONSTANTS.TITLE}</h2>
      <div className="best-sidebar-divider"></div>
      <ul className="category-list">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <button
              className={
                selectedCategory === category.id
                  ? "category-item-active"
                  : "category-item"
              }
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BestSidebar;
