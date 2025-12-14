import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MYPAGE_CONSTANTS } from "@/features/mypage/MyPage.constants";
import { orderAPI } from "@api/order";
import { useAuthStore } from "@stores";
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

    try {
      setIsCheckingOrders(true);

      if (hasOrders !== null) {
        if (hasOrders) {
          navigate("/orderlist");
        } else {
          window.alert("주문한 상품이 없습니다.");
        }
        return;
      }

      const data = await orderAPI.getOrders(1);
      const exists = data.length > 0;
      setHasOrders(exists);

      if (!exists) {
        window.alert("주문한 상품이 없습니다.");
        return;
      }

      navigate("/orderlist");
    } catch (error) {
      console.error("주문 목록 확인 실패:", error);
      window.alert("주문 정보를 확인하는 중 오류가 발생했습니다.");
    } finally {
      setIsCheckingOrders(false);
    }
  };

  const displayName =
    (user?.name && user.name.trim()) || MYPAGE_CONSTANTS.USER.NAME;

  return (
    <div className="mypage-sidebar">
      <div className="mypage-user-info">
        <div className="mypage-user-name">{displayName}</div>
      </div>

      <div className="mypage-nav-section">
        <div className="mypage-nav-title">
          {MYPAGE_CONSTANTS.NAVIGATION.SHOPPING_INFO}
        </div>
        <NavLink
          to="/orderlist"
          onClick={handleOrderDeliveryClick}
          className={({ isActive }) =>
            "mypage-nav-item mypage-nav-item--order-delivery" +
            (isActive ? " mypage-nav-item--active" : "")
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
