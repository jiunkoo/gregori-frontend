import React from "react";
import { NavLink } from "react-router-dom";
import { MYPAGE_CONSTANTS } from "@constants";
import "@styles/mypage-sidebar.css";

const MyPageSidebar: React.FC = () => {
  return (
    <div className="mypage-sidebar">
      <div className="mypage-user-info">
        <div className="mypage-user-name">{MYPAGE_CONSTANTS.USER.NAME}</div>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.SHOPPING_INFO}
        </div>
        <NavLink
          to="/orderlist"
          className={({ isActive }) =>
            "mypage-nav-item" + (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_CONSTANTS.NAV_ITEMS.ORDER_DELIVERY}
        </NavLink>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.ACCOUNT_SETTINGS}
        </div>
        <NavLink
          to="/mypage/profile"
          className={({ isActive }) =>
            "mypage-nav-item" + (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_CONSTANTS.NAV_ITEMS.MEMBER_INFO_EDIT}
        </NavLink>
        <NavLink
          to="/mypage/password"
          className={({ isActive }) =>
            "mypage-nav-item" + (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_CONSTANTS.NAV_ITEMS.PASSWORD_EDIT}
        </NavLink>
      </div>
    </div>
  );
};

export default MyPageSidebar;
