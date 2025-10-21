import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import '../../styles/header.css';

interface HeaderProps {
  showSearch?: boolean;
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = true, showNav = false }) => {
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
    <>
      <div className="header-banner">
        <div className="header-banner-text">
          GREGORI 신규 회원 <span className="header-banner-discount">20%</span> 파격 할인 쿠폰
          <svg className="header-banner-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="header-main">
        <Link to="/" className="header-logo">
          <div className="header-logo-text">GREGORI</div>
        </Link>
        
        {showSearch && (
          <div className="header-search-container">
            <div className="header-search-wrapper">
              <input
                type="text"
                placeholder={showNav ? "상품을 검색해보세요..." : "검색"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <div className="header-search-icon-wrapper">
                <svg className="header-google-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000000"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000000"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#000000"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000000"/>
                </svg>
                <div className="header-search-divider"></div>
              </div>
              <button type="submit" className="header-search-button">
                <svg className="header-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="header-actions">
          {showNav ? (
            <>
              <Link to="/cart" className="header-cart-link" title="장바구니">
                <svg className="header-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="header-cart-badge">0</span>
              </Link>

              {isAuthenticated ? (
                <div className="header-user-menu">
                  <button className="header-user-button">
                    <div className="header-user-avatar">
                      <svg className="header-user-avatar-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="header-user-name">{user?.name}님</span>
                    <svg className="header-user-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="header-dropdown">
                    <div className="header-dropdown-content">
                      <Link to="/mypage" className="header-dropdown-link">
                        <svg className="header-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        마이페이지
                      </Link>
                      <Link to="/orders" className="header-dropdown-link">
                        <svg className="header-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        주문 내역
                      </Link>
                      <hr className="header-dropdown-divider" />
                      <button onClick={handleLogout} className="header-dropdown-button">
                        <svg className="header-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/login" className="header-auth-link">로그인</Link>
                  <Link to="/register" className="header-register-button">회원가입</Link>
                </>
              )}
            </>
          ) : (
            <>
              <div className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="header-action-text hidden-lg">마이페이지</span>
              </div>
              <div className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="header-action-text hidden-lg">찜목록</span>
              </div>
              <div className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="header-action-text hidden-lg">장바구니</span>
              </div>
              <Link to="/login" className="header-action-item">
                <svg className="header-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="header-action-text hidden-lg">로그인</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {showNav && (
        <div className="header-nav">
          <nav className="header-nav-list">
            <Link to="/products" className="header-nav-link">전체 상품</Link>
            <Link to="/products?category=electronics" className="header-nav-link">전자제품</Link>
            <Link to="/products?category=fashion" className="header-nav-link">패션</Link>
            <Link to="/products?category=home" className="header-nav-link">홈&리빙</Link>
            <Link to="/products?category=food" className="header-nav-link">식품</Link>
            <Link to="/products?category=beauty" className="header-nav-link">뷰티</Link>
            <Link to="/products?category=sports" className="header-nav-link">스포츠</Link>
            <Link to="/products?category=books" className="header-nav-link">도서</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
