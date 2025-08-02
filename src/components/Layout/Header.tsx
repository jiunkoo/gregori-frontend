import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authAPI } from '../../api/auth';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout, hasAuthority } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.signOut();
      logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              Gregori
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary-600">
              상품
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600">
                  주문
                </Link>
                {hasAuthority('SELLING_MEMBER') && (
                  <Link to="/seller" className="text-gray-700 hover:text-primary-600">
                    판매자
                  </Link>
                )}
                {hasAuthority('ADMIN_MEMBER') && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600">
                    관리자
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">안녕하세요, {user?.name}님</span>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600"
                >
                  프로필
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 