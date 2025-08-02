import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import OrderList from './pages/orders/OrderList';
import { useAuthStore } from './stores/authStore';

// 인증이 필요한 라우트를 위한 래퍼 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Layout><ProductList /></Layout>} />
        <Route path="/products/:productId" element={<Layout><ProductDetail /></Layout>} />
        
        {/* 인증이 필요한 라우트 */}
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Layout><OrderList /></Layout>
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