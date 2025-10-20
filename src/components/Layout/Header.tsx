import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white shadow-soft border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
                                    <Link to="/" className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-900">GREGORI</span>
                        </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="상품을 검색해보세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <span className="text-2xl font-bold text-gray-900">G</span>
                              <span className="text-gray-400 mx-2">|</span>
                            </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Cart Icon - Always visible */}
                                    <Link
                          to="/cart"
                          className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors hover:bg-gray-100"
                          title="장바구니"
                        >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                0
              </span>
            </Link>

            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <div className="relative group">
                                                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors p-2 hover:bg-gray-100">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="hidden md:block text-sm font-medium">{user?.name}님</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-medium border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link
                        to="/mypage"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        마이페이지
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        주문 내역
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                                            <Link
                              to="/login"
                              className="text-gray-700 hover:text-primary-600 transition-colors font-medium px-3 py-2 hover:bg-gray-100"
                            >
                              로그인
                            </Link>
                            <Link
                              to="/register"
                              className="bg-primary-600 text-white px-4 py-2 hover:bg-primary-700 transition-all duration-200 font-medium shadow-soft"
                            >
                              회원가입
                            </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-center h-12 border-t border-gray-100">
          <nav className="flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              전체 상품
            </Link>
            <Link 
              to="/products?category=electronics" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              전자제품
            </Link>
            <Link 
              to="/products?category=fashion" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              패션
            </Link>
            <Link 
              to="/products?category=home" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              홈&리빙
            </Link>
            <Link 
              to="/products?category=food" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              식품
            </Link>
            <Link 
              to="/products?category=beauty" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              뷰티
            </Link>
            <Link 
              to="/products?category=sports" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              스포츠
            </Link>
            <Link 
              to="/products?category=books" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              도서
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 