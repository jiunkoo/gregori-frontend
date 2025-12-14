import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Icon } from "@components";
import { authAPI } from "@api";
import { useAuthStore } from "@stores";

import { toResult } from "@/utils/result";
import { getApiErrorMessage } from "@/utils/error";
import { HEADER_CONSTANTS } from "@/features/Header.constants";
import "@/features/Header.css";

interface HeaderProps {
  showSearch?: boolean;
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  showNav = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAuthChecked, logout, setError } = useAuthStore();

  const handleLogout = async () => {
    const result = await toResult(authAPI.signOut());

    if (!result.ok) {
      const message = getApiErrorMessage(
        result.error,
        HEADER_CONSTANTS.LOGOUT.ERROR_MESSAGE
      );
      setError(message);
    }

    await logout();
    navigate("/");
  };

  if (!isAuthChecked) {
    return null;
  }

  return (
    <>
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
              <button
                type="submit"
                className="header-search-button"
                aria-label={HEADER_CONSTANTS.SEARCH.BUTTON_ARIA_LABEL}
              >
                <Icon name="search" size={24} className="header-search-icon" />
              </button>
            </div>
          </div>
        )}

        <div className="header-actions">
          {HEADER_CONSTANTS.ACTIONS.map((action) => {
            if (action.name === "login") {
              if (isAuthenticated) {
                return (
                  <button
                    key="logout"
                    onClick={handleLogout}
                    className="header-action-item"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Icon
                      name="logout"
                      size={24}
                      className="header-action-icon"
                    />
                    <span className="header-action-text">
                      {HEADER_CONSTANTS.LOGOUT.BUTTON_TEXT}
                    </span>
                  </button>
                );
              } else {
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
              }
            }

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
            {HEADER_CONSTANTS.NAV_MENU.map((item) => {
              const isActive =
                location.pathname + location.search === item.path;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`header-nav-link ${
                    isActive ? "header-nav-link-active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
