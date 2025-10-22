import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../../api/product';
import { useAuthStore } from '../../stores/authStore';
import { ProductResponseDto } from '../../types';
import '../../styles/product-detail.css';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [discountStates, setDiscountStates] = useState({
    productDiscount: true,
    couponDiscount1: false,
    couponDiscount2: false,
    paymentDiscount1: false,
    paymentDiscount2: false
  });
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const data = await productAPI.getProduct(parseInt(productId));
      setProduct(data);
    } catch (error) {
      console.error('상품 조회 실패:', error);
      // 디자인 확인을 위한 더미 데이터 사용
      const dummyProduct: ProductResponseDto = {
        id: parseInt(productId),
        name: 'DIGITAL WATCH',
        price: 405300,
        description: '고품질 디지털 워치로 스타일과 기능을 동시에 만족시켜드립니다. 다양한 기능과 세련된 디자인이 조화를 이룬 제품입니다.',
        stock: 100,
        categoryId: 1,
        categoryName: '액세서리',
        sellerId: 1,
        sellerName: 'GREGORI',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProduct(dummyProduct);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleDiscountToggle = (discountType: keyof typeof discountStates) => {
    setDiscountStates(prev => ({
      ...prev,
      [discountType]: !prev[discountType]
    }));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(prev => !prev);
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!product) return;

    navigate('/order-confirm', { 
      state: { 
        productName: product.name, 
        quantity: quantity, 
        price: product.price,
        totalAmount: product.price * quantity 
      } 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Light Gray', 'Navy', 'Black', 'White'];

  if (loading) {
    return (
      <div className="product-detail-wrapper">
        <div className="product-detail-container">
          <div className="product-detail-loading">
            <div className="product-detail-loading-spinner"></div>
            <p className="product-detail-loading-text">상품 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-wrapper">
        <div className="product-detail-container">
          <div className="product-detail-error">
            <svg className="product-detail-error-icon">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="product-detail-error-text">상품을 찾을 수 없습니다.</p>
            <Link to="/" className="product-detail-error-button">
              <svg className="product-detail-back-icon">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <nav className="product-detail-breadcrumb">
            <Link to="/">홈</Link>
            <svg className="product-detail-breadcrumb-arrow">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/">상품</Link>
            <svg className="product-detail-breadcrumb-arrow">
              <path d="M9 5l7 7-7 7" />
            </svg>
            <span>{product.name}</span>
          </nav>
        </div>

        <div className="product-detail-main">
          <div className="product-detail-image-section">
            <div className="product-detail-image">
              <div className="product-detail-image-placeholder">
                <svg className="product-detail-image-placeholder-icon">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>이미지 준비중</p>
              </div>
              <div className="product-detail-image-dots">
                <div className="product-detail-dot active"></div>
                <div className="product-detail-dot"></div>
                <div className="product-detail-dot"></div>
              </div>
              <div className="product-detail-image-nav">
                <button className="product-detail-nav-button">
                  <svg className="product-detail-nav-left-icon">
                    <path d="M11.3374 0.629166L1.15217 10L11.3374 19.3492L10.8988 20L0 10L10.9059 4.76837e-07L11.3374 0.629166Z"/>
                  </svg>
                </button>
                <button className="product-detail-nav-button">
                  <svg className="product-detail-nav-right-icon">
                    <path d="M0.0004673 19.3708L10.1857 10L0.0004673 0.650833L0.439083 0L11.3379 10L0.431997 20L0.0004673 19.3708Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="product-detail-info-section">
            <div className="product-detail-line"></div>
            <div className="product-detail-title">
              <h1>{product.name}</h1>
              <button 
                className="product-detail-wishlist-button"
                onClick={handleWishlistToggle}
              >
                <svg className="product-detail-wishlist-icon">
                  <path 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={isWishlisted ? "#FF5252" : "none"}
                    stroke={isWishlisted ? "#FF5252" : "currentColor"}
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            
            <div className="product-detail-rating">
              <div className="product-detail-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="product-detail-star">
                    <path d="M10.9993 1L7.9428 7.56716L1 8.6269L6.02945 13.8027L4.8272 21L10.9993 17.5364L17.1727 21L15.9793 13.8027L21 8.6269L14.0956 7.56716L10.9993 1Z"/>
                  </svg>
                ))}
              </div>
              <span className="product-detail-review-link">+500 리뷰 보기</span>
            </div>

            <div className="product-detail-price-section">
              <div className="product-detail-price">{formatPrice(product.price)}원</div>
              <button className="product-detail-coupon-button">
                <svg className="product-detail-coupon-icon">
                  <path d="M15 17.5L14.2929 18.2071L15 18.9142L15.7071 18.2071L15 17.5ZM16 6.25C16 5.69772 15.5523 5.25 15 5.25C14.4477 5.25 14 5.69772 14 6.25L15 6.25L16 6.25ZM8.75 11.25L8.04289 11.9571L14.2929 18.2071L15 17.5L15.7071 16.7929L9.45711 10.5429L8.75 11.25ZM15 17.5L15.7071 18.2071L21.9571 11.9571L21.25 11.25L20.5429 10.5429L14.2929 16.7929L15 17.5ZM15 17.5L16 17.5L16 6.25L15 6.25L14 6.25L14 17.5L15 17.5Z"/>
                  <path d="M6.25 20L6.25 21.25C6.25 22.6307 7.36929 23.75 8.75 23.75L21.25 23.75C22.6307 23.75 23.75 22.6307 23.75 21.25V20"/>
                </svg>
                쿠폰 받기
              </button>
            </div>
            
            <div className="product-detail-points">4,053p(1%) 적립</div>
            
            <div className="product-detail-divider"></div>
            
            <div className="product-detail-member-price">
              <span>회원님의 구매 가능 가격</span>
              <div className="product-detail-member-price-value">
                <span className="product-detail-discount-percent">20%</span>
                <span className="product-detail-member-price-amount">324,240원</span>
              </div>
            </div>
            
            <div className="product-detail-discount-section">
              <div className="product-detail-discount-item">
                <span className="product-detail-discount-label">상품 할인</span>
                <button 
                  className="product-detail-discount-checkbox"
                  onClick={() => handleDiscountToggle('productDiscount')}
                >
                  <div className="product-detail-checkbox-box">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="23" height="23" rx="4" fill="white" stroke={discountStates.productDiscount ? "black" : "#BABABA"} strokeWidth="2"/>
                    </svg>
                  </div>
                  {discountStates.productDiscount && (
                    <div className="product-detail-checkbox-check">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </button>
                <span className="product-detail-discount-name">기본 할인 10%</span>
                <span className={`product-detail-discount-amount ${!discountStates.productDiscount ? 'disabled' : ''}`}>-40,530원</span>
              </div>

              <div className="product-detail-discount-item">
                <span className="product-detail-discount-label">쿠폰 할인</span>
                <button 
                  className="product-detail-discount-checkbox"
                  onClick={() => handleDiscountToggle('couponDiscount1')}
                >
                  <div className="product-detail-checkbox-box">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="23" height="23" rx="4" fill="white" stroke={discountStates.couponDiscount1 ? "black" : "#BABABA"} strokeWidth="2"/>
                    </svg>
                  </div>
                  {discountStates.couponDiscount1 && (
                    <div className="product-detail-checkbox-check">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </button>
                <div className="product-detail-coupon-item">
                  <button className="product-detail-coupon-download">
                    <svg className="product-detail-coupon-icon">
                      <path d="M11.25 13.125L10.5429 13.8321L11.25 14.5392L11.9571 13.8321L11.25 13.125ZM12.25 4.6875C12.25 4.13522 11.8023 3.6875 11.25 3.6875C10.6977 3.6875 10.25 4.13522 10.25 4.6875L11.25 4.6875L12.25 4.6875ZM6.5625 8.4375L5.85539 9.14461L10.5429 13.8321L11.25 13.125L11.9571 12.4179L7.26961 7.73039L6.5625 8.4375ZM11.25 13.125L11.9571 13.8321L16.6446 9.14461L15.9375 8.4375L15.2304 7.73039L10.5429 12.4179L11.25 13.125ZM11.25 13.125L12.25 13.125L12.25 4.6875L11.25 4.6875L10.25 4.6875L10.25 13.125L11.25 13.125Z"/>
                      <path d="M4.6875 15L4.6875 15.9375C4.6875 16.973 5.52697 17.8125 6.5625 17.8125L15.9375 17.8125C16.973 17.8125 17.8125 16.973 17.8125 15.9375V15"/>
                    </svg>
                    받기
                  </button>
                  <span className="product-detail-coupon-name">GREEN 회원 5% 할인 쿠폰</span>
                </div>
                <span className={`product-detail-discount-amount ${!discountStates.couponDiscount1 ? 'disabled' : ''}`}>-20,265원</span>
              </div>

              <div className="product-detail-discount-item">
                <span className="product-detail-discount-label">쿠폰 할인</span>
                <button 
                  className="product-detail-discount-checkbox"
                  onClick={() => handleDiscountToggle('couponDiscount2')}
                >
                  <div className="product-detail-checkbox-box">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="23" height="23" rx="4" fill="white" stroke={discountStates.couponDiscount2 ? "black" : "#BABABA"} strokeWidth="2"/>
                    </svg>
                  </div>
                  {discountStates.couponDiscount2 && (
                    <div className="product-detail-checkbox-check">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </button>
                <div className="product-detail-coupon-item">
                  <button className="product-detail-coupon-download">
                    <svg className="product-detail-coupon-icon">
                      <path d="M11.25 13.125L10.5429 13.8321L11.25 14.5392L11.9571 13.8321L11.25 13.125ZM12.25 4.6875C12.25 4.13522 11.8023 3.6875 11.25 3.6875C10.6977 3.6875 10.25 4.13522 10.25 4.6875L11.25 4.6875L12.25 4.6875ZM6.5625 8.4375L5.85539 9.14461L10.5429 13.8321L11.25 13.125L11.9571 12.4179L7.26961 7.73039L6.5625 8.4375ZM11.25 13.125L11.9571 13.8321L16.6446 9.14461L15.9375 8.4375L15.2304 7.73039L10.5429 12.4179L11.25 13.125ZM11.25 13.125L12.25 13.125L12.25 4.6875L11.25 4.6875L10.25 4.6875L10.25 13.125L11.25 13.125Z"/>
                      <path d="M4.6875 15L4.6875 15.9375C4.6875 16.973 5.52697 17.8125 6.5625 17.8125L15.9375 17.8125C16.973 17.8125 17.8125 16.973 17.8125 15.9375V15"/>
                    </svg>
                    받기
                  </button>
                  <span className="product-detail-coupon-name">추석맞이 10% 할인 쿠폰</span>
                </div>
                <span className={`product-detail-discount-amount ${!discountStates.couponDiscount2 ? 'disabled' : ''}`}>-40,530원</span>
              </div>

              <div className="product-detail-discount-item">
                <span className="product-detail-discount-label">결제수단 할인</span>
                <button 
                  className="product-detail-discount-checkbox"
                  onClick={() => handleDiscountToggle('paymentDiscount1')}
                >
                  <div className="product-detail-checkbox-box">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="23" height="23" rx="4" fill="white" stroke={discountStates.paymentDiscount1 ? "black" : "#BABABA"} strokeWidth="2"/>
                    </svg>
                  </div>
                  {discountStates.paymentDiscount1 && (
                    <div className="product-detail-checkbox-check">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </button>
                <span className="product-detail-discount-name">보유 마일리지 모두 사용</span>
                <span className={`product-detail-discount-amount ${!discountStates.paymentDiscount1 ? 'disabled' : ''}`}>0p</span>
              </div>

              <div className="product-detail-discount-item">
                <span className="product-detail-discount-label">결제수단 할인</span>
                <button 
                  className="product-detail-discount-checkbox"
                  onClick={() => handleDiscountToggle('paymentDiscount2')}
                >
                  <div className="product-detail-checkbox-box">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="23" height="23" rx="4" fill="white" stroke={discountStates.paymentDiscount2 ? "black" : "#BABABA"} strokeWidth="2"/>
                    </svg>
                  </div>
                  {discountStates.paymentDiscount2 && (
                    <div className="product-detail-checkbox-check">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
                </button>
                <span className="product-detail-discount-name">[삼성카드] 삼성페이 결제 시 5% 청구 할인 <span style={{color: '#747474', textDecoration: 'underline'}}>자세히</span></span>
                <span className={`product-detail-discount-amount ${!discountStates.paymentDiscount2 ? 'disabled' : ''}`}>-20,265원</span>
              </div>
            </div>

            <div className="product-detail-divider"></div>

            <div className="product-detail-shipping">
              <div className="product-detail-shipping-item">
                <span className="product-detail-shipping-label">배송비</span>
                <div className="product-detail-shipping-content">
                  해당 브랜드 제품으로 100,000원 이상 구매 시 무료배송 (미만일 시 배송비 3,000원 발생)<br/>
                  제주도를 포함한 도서/산간 지역 추가 배송비 없음
                </div>
              </div>
              <div className="product-detail-shipping-item">
                <span className="product-detail-shipping-label">배송예정</span>
                <div className="product-detail-shipping-content">
                  <span className="product-detail-shipping-highlight">3일</span> 이내 출고 (주말, 공휴일 제외)
                </div>
              </div>
            </div>

            <div className="product-detail-divider"></div>

            <div className="product-detail-options">
              <div className="product-detail-option-group">
                <div className="product-detail-option-header" onClick={() => setSizeOpen(!sizeOpen)}>
                  <span className="product-detail-option-title">Size</span>
                  <svg className={`product-detail-option-arrow ${sizeOpen ? 'open' : ''}`}>
                    <path d="M0.503332 7.62939e-06L8 8.14821L15.4793 7.62939e-06L16 0.350901L8 9.06995L-4.76837e-07 0.345232L0.503332 7.62939e-06Z"/>
                  </svg>
                </div>
                <div className={`product-detail-option-items ${sizeOpen ? 'open' : ''}`}>
                  {sizes.map((size) => (
                    <div 
                      key={size} 
                      className={`product-detail-option-item ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedSize(size);
                        if (!selectedColor) {
                          setSelectedColor(colors[0]);
                        }
                        setSizeOpen(false);
                      }}
                    >
                      <span className="product-detail-option-label">{size}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-detail-option-group">
                <div className={`product-detail-option-header ${!selectedSize ? 'disabled' : ''}`} onClick={() => selectedSize && setColorOpen(!colorOpen)}>
                  <span className="product-detail-option-title">Color{selectedColor ? ` - ${selectedColor}` : ''}</span>
                  <svg className={`product-detail-option-arrow ${colorOpen ? 'open' : ''}`}>
                    <path d="M0.503332 7.62939e-06L8 8.14821L15.4793 7.62939e-06L16 0.350901L8 9.06995L-4.76837e-07 0.345232L0.503332 7.62939e-06Z"/>
                  </svg>
                </div>
                <div className={`product-detail-option-items ${colorOpen && selectedSize ? 'open' : ''}`}>
                  {colors.map((color) => (
                    <div 
                      key={color} 
                      className={`product-detail-option-item ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => {
                        if (selectedSize) {
                          setSelectedColor(color);
                          setColorOpen(false);
                        }
                      }}
                    >
                      <span className="product-detail-option-label">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-detail-divider"></div>

            {selectedSize && selectedColor && (
              <div className="product-detail-cart-section">
                <div className="product-detail-cart-item">
                  <span className="product-detail-cart-option">{selectedSize} / {selectedColor}</span>
                  <div className="product-detail-cart-controls">
                    <button className="product-detail-cart-button" onClick={() => handleQuantityChange(-1)}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5 15L7.5 15" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <div className="product-detail-cart-quantity">{quantity}</div>
                    <button className="product-detail-cart-button" onClick={() => handleQuantityChange(1)}>
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 7.5L15 22.5" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M22.5 15L7.5 15" stroke="#33363F" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                  <span className="product-detail-cart-price">{formatPrice(product.price)}원</span>
                  <svg className="product-detail-cart-remove">
                    <path d="M10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 4.4775 15.5225 0 10 0ZM13.4592 14.9525L10.0067 11.5342L6.57583 15L5.04833 13.4725L8.46833 10.0083L5 6.57583L6.5275 5.04833L9.99 8.46667L13.4117 5L14.9525 6.54083L11.5358 9.99167L15 13.4117L13.4592 14.9525Z"/>
                  </svg>
                </div>
              </div>
            )}

            {selectedSize && selectedColor && (
              <div className="product-detail-total">
                <span className="product-detail-total-label">총 상품 금액</span>
                <span className="product-detail-total-price">{formatPrice(product.price * quantity)}원</span>
              </div>
            )}

            <div className="product-detail-order-buttons">
              <button 
                className="product-detail-order-button"
                disabled={!selectedSize || !selectedColor}
              >
                장바구니 담기
              </button>
              <button 
                className="product-detail-order-button primary" 
                onClick={handleOrder}
                disabled={!selectedSize || !selectedColor}
              >
                바로 주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 