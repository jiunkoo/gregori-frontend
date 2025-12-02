import React from "react";
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
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.ORDER_DELIVERY}
        </div>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.ACCOUNT_SETTINGS}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.MEMBER_INFO_EDIT}
        </div>
      </div>
    </div>
  );
};

export default MyPageSidebar;
