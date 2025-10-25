import { Link } from 'react-router-dom';
import Icon from '@components/icons/SvgIcon';
import '@styles/orderdetail.css';

const OrderDetail = () => {
  return (
    <div className="orderdetail-wrapper">
      <div className="orderdetail-container">
        {/* 좌측 내비게이션 바 */}
        <div className="orderdetail-sidebar">
          <div className="orderdetail-user-info">
            <div className="orderdetail-brand">KOUBIT</div>
          </div>

          <div className="orderdetail-nav-title">나의 쇼핑 정보</div>
          <div className="orderdetail-nav-divider"></div>

          <Link to="/orderlist" className="orderdetail-nav-item">주문배송조회</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">취소/교환/반품 내역</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">상품 리뷰</Link>

          <div className="orderdetail-nav-title">나의 계정 설정</div>
          <div className="orderdetail-nav-divider"></div>

          <Link to="/mypage" className="orderdetail-nav-item">회원정보수정</Link>
          <Link to="/mypage" className="orderdetail-nav-item">멤버십 등급</Link>
          <Link to="/mypage" className="orderdetail-nav-item">쿠폰</Link>
          <Link to="/mypage" className="orderdetail-nav-item">마일리지</Link>

          <div className="orderdetail-nav-title">고객센터</div>
          <div className="orderdetail-nav-divider"></div>

          <Link to="/orderlist" className="orderdetail-nav-item">1:1 문의내역</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">상품 Q&A내역</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">공지사항</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">FAQ</Link>
          <Link to="/orderlist" className="orderdetail-nav-item">고객의 소리</Link>
        </div>

        {/* 기본 정보 영역 */}
        <div className="orderdetail-content">
          {/* 등급 영역 */}
          <div className="orderdetail-grade-section">
            <div className="orderdetail-grade-item">
              <div className="orderdetail-grade-content">
                <div className="orderdetail-grade-label">멤버십 등급</div>
                <div className="orderdetail-grade-value">GREEN</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderdetail-grade-arrow" color="white" />
            </div>
            <div className="orderdetail-grade-divider"></div>
            <div className="orderdetail-grade-item">
              <div className="orderdetail-grade-content">
                <div className="orderdetail-grade-label">사용가능쿠폰</div>
                <div className="orderdetail-grade-value">4</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderdetail-grade-arrow" color="white" />
            </div>
            <div className="orderdetail-grade-divider"></div>
            <div className="orderdetail-grade-item">
              <div className="orderdetail-grade-content">
                <div className="orderdetail-grade-label">마일리지</div>
                <div className="orderdetail-grade-value">0</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderdetail-grade-arrow" color="white" />
            </div>
            <div className="orderdetail-grade-benefit">
              <div className="orderdetail-grade-benefit-button">할인 혜택 보기</div>
            </div>
          </div>

          {/* 주문 상세 내역 섹션 */}
          <div className="orderdetail-section">
            <div className="orderdetail-section-header">
              <div className="orderdetail-section-title">주문 상세 내역</div>
            </div>
            <div className="orderdetail-section-divider"></div>

            {/* 주문 상태 진행 단계 */}
            <div className="orderdetail-progress">
              <div className="orderdetail-progress-item">
                <div className="orderdetail-progress-circle">0</div>
                <div className="orderdetail-progress-label">입금대기</div>
              </div>
              <div className="orderdetail-progress-arrow"></div>
              <div className="orderdetail-progress-item active">
                <div className="orderdetail-progress-circle">1</div>
                <div className="orderdetail-progress-label">결제완료</div>
              </div>
              <div className="orderdetail-progress-arrow"></div>
              <div className="orderdetail-progress-item">
                <div className="orderdetail-progress-circle">0</div>
                <div className="orderdetail-progress-label">상품준비중</div>
              </div>
              <div className="orderdetail-progress-arrow"></div>
              <div className="orderdetail-progress-item">
                <div className="orderdetail-progress-circle">0</div>
                <div className="orderdetail-progress-label">배송시작</div>
              </div>
              <div className="orderdetail-progress-arrow"></div>
              <div className="orderdetail-progress-item">
                <div className="orderdetail-progress-circle">0</div>
                <div className="orderdetail-progress-label">배송중</div>
              </div>
              <div className="orderdetail-progress-arrow"></div>
              <div className="orderdetail-progress-item">
                <div className="orderdetail-progress-circle">0</div>
                <div className="orderdetail-progress-label">배송완료</div>
              </div>
            </div>
          </div>

          {/* 주문 상품 정보 섹션 */}
          <div className="orderdetail-section">
            <div className="orderdetail-section-header">
              <div className="orderdetail-section-title">주문 상품 정보</div>
            </div>
            <div className="orderdetail-section-divider"></div>

            {/* 주문 정보 */}
            <div className="orderdetail-order-info">
              <div className="orderdetail-order-date">
                주문일자 <span className="orderdetail-order-date-value">2023-01-01</span>     주문번호 <span className="orderdetail-order-number">ORD20230101-1111111</span>
              </div>
            </div>
            <div className="orderdetail-section-divider"></div>

            {/* 주문 상품 상세 */}
            <div className="orderdetail-order-detail">
              <div className="orderdetail-order-product">
                <img className="orderdetail-order-image" src="/images/products/watch.jpg" alt="DIGITAL WATCH" />
                <div className="orderdetail-order-info">
                  <div className="orderdetail-order-brand">Apple</div>
                  <div className="orderdetail-order-name">DIGITAL WATCH</div>
                  <div className="orderdetail-order-option">옵션: [사이즈] M, [색상] Navy</div>
                  <div className="orderdetail-order-price">324,240원</div>
                </div>
              </div>

              <div className="orderdetail-order-quantity">1개</div>
              <div className="orderdetail-order-shipping">배송비 <br/>3,000원</div>
              <div className="orderdetail-order-status">결제 완료</div>
              <div className="orderdetail-order-delivery">2023.01.31 이내<br/>출고 예정</div>

              <div className="orderdetail-order-actions">
                <button className="orderdetail-order-action-button">취소 접수</button>
                <button className="orderdetail-order-action-button">1:1 문의</button>
              </div>
            </div>

            {/* 두 번째 주문 상품 */}
            <div className="orderdetail-section-divider"></div>
            <div className="orderdetail-order-detail">
              <div className="orderdetail-order-product">
                <img className="orderdetail-order-image" src="/images/products/watch.jpg" alt="DIGITAL WATCH" />
                <div className="orderdetail-order-info">
                  <div className="orderdetail-order-brand">Banana</div>
                  <div className="orderdetail-order-name">DIGITAL WATCH</div>
                  <div className="orderdetail-order-option">옵션: [사이즈] M, [색상] Navy</div>
                  <div className="orderdetail-order-price">648,480원</div>
                </div>
              </div>

              <div className="orderdetail-order-quantity">2개</div>
              <div className="orderdetail-order-shipping">배송비 <br/>3,000원</div>
              <div className="orderdetail-order-status">결제 완료</div>
              <div className="orderdetail-order-delivery">2023.01.31 이내<br/>출고 예정</div>

              <div className="orderdetail-order-actions">
                <button className="orderdetail-order-action-button">취소 접수</button>
                <button className="orderdetail-order-action-button">1:1 문의</button>
              </div>
            </div>
          </div>

          {/* 주문자 정보 섹션 */}
          <div className="orderdetail-section">
            <div className="orderdetail-section-header">
              <div className="orderdetail-section-title">주문자 정보</div>
            </div>
            <div className="orderdetail-section-divider"></div>

            <div className="orderdetail-customer-info">
              <div className="orderdetail-customer-item">
                <div className="orderdetail-customer-label">수령인</div>
                <div className="orderdetail-customer-value">Koubit</div>
              </div>
              <div className="orderdetail-customer-item">
                <div className="orderdetail-customer-label">휴대폰번호</div>
                <div className="orderdetail-customer-value">010-1***-1***</div>
              </div>
              <div className="orderdetail-customer-item">
                <div className="orderdetail-customer-label">이메일</div>
                <div className="orderdetail-customer-value">j*******@g*******.com</div>
              </div>
            </div>
          </div>

          {/* 배송지 정보 섹션 */}
          <div className="orderdetail-section">
            <div className="orderdetail-section-header">
              <div className="orderdetail-section-title">배송지 정보</div>
            </div>
            <div className="orderdetail-section-divider"></div>

            <div className="orderdetail-shipping-info">
              <div className="orderdetail-shipping-item">
                <div className="orderdetail-shipping-label">수령인</div>
                <div className="orderdetail-shipping-value">Koubit</div>
              </div>
              <div className="orderdetail-shipping-item">
                <div className="orderdetail-shipping-label">휴대폰번호</div>
                <div className="orderdetail-shipping-value">010-1111-1111</div>
              </div>
              <div className="orderdetail-shipping-item">
                <div className="orderdetail-shipping-label">배송지</div>
                <div className="orderdetail-shipping-value">00000 한양시 조선구 고려동 11-1 신라아파트 111동 111호</div>
                <button className="orderdetail-shipping-change-button">배송지 정보 변경</button>
              </div>
              <div className="orderdetail-shipping-item">
                <div className="orderdetail-shipping-label">배송 요청사항</div>
                <div className="orderdetail-shipping-value">파손 위험이 있으니 주의해서 취급 부탁드립니다.</div>
              </div>
            </div>
          </div>

          {/* 결제 정보 섹션 */}
          <div className="orderdetail-section">
            <div className="orderdetail-section-header">
              <div className="orderdetail-section-title">결제 정보</div>
            </div>
            <div className="orderdetail-section-divider"></div>

            <div className="orderdetail-payment-info">
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">결제 방법</div>
                <div className="orderdetail-payment-value">카카오페이</div>
              </div>
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">주문 상태</div>
                <div className="orderdetail-payment-value">결제 완료</div>
              </div>
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">주문 접수 일시</div>
                <div className="orderdetail-payment-value">2023-01-01 18:00 PM</div>
              </div>
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">결제 완료 일시</div>
                <div className="orderdetail-payment-value">2023-01-01 18:00 PM</div>
              </div>
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">배송비</div>
                <div className="orderdetail-payment-value">6,000원</div>
              </div>
              <div className="orderdetail-payment-item">
                <div className="orderdetail-payment-label">결제 금액</div>
                <div className="orderdetail-payment-value">978,720원</div>
              </div>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="orderdetail-notice">
            <div className="orderdetail-notice-text">
              * 상품이 품절되는 경우 주문이 자동으로 취소되며, 주문하신 분의 SMS와 이메일로 관련 안내를 발송해드립니다.<br/>
              * 상세 내역은 마이페이지에서 확인하실 수 있습니다.
            </div>
          </div>

          {/* 영수증 섹션 */}
          <div className="orderdetail-receipt">
            <div className="orderdetail-receipt-text">영수증</div>
            <button className="orderdetail-receipt-button">영수증 출력</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
