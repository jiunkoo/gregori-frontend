import React from "react";
import { MYPAGE_CONSTANTS } from "@constants";
import "@styles/mypage-sidebar.css";

const MyPageSidebar: React.FC = () => {
  return (
    <div className="mypage-sidebar">
      <div className="mypage-user-info">
        <div className="mypage-user-name">{MYPAGE_CONSTANTS.USER.NAME}</div>
      </div>

      {/* 나의 쇼핑 정보 */}
      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.SHOPPING_INFO}
        </div>
        <div className="mypage-nav-divider"></div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.ORDER_DELIVERY}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.CANCEL_EXCHANGE_RETURN}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.PRODUCT_REVIEW}
        </div>
      </div>

      {/* 나의 계정 설정 */}
      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.ACCOUNT_SETTINGS}
        </div>
        <div className="mypage-nav-divider"></div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.MEMBER_INFO_EDIT}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.MEMBERSHIP_GRADE}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.COUPON}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.MILEAGE}
        </div>
      </div>

      {/* 고객센터 */}
      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.CUSTOMER_SERVICE}
        </div>
        <div className="mypage-nav-divider"></div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.INQUIRY}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.PRODUCT_QA}
        </div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.NOTICE}
        </div>
        <div className="mypage-nav-item">{MYPAGE_CONSTANTS.NAV_ITEMS.FAQ}</div>
        <div className="mypage-nav-item">
          {MYPAGE_CONSTANTS.NAV_ITEMS.CUSTOMER_VOICE}
        </div>
      </div>
    </div>
  );
};

export default MyPageSidebar;
