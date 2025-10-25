import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icons/SvgIcon';
import '../../styles/header.css';

interface HeaderProps {
  showSearch?: boolean;
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = true, showNav = false }) => {
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <>
      <div className="header-banner">
        <div className="header-banner-text">
          GREGORI 신규 회원 <span className="header-banner-discount">20%</span> 파격 할인 쿠폰
          <Icon name="arrow" size={20} className="header-banner-icon" />
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
                <Icon name="google" size={32} className="header-google-icon" />
                <div className="header-search-divider"></div>
              </div>
              <button type="submit" className="header-search-button">
                <Icon name="search" size={24} className="header-search-icon" />
              </button>
            </div>
          </div>
        )}

        <div className="header-actions">
          <Link to="/mypage" className="header-action-item">
            <Icon name="user" size={24} className="header-action-icon" />
            <span className="header-action-text hidden-lg">마이페이지</span>
          </Link>
          <div className="header-action-item">
            <Icon name="heart" size={24} className="header-action-icon" />
            <span className="header-action-text hidden-lg">찜목록</span>
          </div>
          <Link to="/cart" className="header-action-item">
            <Icon name="cart" size={24} className="header-action-icon" />
            <span className="header-action-text hidden-lg">장바구니</span>
          </Link>
          <Link to="/login" className="header-action-item">
            <Icon name="login" size={24} className="header-action-icon" />
            <span className="header-action-text hidden-lg">로그인</span>
          </Link>
        </div>
      </div>

      {showNav && (
        <div className="header-nav">
          <nav className="header-nav-list">
            <Link to="/products" className="header-nav-link header-nav-link-active">인기</Link>
            <Link to="/products?category=chicken" className="header-nav-link">치킨</Link>
            <Link to="/products?category=pizza" className="header-nav-link">피자</Link>
            <Link to="/products?category=korean" className="header-nav-link">한식</Link>
            <Link to="/products?category=chinese" className="header-nav-link">중식</Link>
            <Link to="/products?category=western" className="header-nav-link">양식</Link>
            <Link to="/products?category=japanese" className="header-nav-link">일식</Link>
            <Link to="/products?category=bunsik" className="header-nav-link">분식</Link>
            <Link to="/products?category=cafe" className="header-nav-link">카페</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
