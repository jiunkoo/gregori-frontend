import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "@/features/Home";
import Login from "@/features/auth/Login";
import Register from "@/features/auth/Register";
import ProductList from "@/features/products/ProductList";
import ProductDetail from "@/features/products/ProductDetail";
import OrderListPage from "@/features/orders/OrderList";
import OrderDetail from "@/features/orders/OrderDetail";
import MyPage from "@/features/mypage/MyPage";
import OrderConfirm from "@/features/orders/OrderConfirm";
import Order from "@/features/orders/Order";
import MyPageProfileEdit from "@/features/mypage/MyPageProfileEdit";
import MyPagePasswordEdit from "@/features/mypage/MyPagePasswordEdit";
import { useAuthStore } from "@stores/authStore";
import { memberAPI } from "@api/member";

import { toResult } from "@/utils/result";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();

  if (!isAuthChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AuthInitializer: React.FC = () => {
  const { setUser, setAuthChecked } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await toResult(memberAPI.getMember());

      if (!result.ok) {
        setAuthChecked(true);
        return;
      }

      setUser(result.value);
    };

    checkAuthStatus();
  }, [setUser, setAuthChecked]);

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
          path="/mypage/password"
          element={
            <ProtectedRoute>
              <MyPagePasswordEdit />
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
