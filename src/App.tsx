import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ProductList from "@pages/products/ProductList";
import ProductDetail from "@pages/products/ProductDetail";
import OrderListPage from "@pages/orders/OrderList";
import OrderDetail from "@pages/orders/OrderDetail";
import MyPage from "@pages/MyPage";
import OrderComplete from "@pages/orders/OrderComplete";
import OrderConfirm from "@pages/orders/OrderConfirm";
import Order from "@pages/orders/Order";
import { useAuthStore } from "@stores/authStore";
import { memberAPI } from "@api/member";

// 인증이 필요한 라우트를 위한 래퍼 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// 앱 시작 시 로그인 상태를 확인하는 컴포넌트
const AuthInitializer: React.FC = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const userInfo = await memberAPI.getMember();
        setUser(userInfo);
      } catch (error) {
        console.log("로그인되지 않은 상태");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [setUser, setLoading]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthInitializer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 마이페이지 - 주문 목록 / 주문 상세 (인증 필요) */}
        <Route
          path="/orderlist"
          element={
            <ProtectedRoute>
              <OrderListPage />
            </ProtectedRoute>
          }
        />
        <Route path="/orderdetail/:orderId" element={<OrderDetail />} />

        {/* 404 페이지 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
