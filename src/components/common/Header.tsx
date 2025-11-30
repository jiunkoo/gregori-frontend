import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@components/icons/SvgIcon";
import { HEADER_CONSTANTS } from "@constants/header";
import { useAuthStore } from "@stores";
import { authAPI } from "@api";
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
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

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
              <button type="submit" className="header-search-button">
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
                    onClick={async () => {
                      try {
                        await authAPI.signOut();
                      } catch (error) {
                        console.error(
                          HEADER_CONSTANTS.LOGOUT.ERROR_MESSAGE,
                          error
                        );
                      } finally {
                        await logout();
                        navigate("/");
                      }
                    }}
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
