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
import OrderConfirm from "@pages/orders/OrderConfirm";
import Order from "@pages/orders/Order";
import MyPageProfileEdit from "@pages/MyPageProfileEdit";
import { useAuthStore } from "@stores/authStore";
import { memberAPI } from "@api/member";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AuthInitializer: React.FC = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userInfo = await memberAPI.getMember();
        setUser(userInfo);
      } catch {}
    };

    checkAuthStatus();
  }, [setUser]);

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
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirm"
          element={
            <ProtectedRoute>
              <OrderConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/profile"
          element={
            <ProtectedRoute>
              <MyPageProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderlist"
          element={
            <ProtectedRoute>
              <OrderListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderdetail/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
