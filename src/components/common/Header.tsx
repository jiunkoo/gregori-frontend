import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch = true }) => {
  return (
    <>
      {/* 상단 배너 */}
      <div className="bg-black h-8 flex items-center justify-center">
        <div className="text-white text-xl font-semibold flex items-center" style={{fontFamily: 'Nanum Gothic'}}>
          GREGORI 신규 회원 <span className="text-red-500 font-bold">20%</span> 파격 할인 쿠폰
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* 헤더 */}
      <div className="bg-white h-16 flex items-center justify-between px-4 border-b">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <div className="text-4xl font-bold flex items-center">
            <span style={{color: '#000000'}}>G</span>
            <span style={{color: '#000000'}}>R</span>
            <span style={{color: '#000000'}}>E</span>
            <span style={{color: '#000000'}}>G</span>
            <span style={{color: '#000000'}}>O</span>
            <span style={{color: '#000000'}}>R</span>
            <span style={{color: '#000000'}}>I</span>
          </div>
        </Link>
        
        {/* 중앙 검색창 */}
        {showSearch && (
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="검색"
                className="w-full pl-16 pr-4 py-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#000000"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#000000"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#000000"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#000000"/>
                </svg>
                <div className="w-px h-6 bg-black mx-2"></div>
              </div>
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="w-6 h-6 text-gray-400 hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:inline text-sm" style={{fontFamily: 'Nanum Gothic'}}>마이페이지</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden lg:inline text-sm" style={{fontFamily: 'Nanum Gothic'}}>찜목록</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden lg:inline text-sm" style={{fontFamily: 'Nanum Gothic'}}>장바구니</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="hidden lg:inline text-sm" style={{fontFamily: 'Nanum Gothic'}}>로그인</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
