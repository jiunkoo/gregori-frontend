import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductResponseDto } from '../types';
import '../styles/order.css';

interface CartItem {
  product: ProductResponseDto;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  totalAmount: number;
}

const Order: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as OrderData || {
    items: [
      {
        product: {
          sellerId: 1,
          categoryName: "액세서리",
          id: 1,
          name: "DIGITAL WATCH",
          price: 810600,
          description: "고급 디지털 워치",
          sellerName: "Apple",
          categoryId: 1,
          stock: 100,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        quantity: 2
      },
      {
        product: {
          sellerId: 1,
          categoryName: "액세서리",
          id: 2,
          name: "DIGITAL WATCH",
          price: 405300,
          description: "고급 디지털 워치",
          sellerName: "Banana",
          categoryId: 1,
          stock: 50,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        quantity: 1
      }
    ],
    totalAmount: 2026500
  };

  // 주문자 정보 상태
  const [ordererInfo] = useState({
    name: 'Koubit',
    phone: '010-1***-1***',
    email: 'j*******@g*******.com'
  });

  // 배송지 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    type: 'default', // 'default', 'new'
    name: '',
    recipient: '',
    address: '',
    detailAddress: '',
    phone1: '',
    phone2: '',
    request: '',
    setAsDefault: false
  });

  // 쿠폰/마일리지 상태
  const [couponInfo, setCouponInfo] = useState({
    bonusCoupon: '사용 가능 쿠폰 3장 / 보유 4장',
    brandCoupon: '적용 가능한 쿠폰이 없습니다.',
    miles: 0,
    milesUsed: 0
  });

  // 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // 주문동의 상태
  const [agreements, setAgreements] = useState({
    all: false,
    personalInfo: false,
    thirdParty: false,
    payment: false
  });

  // 금액 계산
  const calculateAmounts = () => {
    const totalProductAmount = orderData?.totalAmount || 0;
    const discountAmount = Math.floor(totalProductAmount * 0.2); // 20% 할인
    const shippingFee = 6000;
    const couponDiscount = 243180; // 쿠폰 할인
    const milesDiscount = couponInfo.milesUsed;
    
    const finalAmount = totalProductAmount - discountAmount - couponDiscount - milesDiscount + shippingFee;
    
    return {
      totalProductAmount,
      discountAmount,
      shippingFee,
      couponDiscount,
      milesDiscount,
      finalAmount
    };
  };

  const amounts = calculateAmounts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handlePayment = () => {
    if (!agreements.all) {
      alert('모든 약관에 동의해주세요.');
      return;
    }

    // 결제 처리 로직
    console.log('결제 진행', {
      orderData,
      ordererInfo,
      shippingInfo,
      couponInfo,
      paymentMethod,
      agreements,
      amounts
    });

    // 주문 완료 페이지로 이동
    navigate('/order-complete');
  };

  const handleAgreementChange = (type: keyof typeof agreements, checked: boolean) => {
    if (type === 'all') {
      setAgreements({
        all: checked,
        personalInfo: checked,
        thirdParty: checked,
        payment: checked
      });
    } else {
      const newAgreements = { ...agreements, [type]: checked };
      newAgreements.all = newAgreements.personalInfo && newAgreements.thirdParty && newAgreements.payment;
      setAgreements(newAgreements);
    }
  };


  return (
    <div className="order-wrapper">
        <div className="order-container">
        {/* 진행 단계 */}
        <div className="order-progress">
          <span className="order-progress-item">01 장바구니</span>
          <svg className="order-progress-divider" viewBox="0 0 12 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.0004673 19.3708L10.1857 10L0.0004673 0.650833L0.439083 0L11.3379 10L0.431997 20L0.0004673 19.3708Z" fill="black"/>
          </svg>
          <span className="order-progress-item active">02 주문</span>
          <svg className="order-progress-divider" viewBox="0 0 12 20" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.0004673 19.3708L10.1857 10L0.0004673 0.650833L0.439083 0L11.3379 10L0.431997 20L0.0004673 19.3708Z" fill="black"/>
          </svg>
          <span className="order-progress-item">03 주문 확인</span>
        </div>

        {/* 1. 주문상품정보 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">주문 상품 정보</div>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-products">
            {orderData.items.map((item) => (
              <div key={item.product.id} className="order-product-item">
                <div className="order-product-image">
                  <svg width="60" height="60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="order-product-info">
                  <div className="order-product-brand">{item.product.sellerName}</div>
                  <div className="order-product-name">{item.product.name}</div>
                  <div className="order-product-option">옵션: [사이즈] M, [색상] Navy</div>
                  <div className="order-product-price">
                    [20%] {formatPrice(Math.floor(item.product.price * 0.8 * item.quantity))}원 / 수량 {item.quantity}개
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 주문자 정보 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">주문자 정보</div>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-user-info">
            <div className="order-user-item">
              <div className="order-user-label">이름</div>
              <div className="order-user-value">{ordererInfo.name}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">수정</div>
              </div>
            </div>
            <div className="order-user-item">
              <div className="order-user-label">연락처</div>
              <div className="order-user-value">{ordererInfo.phone}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">수정</div>
              </div>
            </div>
            <div className="order-user-item">
              <div className="order-user-label">이메일</div>
              <div className="order-user-value">{ordererInfo.email}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">수정</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 배송지 정보 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">배송지 정보</div>
            <svg className="order-question-icon" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="11.25" stroke="#33363F" strokeWidth="2"/>
              <circle cx="15" cy="22.5" r="0.625" fill="#33363F" stroke="#33363F"/>
              <path d="M15 20V18.2264C15 17.0461 15.7553 15.9982 16.875 15.625C17.9947 15.2518 18.75 14.2039 18.75 13.0236V12.3821C18.75 10.3762 17.1238 8.75 15.1179 8.75H15C12.9289 8.75 11.25 10.4289 11.25 12.5" stroke="#33363F" strokeWidth="2"/>
            </svg>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-shipping-options">
            <div className="order-shipping-option">
              <div className={`order-shipping-radio ${shippingInfo.type === 'default' ? 'selected' : ''}`} 
                   onClick={() => setShippingInfo({...shippingInfo, type: 'default'})}></div>
              <div className="order-shipping-label">기본 배송지</div>
            </div>
            <div className="order-shipping-option">
              <div className={`order-shipping-radio ${shippingInfo.type === 'new' ? 'selected' : ''}`} 
                   onClick={() => setShippingInfo({...shippingInfo, type: 'new'})}></div>
              <div className="order-shipping-label">신규 배송지</div>
            </div>
            <div className="order-shipping-button">
              <div className="order-shipping-button-text">배송지 목록</div>
            </div>
          </div>

          <div className="order-shipping-form">
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">배송지명</div>
              <input type="text" className="order-shipping-input" placeholder="배송지명을 입력해주세요." />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">수령인*</div>
              <input type="text" className="order-shipping-input" placeholder="수령인을 입력해주세요." />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">배송지*</div>
              <input type="text" className="order-shipping-input" placeholder="주소를 입력해주세요." />
              <input type="text" className="order-shipping-input" placeholder="상세 주소를 입력해주세요." />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">연락처1*</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="010" />
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="1234" />
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="5678" />
              </div>
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">연락처2</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="010" />
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="1234" />
                <input type="text" className="order-shipping-input" style={{ width: '80px' }} placeholder="5678" />
              </div>
            </div>
            <div className="order-shipping-checkbox-group">
              <div className="order-shipping-checkbox"></div>
              <div className="order-shipping-checkbox-label">기본 배송지로 등록</div>
            </div>
            <div className="order-shipping-input-group">
              <select className="order-shipping-select">
                <option>배송 시 요청사항을 선택해 주세요.</option>
                <option>부재 시 경비실에 맡겨주세요</option>
                <option>부재 시 문 앞에 놓아주세요</option>
                <option>직접 받겠습니다</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. 쿠폰/마일리지 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">쿠폰/마일리지</div>
            <svg className="order-question-icon" viewBox="0 0 30 30" fill="none">
              <circle cx="15" cy="15" r="11.25" stroke="#33363F" strokeWidth="2"/>
              <circle cx="15" cy="22.5" r="0.625" fill="#33363F" stroke="#33363F"/>
              <path d="M15 20V18.2264C15 17.0461 15.7553 15.9982 16.875 15.625C17.9947 15.2518 18.75 14.2039 18.75 13.0236V12.3821C18.75 10.3762 17.1238 8.75 15.1179 8.75H15C12.9289 8.75 11.25 10.4289 11.25 12.5" stroke="#33363F" strokeWidth="2"/>
            </svg>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-coupon-section">
            <div className="order-coupon-item">
              <div className="order-coupon-label">보너스 쿠폰</div>
              <div className="order-coupon-dropdown">
                <div className="order-coupon-dropdown-text">{couponInfo.bonusCoupon}</div>
                <svg className="order-coupon-dropdown-arrow" viewBox="0 0 16 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.503332 -0.000114441L8 8.14809L15.4793 -0.000114441L16 0.350779L8 9.06982L0 0.34511L0.503332 -0.000114441Z" fill="black"/>
                </svg>
              </div>
            </div>
            <div className="order-coupon-item">
              <div className="order-coupon-label">브랜드 쿠폰</div>
              <div className="order-coupon-dropdown">
                <div className="order-coupon-dropdown-text disabled">{couponInfo.brandCoupon}</div>
                <svg className="order-coupon-dropdown-arrow" viewBox="0 0 16 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.503332 -0.000114441L8 8.14809L15.4793 -0.000114441L16 0.350779L8 9.06982L0 0.34511L0.503332 -0.000114441Z" fill="#747474"/>
                </svg>
              </div>
            </div>
            <div className="order-miles-info">
              <div className="order-miles-label">마일리지</div>
              <input type="number" className="order-miles-input" value={couponInfo.milesUsed} 
                     onChange={(e) => setCouponInfo({...couponInfo, milesUsed: parseInt(e.target.value) || 0})} />
              <div className="order-miles-button">
                <div className="order-miles-button-text">모두 사용</div>
              </div>
              <div className="order-miles-info-text">
                사용 가능 <span className="order-miles-info-text">{couponInfo.milesUsed}</span>p / 
                <span className="order-miles-info-text gray"> 보유 0p</span>
              </div>
              <svg className="order-question-icon" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="11.25" stroke="#33363F" strokeWidth="2"/>
                <circle cx="15" cy="22.5" r="0.625" fill="#33363F" stroke="#33363F"/>
                <path d="M15 20V18.2264C15 17.0461 15.7553 15.9982 16.875 15.625C17.9947 15.2518 18.75 14.2039 18.75 13.0236V12.3821C18.75 10.3762 17.1238 8.75 15.1179 8.75H15C12.9289 8.75 11.25 10.4289 11.25 12.5" stroke="#33363F" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 5. 결제 상세 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">결제 상세</div>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-payment-detail">
            <div className="order-payment-item">
              <div className="order-payment-label">총 상품금액</div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">{formatPrice(amounts.totalProductAmount)}</div>
                <div className="order-payment-amount-currency">원</div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">쿠폰 사용</div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">- {formatPrice(amounts.couponDiscount)}</div>
                <div className="order-payment-amount-currency">원</div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">마일리지 사용</div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">- {formatPrice(amounts.milesDiscount)}</div>
                <div className="order-payment-amount-currency">원</div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">배송비</div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">+ {formatPrice(amounts.shippingFee)}</div>
                <div className="order-payment-amount-currency">원</div>
              </div>
            </div>
            <div className="order-section-divider-light"></div>
            <div className="order-payment-item">
              <div className="order-payment-label total">총 결제금액</div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text large">{formatPrice(amounts.finalAmount)}</div>
                <div className="order-payment-amount-currency large">원</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. 결제 방법 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">결제 방법</div>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-payment-methods">
            <div className="order-payment-method-row">
              <div className={`order-payment-method-button ${paymentMethod === 'credit-card' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('credit-card')}>
                <div className="order-payment-method-button-text">신용/체크카드</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'hyundai' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('hyundai')}>
                <div className="order-payment-method-button-text">현대카드 X PIN PAY</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'toss' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('toss')}>
                <div className="order-payment-method-button-text">토스페이</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'naver' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('naver')}>
                <div className="order-payment-method-button-text">네이버페이</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'kakao' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('kakao')}>
                <div className="order-payment-method-button-text">카카오페이</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'samsung' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('samsung')}>
                <div className="order-payment-method-button-text">삼성페이</div>
              </div>
            </div>
            
            <div className="order-payment-method-row">
              <div className={`order-payment-method-button ${paymentMethod === 'samsung2' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('samsung2')}>
                <div className="order-payment-method-button-text">삼성페이</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'payco' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('payco')}>
                <div className="order-payment-method-button-text">페이코</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'ssg' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('ssg')}>
                <div className="order-payment-method-button-text">SSG페이</div>
              </div>
              <div className={`order-payment-method-button ${paymentMethod === 'bank' ? 'selected' : ''}`}
                   onClick={() => setPaymentMethod('bank')}>
                <div className="order-payment-method-button-text">무통장입금</div>
              </div>
            </div>

            {paymentMethod === 'credit-card' && (
              <div className="order-payment-method-dropdown">
                <div className="order-payment-method-dropdown-text">카드사를 선택해주세요.</div>
                <svg className="order-payment-method-dropdown-arrow" viewBox="0 0 16 10" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.503332 -0.000114441L8 8.14809L15.4793 -0.000114441L16 0.350779L8 9.06982L0 0.34511L0.503332 -0.000114441Z" fill="black"/>
                </svg>
              </div>
            )}

            <div className="order-payment-benefits">
              <div className="order-payment-benefit">
                <div className="order-payment-benefit-button">
                  <div className="order-payment-benefit-button-text">혜택</div>
                </div>
                <div className="order-payment-benefit-text">[토스페이] 생애 첫 결제 1만원 이상 3천 토스페이 포인트 적립</div>
                <svg className="order-payment-benefit-arrow" viewBox="0 0 10 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.00037384 15.4967L8.14858 8L0.00037384 0.520667L0.351267 0L9.07031 8L0.345598 16L0.00037384 15.4967Z" fill="black"/>
                </svg>
              </div>
              <div className="order-payment-benefit">
                <div className="order-payment-benefit-button">
                  <div className="order-payment-benefit-button-text">혜택</div>
                </div>
                <div className="order-payment-benefit-text">[카카오페이] 12만원 이상 6천원 즉시할인</div>
                <svg className="order-payment-benefit-arrow" viewBox="0 0 10 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.00037384 15.4967L8.14858 8L0.00037384 0.520667L0.351267 0L9.07031 8L0.345598 16L0.00037384 15.4967Z" fill="black"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 7. 주문동의 */}
        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">주문동의</div>
          </div>
          <div className="order-section-divider"></div>
          
          <div className="order-agreement">
            <div className="order-agreement-item">
              <div className={`order-agreement-checkbox ${agreements.all ? 'checked' : ''}`}
                   onClick={() => handleAgreementChange('all', !agreements.all)}></div>
              <div className="order-agreement-text">주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.</div>
            </div>
            <div className="order-agreement-item">
              <div className={`order-agreement-checkbox ${agreements.personalInfo ? 'checked' : ''}`}
                   onClick={() => handleAgreementChange('personalInfo', !agreements.personalInfo)}></div>
              <div className="order-agreement-text small">
                (필수) 개인정보 수집/이용 동의 <span className="order-agreement-link">보기</span>
              </div>
            </div>
            <div className="order-agreement-item">
              <div className={`order-agreement-checkbox ${agreements.thirdParty ? 'checked' : ''}`}
                   onClick={() => handleAgreementChange('thirdParty', !agreements.thirdParty)}></div>
              <div className="order-agreement-text small">
                (필수) 개인정보 제 3자 제공 동의 <span className="order-agreement-link">보기</span>
              </div>
            </div>
            <div className="order-agreement-item">
              <div className={`order-agreement-checkbox ${agreements.payment ? 'checked' : ''}`}
                   onClick={() => handleAgreementChange('payment', !agreements.payment)}></div>
              <div className="order-agreement-text small">
                (필수) 결제대행 서비스 이용약관 <span className="order-agreement-link">보기</span>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button className="order-payment-button" onClick={handlePayment}>
          <div className="order-payment-button-text">결제하기</div>
        </button>
        </div>
      </div>
  );
};

export default Order;
