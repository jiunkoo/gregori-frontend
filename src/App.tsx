import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";
import ProductList from "@pages/products/ProductList";
import ProductDetail from "@pages/products/ProductDetail";
import OrderListPage from "@pages/orders/OrderList";
import OrderDetail from "@pages/orders/OrderDetail";
import MyPage from "@pages/MyPage";
import Cart from "@pages/Cart";
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
        // 로그인되지 않은 상태이므로 아무것도 하지 않음
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
        {/* 공개 라우트 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductList />
            </Layout>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/order"
          element={
            <Layout>
              <Order />
            </Layout>
          }
        />
        <Route path="/order-confirm" element={<OrderConfirm />} />
        <Route path="/order-complete" element={<OrderComplete />} />
        <Route
          path="/mypage"
          element={
            <Layout>
              <MyPage />
            </Layout>
          }
        />
        <Route
          path="/orderlist"
          element={
            <Layout>
              <OrderListPage />
            </Layout>
          }
        />
        <Route
          path="/orderdetail"
          element={
            <Layout>
              <OrderDetail />
            </Layout>
          }
        />

        {/* 인증이 필요한 라우트 */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderListPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 페이지 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
