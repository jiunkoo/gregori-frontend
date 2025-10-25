import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/icons/SvgIcon';
import '@/styles/mypage.css';

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
                  <Icon name="arrowRight" size={10} className="mypage-grade-arrow" color="white" />
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
                <Icon name="arrowRight" size={10} className="mypage-grade-arrow" color="white" />
              </div>
              <div className="mypage-grade-divider"></div>
              <div className="mypage-grade-item">
                <div className="mypage-grade-content">
                  <div className="mypage-grade-label">마일리지</div>
                  <div className="mypage-grade-value">0</div>
                </div>
                <Icon name="arrowRight" size={10} className="mypage-grade-arrow" color="white" />
              </div>
            </div>

            {/* 최근 주문 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">최근 주문</div>
                <Link to="/orderlist" className="mypage-section-more">
                  <div className="mypage-section-more-text">더보기</div>
                  <Icon name="arrowRight" size={10} className="mypage-section-more-arrow" color="black" />
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
                  <Icon name="image" size={80} />
                </div>
              </div>
            </div>

            {/* 찜 목록 */}
            <div className="mypage-section">
              <div className="mypage-section-header">
                <div className="mypage-section-title">찜 목록</div>
                <div className="mypage-section-more">
                  <div className="mypage-section-more-text">더보기</div>
                  <Icon name="arrowRight" size={10} className="mypage-section-more-arrow" color="black" />
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
                      <Icon name="image" size={150} />
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