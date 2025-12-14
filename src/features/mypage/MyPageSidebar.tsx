import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { orderAPI } from "@api/order";
import { useAuthStore } from "@stores";

import { toResult } from "@/utils/result";
import { MYPAGE_SIDEBAR_CONSTANTS } from "@/features/mypage/MyPageSidebar.constants";
import "@/features/mypage/MyPageSidebar.css";

const MyPageSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [hasOrders, setHasOrders] = useState<boolean | null>(null);
  const [isCheckingOrders, setIsCheckingOrders] = useState(false);

  const handleOrderDeliveryClick = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    if (isCheckingOrders) return;

    setIsCheckingOrders(true);

    if (hasOrders !== null) {
      if (hasOrders) {
        navigate("/orderlist");
      } else {
        window.alert(MYPAGE_SIDEBAR_CONSTANTS.ORDER_CHECK.NO_ORDERS_MESSAGE);
      }
      setIsCheckingOrders(false);
      return;
    }

    const ordersResult = await toResult(orderAPI.getOrders(1));

    setIsCheckingOrders(false);

    if (!ordersResult.ok) {
      window.alert(MYPAGE_SIDEBAR_CONSTANTS.ORDER_CHECK.ERROR_MESSAGE);
      return;
    }

    const data = ordersResult.value;
    const exists = data.length > 0;
    setHasOrders(exists);

    if (!exists) {
      window.alert(MYPAGE_SIDEBAR_CONSTANTS.ORDER_CHECK.NO_ORDERS_MESSAGE);
      return;
    }

    navigate("/orderlist");
  };

  const displayName =
    (user?.name && user.name.trim()) || MYPAGE_SIDEBAR_CONSTANTS.USER.NAME;

  return (
    <div className="mypage-sidebar">
      <div className="mypage-user-info">
        <div className="mypage-user-name">{displayName}</div>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_SIDEBAR_CONSTANTS.NAVIGATION.SHOPPING_INFO}
        </div>
        <NavLink
          to="/orderlist"
          onClick={handleOrderDeliveryClick}
          className={({ isActive }) =>
            "mypage-nav-item mypage-nav-item--order-delivery" +
            (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_SIDEBAR_CONSTANTS.NAV_ITEMS.ORDER_DELIVERY}
        </NavLink>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_SIDEBAR_CONSTANTS.NAVIGATION.ACCOUNT_SETTINGS}
        </div>
        <NavLink
          to="/mypage/profile"
          className={({ isActive }) =>
            "mypage-nav-item" + (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_SIDEBAR_CONSTANTS.NAV_ITEMS.MEMBER_INFO_EDIT}
        </NavLink>
        <NavLink
          to="/mypage/password"
          className={({ isActive }) =>
            "mypage-nav-item" + (isActive ? " mypage-nav-item--active" : "")
          }
        >
          {MYPAGE_SIDEBAR_CONSTANTS.NAV_ITEMS.PASSWORD_EDIT}
        </NavLink>
      </div>
    </div>
  );
};

export default MyPageSidebar;
