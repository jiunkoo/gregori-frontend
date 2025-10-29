import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@components/icons/SvgIcon";
import { HEADER_CONSTANTS } from "@constants/header";
import "@styles/header.css";

interface HeaderProps {
  showSearch?: boolean;
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  showNav = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="header-banner">
        <div className="header-banner-text">
          {HEADER_CONSTANTS.BANNER.PREFIX}
          &nbsp;
          <span className="header-banner-discount">
            {HEADER_CONSTANTS.BANNER.DISCOUNT}
          </span>
          &nbsp;
          {HEADER_CONSTANTS.BANNER.SUFFIX}
          <Icon
            name="arrowRight"
            size={20}
            className="header-banner-icon-arrow-right"
          />
        </div>
      </div>

      <div className="header-main">
        <Link to="/" className="header-logo">
          <div className="header-logo-text">{HEADER_CONSTANTS.LOGO.TEXT}</div>
        </Link>

        {showSearch && (
          <div className="header-search-container">
            <div className="header-search-wrapper">
              <div className="header-search-icon-wrapper">
                <Icon name="google" size={32} className="header-google-icon" />
                <div className="header-search-divider"></div>
              </div>
              <input
                type="text"
                placeholder={
                  showNav
                    ? HEADER_CONSTANTS.SEARCH.PLACEHOLDER_WITH_NAV
                    : HEADER_CONSTANTS.SEARCH.PLACEHOLDER_WITHOUT_NAV
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <button type="submit" className="header-search-button">
                <Icon name="search" size={24} className="header-search-icon" />
              </button>
            </div>
          </div>
        )}

        <div className="header-actions">
          {HEADER_CONSTANTS.ACTIONS.map((action) => {
            if (action.path) {
              return (
                <Link
                  key={action.name}
                  to={action.path}
                  className="header-action-item"
                >
                  <Icon
                    name={action.name}
                    size={24}
                    className="header-action-icon"
                  />
                  <span className="header-action-text">{action.text}</span>
                </Link>
              );
            } else {
              return (
                <div key={action.name} className="header-action-item">
                  <Icon
                    name={action.name}
                    size={24}
                    className="header-action-icon"
                  />
                  <span className="header-action-text">{action.text}</span>
                </div>
              );
            }
          })}
        </div>
      </div>

      {showNav && (
        <div className="header-nav">
          <nav className="header-nav-list">
            {HEADER_CONSTANTS.NAV_MENU.map((item, index) => (
              <Link
                key={item.label}
                to={item.path}
                className={`header-nav-link ${
                  index === 0 ? "header-nav-link-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
