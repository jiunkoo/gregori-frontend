import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Icon from '@/components/icons/SvgIcon';
import '@/styles/order-confirm.css';

interface CartItem {
  product: {
    sellerId: number;
    categoryName: string;
    id: number;
    name: string;
    price: number;
    description: string;
    sellerName: string;
    categoryId: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
  };
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  totalAmount: number;
}

interface OrderConfirmData {
  orderData: OrderData;
  ordererInfo: {
    name: string;
    phone: string;
    email: string;
  };
  shippingInfo: {
    type: string;
    name: string;
    recipient: string;
    address: string;
    detailAddress: string;
    phone1: string;
    phone2: string;
    request: string;
    setAsDefault: boolean;
  };
  couponInfo: {
    bonusCoupon: string;
    brandCoupon: string;
    miles: number;
    milesUsed: number;
  };
  paymentMethod: string;
  agreements: {
    all: boolean;
    personalInfo: boolean;
    thirdParty: boolean;
    payment: boolean;
  };
  amounts: {
    totalProductAmount: number;
    discountAmount: number;
    shippingFee: number;
    couponDiscount: number;
    milesDiscount: number;
    finalAmount: number;
  };
}

const OrderConfirm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderConfirmData = location.state as OrderConfirmData;

  // 주문 정보가 없으면 홈으로 리다이렉트
  if (!orderConfirmData) {
    navigate('/');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleOrderInquiry = () => {
    navigate('/orders');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="order-confirm-wrapper">
        <div className="order-confirm-container">
          {/* 진행 단계 */}
          <div className="order-confirm-progress">
            <span className="order-confirm-progress-item">01 장바구니</span>
            <Icon name="progressDivider" size={12} className="order-confirm-progress-divider" color="black" />
            <span className="order-confirm-progress-item">02 주문</span>
            <Icon name="progressDivider" size={12} className="order-confirm-progress-divider" color="black" />
            <span className="order-confirm-progress-item active">03 주문 확인</span>
          </div>

          {/* 1. 주문 상품 정보 */}
          <div className="order-confirm-section">
            <div className="order-confirm-section-header">
              <div className="order-confirm-section-title">주문 상품 정보</div>
            </div>
            <div className="order-confirm-section-divider"></div>
            
            <div className="order-confirm-products">
              {orderConfirmData.orderData.items.map((item) => (
                <div key={item.product.id} className="order-confirm-product-item">
                  <div className="order-confirm-product-image">
                    <Icon name="image" size={120} />
                  </div>
                  <div className="order-confirm-product-info">
                    <div className="order-confirm-product-brand">{item.product.sellerName}</div>
                    <div className="order-confirm-product-name">{item.product.name}</div>
                    <div className="order-confirm-product-option">옵션: [사이즈] M, [색상] Navy</div>
                    <div className="order-confirm-product-price">
                      {formatPrice(Math.floor(item.product.price * 0.8 * item.quantity))}원
                    </div>
                  </div>
                  <div className="order-confirm-product-quantity">
                    <span className="order-confirm-product-quantity-number">{item.quantity}</span>
                    <span className="order-confirm-product-quantity-unit">개</span>
                  </div>
                  <div className="order-confirm-product-status">
                    <div className="order-confirm-product-status-text">결제 완료</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 주문자 정보 */}
          <div className="order-confirm-section">
            <div className="order-confirm-section-header">
              <div className="order-confirm-section-title">주문자 정보</div>
            </div>
            <div className="order-confirm-section-divider"></div>
            
            <div className="order-confirm-user-info">
              <div className="order-confirm-user-item">
                <div className="order-confirm-user-label">이름</div>
                <div className="order-confirm-user-value">{orderConfirmData.ordererInfo.name}</div>
              </div>
              <div className="order-confirm-user-item">
                <div className="order-confirm-user-label">연락처</div>
                <div className="order-confirm-user-value">{orderConfirmData.ordererInfo.phone}</div>
              </div>
              <div className="order-confirm-user-item">
                <div className="order-confirm-user-label">이메일</div>
                <div className="order-confirm-user-value">{orderConfirmData.ordererInfo.email}</div>
              </div>
            </div>
          </div>

          {/* 3. 배송지 정보 */}
          <div className="order-confirm-section">
            <div className="order-confirm-section-header">
              <div className="order-confirm-section-title">배송지 정보</div>
            </div>
            <div className="order-confirm-section-divider"></div>
            
            <div className="order-confirm-shipping-info">
              <div className="order-confirm-shipping-item">
                <div className="order-confirm-shipping-label">수령인</div>
                <div className="order-confirm-shipping-value">Koubit</div>
              </div>
              <div className="order-confirm-shipping-item">
                <div className="order-confirm-shipping-label">휴대폰번호</div>
                <div className="order-confirm-shipping-value">010-1111-1111</div>
              </div>
              <div className="order-confirm-shipping-item">
                <div className="order-confirm-shipping-label">배송지</div>
                <div className="order-confirm-shipping-value">00000 한양시 조선구 고려동 11-1 신라아파트 111동 111호</div>
                <div className="order-confirm-shipping-edit">
                  <div className="order-confirm-shipping-edit-text">배송지 정보 변경</div>
                </div>
              </div>
              <div className="order-confirm-shipping-item">
                <div className="order-confirm-shipping-label">배송 요청사항</div>
                <div className="order-confirm-shipping-value">파손 위험이 있으니 주의해서 취급 부탁드립니다.</div>
              </div>
            </div>
          </div>

          {/* 4. 결제 정보 */}
          <div className="order-confirm-section">
            <div className="order-confirm-section-header">
              <div className="order-confirm-section-title">결제 정보</div>
            </div>
            <div className="order-confirm-section-divider"></div>
            
            <div className="order-confirm-payment-info">
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">결제 방법</div>
                <div className="order-confirm-payment-value">카카오페이</div>
              </div>
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">주문 상태</div>
                <div className="order-confirm-payment-value">결제 완료</div>
              </div>
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">주문 접수 일시</div>
                <div className="order-confirm-payment-value">2023-01-01 18:00 PM</div>
              </div>
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">결제 완료 일시</div>
                <div className="order-confirm-payment-value">2023-01-01 18:00 PM</div>
              </div>
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">배송비</div>
                <div className="order-confirm-payment-value">{formatPrice(orderConfirmData.amounts.shippingFee)}원</div>
              </div>
              <div className="order-confirm-payment-item">
                <div className="order-confirm-payment-label">결제 금액</div>
                <div className="order-confirm-payment-value">{formatPrice(orderConfirmData.amounts.finalAmount)}원</div>
              </div>
            </div>

            <div className="order-confirm-receipt-section">
              <div className="order-confirm-receipt-label">영수증</div>
              <div className="order-confirm-receipt-button" onClick={handlePrintReceipt}>
                <div className="order-confirm-receipt-button-text">영수증 출력</div>
              </div>
            </div>

            <div className="order-confirm-notice">
              <div className="order-confirm-notice-text">
                * 상품이 품절되는 경우 주문이 자동으로 취소되며, 주문하신 분의 SMS와 이메일로 관련 안내를 발송해드립니다.<br/>
                * 상세 내역은 마이페이지에서 확인하실 수 있습니다.
              </div>
            </div>
          </div>

          {/* 5. 하단 버튼 */}
          <div className="order-confirm-buttons">
            <div className="order-confirm-button order-confirm-button-secondary" onClick={handleContinueShopping}>
              <div className="order-confirm-button-text">계속 쇼핑하기</div>
            </div>
            <div className="order-confirm-button order-confirm-button-primary" onClick={handleOrderInquiry}>
              <div className="order-confirm-button-text">주문/배송 조회</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirm;