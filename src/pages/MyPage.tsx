import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mypage.css';

const MyPage: React.FC = () => {
  return (
    <div className="mypage-wrapper">
        <div className="mypage-container">
          {/* 좌측 내비게이션 바 */}
          <div className="mypage-sidebar">
            <div className="mypage-user-info">
              <div className="mypage-user-name">KOUBIT</div>
            </div>
            
            {/* 나의 쇼핑 정보 */}
            <div className="mypage-nav-section">
              <div className="mypage-nav-title">나의 쇼핑 정보</div>
              <div className="mypage-nav-divider"></div>
              <div className="mypage-nav-item">주문배송조회</div>
              <div className="mypage-nav-item">취소/교환/반품 내역</div>
              <div className="mypage-nav-item">상품 리뷰</div>
            </div>

            {/* 나의 계정 설정 */}
            <div className="mypage-nav-section">
              <div className="mypage-nav-title">나의 계정 설정</div>
              <div className="mypage-nav-divider"></div>
              <div className="mypage-nav-item">회원정보수정</div>
              <div className="mypage-nav-item">멤버십 등급</div>
              <div className="mypage-nav-item">쿠폰</div>
              <div className="mypage-nav-item">마일리지</div>
            </div>

            {/* 고객센터 */}
            <div className="mypage-nav-section">
              <div className="mypage-nav-title">고객센터</div>
              <div className="mypage-nav-divider"></div>
              <div className="mypage-nav-item">1:1 문의내역</div>
              <div className="mypage-nav-item">상품 Q&A내역</div>
              <div className="mypage-nav-item">공지사항</div>
              <div className="mypage-nav-item">FAQ</div>
              <div className="mypage-nav-item">고객의 소리</div>
            </div>
          </div>

          {/* 기본 정보 영역 */}
          <div className="mypage-content">
            {/* 등급 영역 */}
            <div className="mypage-grade-section">
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">멤버십 등급</div>
                  <svg className="mypage-grade-arrow" viewBox="0 0 10 20" fill="none">
                  <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="white"/>
                  </svg>
                  <div className="mypage-grade-content">
                    <div className="mypage-grade-value">GREEN</div>
                  </div>
                </div>
                <div className="mypage-grade-benefit">
                  <div className="mypage-grade-benefit-button">할인 혜택 보기</div>
                </div>
              </div>
              <div className="mypage-grade-divider"></div>
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">사용가능쿠폰</div>
                  <div className="mypage-grade-value">4</div>
                </div>
                <svg className="mypage-grade-arrow" viewBox="0 0 10 20" fill="none">
                  <path d="M0 0.209866L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.041441C0.134444 -0.0611916 0 0.0388107 0 0.209866Z" fill="white"/>
                </svg>
              </div>
              <div className="mypage-grade-divider"></div>
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">마일리지</div>
                  <div className="mypage-grade-value">0</div>
                </div>
                <svg className="mypage-grade-arrow" viewBox="0 0 10 20" fill="none">
                  <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="white"/>
                </svg>
              </div>
            </div>

            {/* 최근 주문 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">최근 주문</div>
                <Link to="/orderlist" className="mypage-section-more">
                  <div className="mypage-section-more-text">더보기</div>
                  <svg className="mypage-section-more-arrow" viewBox="0 0 10 20" fill="none">
                    <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="black"/>
                  </svg>
                </Link>
              </div>
              <div className="mypage-section-divider"></div>
              
              <div className="mypage-order-item">
                <div className="mypage-order-date">2023.01.01</div>
                <div className="mypage-order-info">
                  <div className="mypage-order-product">DIGITAL WATCH 외 1건</div>
                  <div className="mypage-order-price">912,000원</div>
                </div>
                <div className="mypage-order-image">
                  <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 찜 목록 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">찜 목록</div>
                <div className="mypage-section-more">
                  <div className="mypage-section-more-text">더보기</div>
                  <svg className="mypage-section-more-arrow" viewBox="0 0 10 20" fill="none">
                    <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="black"/>
                  </svg>
                </div>
              </div>
              <div className="mypage-section-divider"></div>
              
              <div className="mypage-wishlist-tab">
                <div className="mypage-wishlist-tab-item">상품</div>
              </div>
              
              <div className="mypage-wishlist-grid">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="mypage-wishlist-item">
                    <div className="mypage-wishlist-image">
                      <svg width="150" height="150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="mypage-wishlist-info">
                      <div className="mypage-wishlist-brand">Apple</div>
                      <div className="mypage-wishlist-name">DIGITAL WATCH</div>
                      <div className="mypage-wishlist-price">324,240원</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 브랜드 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">브랜드</div>
              </div>
              <div className="mypage-section-divider"></div>
              
              <div className="mypage-brand-empty">
                <div className="mypage-brand-empty-text">브랜드 찜 내역이 없습니다.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyPage;