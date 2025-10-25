import { Link } from 'react-router-dom';
import '../styles/orderlist.css';

const OrderList = () => {
  return (
    <div className="orderlist-wrapper">
      <div className="orderlist-container">
        {/* 좌측 내비게이션 바 */}
        <div className="orderlist-sidebar">
          <div className="orderlist-user-info">
            <div className="orderlist-brand">KOUBIT</div>
          </div>
          
          <div className="orderlist-nav-title">나의 쇼핑 정보</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/orderlist" className="orderlist-nav-item">주문배송조회</Link>
          <Link to="/orderlist" className="orderlist-nav-item">취소/교환/반품 내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">상품 리뷰</Link>
          
          <div className="orderlist-nav-title">나의 계정 설정</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/mypage" className="orderlist-nav-item">회원정보수정</Link>
          <Link to="/mypage" className="orderlist-nav-item">멤버십 등급</Link>
          <Link to="/mypage" className="orderlist-nav-item">쿠폰</Link>
          <Link to="/mypage" className="orderlist-nav-item">마일리지</Link>
          
          <div className="orderlist-nav-title">고객센터</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/orderlist" className="orderlist-nav-item">1:1 문의내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">상품 Q&A내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">공지사항</Link>
          <Link to="/orderlist" className="orderlist-nav-item">FAQ</Link>
          <Link to="/orderlist" className="orderlist-nav-item">고객의 소리</Link>
        </div>

        {/* 기본 정보 영역 */}
        <div className="orderlist-content">
          {/* 등급 영역 */}
          <div className="orderlist-grade-section">
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">멤버십 등급</div>
                <div className="orderlist-grade-value">GREEN</div>
              </div>
              <svg className="orderlist-grade-arrow" viewBox="0 0 10 20" fill="none">
                <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="white"/>
              </svg>
            </div>
            <div className="orderlist-grade-divider"></div>
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">사용가능쿠폰</div>
                <div className="orderlist-grade-value">4</div>
              </div>
              <svg className="orderlist-grade-arrow" viewBox="0 0 10 20" fill="none">
                <path d="M0 0.209866L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.041441C0.134444 -0.0611916 0 0.0388107 0 0.209866Z" fill="white"/>
              </svg>
            </div>
            <div className="orderlist-grade-divider"></div>
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">마일리지</div>
                <div className="orderlist-grade-value">0</div>
              </div>
              <svg className="orderlist-grade-arrow" viewBox="0 0 10 20" fill="none">
                <path d="M0 0.209864L0 2.18358C0 2.31779 0.0454204 2.44411 0.11991 2.52306L7.23455 9.9995L0.11991 17.4759C0.0454204 17.5549 0 17.6812 0 17.8154L0 19.7891C0 19.9602 0.134444 20.0602 0.230735 19.9602L9.06226 10.6811C9.38202 10.3442 9.38202 9.65476 9.06226 9.32054L0.230735 0.0414391C0.134444 -0.0611935 0 0.0388088 0 0.209864Z" fill="white"/>
              </svg>
            </div>
            <div className="orderlist-grade-benefit">
              <div className="orderlist-grade-benefit-button">할인 혜택 보기</div>
            </div>
          </div>

          {/* 주문 상품 정보 섹션 */}
          <div className="orderlist-section">
            <div className="orderlist-section-header">
              <div className="orderlist-section-title">주문 상품 정보</div>
            </div>
            <div className="orderlist-section-divider"></div>
            
            {/* 주문 정보 */}
            <div className="orderlist-order-info">
              <div className="orderlist-order-date">
                주문일자 <span className="orderlist-order-date-value">2023-01-01</span>     주문번호 <span className="orderlist-order-number">ORD20230101-1111111</span>
              </div>
            </div>
            <div className="orderlist-section-divider"></div>
            
            {/* 주문 상품 상세 */}
            <Link to="/orderdetail" className="orderlist-order-detail">
              <div className="orderlist-order-product">
                <img className="orderlist-order-image" src="/images/products/watch.jpg" alt="DIGITAL WATCH" />
                <div className="orderlist-order-info">
                  <div className="orderlist-order-brand">Apple</div>
                  <div className="orderlist-order-name">DIGITAL WATCH</div>
                  <div className="orderlist-order-option">옵션: [사이즈] M, [색상] Navy</div>
                  <div className="orderlist-order-price">324,240원</div>
                </div>
              </div>
              
              <div className="orderlist-order-quantity">1개</div>
              <div className="orderlist-order-shipping">배송비 <br/>3,000원</div>
              <div className="orderlist-order-status">결제 완료</div>
              <div className="orderlist-order-delivery">2023.01.31 이내<br/>출고 예정</div>
              
              <div className="orderlist-order-actions">
                <button className="orderlist-order-action-button">취소 접수</button>
                <button className="orderlist-order-action-button">1:1 문의</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
