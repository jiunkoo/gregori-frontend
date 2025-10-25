import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productAPI } from '../../api/product';
import { useAuthStore } from '../../stores/authStore';
import { ProductResponseDto } from '../../types';
import Icon from '../../components/icons/SvgIcon';
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
            <Icon name="error" size={24} className="product-detail-error-icon" />
            <p className="product-detail-error-text">상품을 찾을 수 없습니다.</p>
            <Link to="/" className="product-detail-error-button">
              <Icon name="arrowLeft" size={20} className="product-detail-back-icon" />
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
            <Icon name="arrowRight" size={16} className="product-detail-breadcrumb-arrow" />
            <Link to="/">상품</Link>
            <Icon name="arrowRight" size={16} className="product-detail-breadcrumb-arrow" />
            <span>{product.name}</span>
          </nav>
        </div>

        <div className="product-detail-main">
          <div className="product-detail-image-section">
            <div className="product-detail-image">
              <div className="product-detail-image-placeholder">
                <Icon name="image" size={120} className="product-detail-image-placeholder-icon" />
                <p>이미지 준비중</p>
              </div>
              <div className="product-detail-image-dots">
                <div className="product-detail-dot active"></div>
                <div className="product-detail-dot"></div>
                <div className="product-detail-dot"></div>
              </div>
              <div className="product-detail-image-nav">
                <button className="product-detail-nav-button">
                  <Icon name="arrowLeft" size={20} className="product-detail-nav-left-icon" />
                </button>
                <button className="product-detail-nav-button">
                  <Icon name="arrowRight" size={20} className="product-detail-nav-right-icon" />
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
                <Icon name="heart" size={24} className="product-detail-wishlist-icon" color={isWishlisted ? "#FF5252" : "currentColor"} />
              </button>
            </div>
            
            <div className="product-detail-rating">
              <div className="product-detail-stars">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={20} className="product-detail-star" />
                ))}
              </div>
              <span className="product-detail-review-link">+500 리뷰 보기</span>
            </div>

            <div className="product-detail-price-section">
              <div className="product-detail-price">{formatPrice(product.price)}원</div>
              <button className="product-detail-coupon-button">
                <Icon name="coupon" size={24} className="product-detail-coupon-icon" />
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
                    <Icon name="checkbox" size={25} color={discountStates.productDiscount ? "black" : "#BABABA"} />
                  </div>
                  {discountStates.productDiscount && (
                    <div className="product-detail-checkbox-check">
                      <Icon name="check" size={15} color="black" />
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
                    <Icon name="checkbox" size={25} color={discountStates.couponDiscount1 ? "black" : "#BABABA"} />
                  </div>
                  {discountStates.couponDiscount1 && (
                    <div className="product-detail-checkbox-check">
                      <Icon name="check" size={15} color="black" />
                    </div>
                  )}
                </button>
                <div className="product-detail-coupon-item">
                  <button className="product-detail-coupon-download">
                    <Icon name="download" size={24} className="product-detail-coupon-icon" />
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
                    <Icon name="checkbox" size={25} color={discountStates.couponDiscount2 ? "black" : "#BABABA"} />
                  </div>
                  {discountStates.couponDiscount2 && (
                    <div className="product-detail-checkbox-check">
                      <Icon name="check" size={15} color="black" />
                    </div>
                  )}
                </button>
                <div className="product-detail-coupon-item">
                  <button className="product-detail-coupon-download">
                    <Icon name="download" size={24} className="product-detail-coupon-icon" />
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
                    <Icon name="checkbox" size={25} color={discountStates.paymentDiscount1 ? "black" : "#BABABA"} />
                  </div>
                  {discountStates.paymentDiscount1 && (
                    <div className="product-detail-checkbox-check">
                      <Icon name="check" size={15} color="black" />
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
                    <Icon name="checkbox" size={25} color={discountStates.paymentDiscount2 ? "black" : "#BABABA"} />
                  </div>
                  {discountStates.paymentDiscount2 && (
                    <div className="product-detail-checkbox-check">
                      <Icon name="check" size={15} color="black" />
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
                  <Icon name="dropdownArrow" size={16} className={`product-detail-option-arrow ${sizeOpen ? 'open' : ''}`} />
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
                  <Icon name="dropdownArrow" size={16} className={`product-detail-option-arrow ${colorOpen ? 'open' : ''}`} />
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
                      <Icon name="minus" size={30} color="#33363F" />
                    </button>
                    <div className="product-detail-cart-quantity">{quantity}</div>
                    <button className="product-detail-cart-button" onClick={() => handleQuantityChange(1)}>
                      <Icon name="plus" size={30} color="#33363F" />
                    </button>
                  </div>
                  <span className="product-detail-cart-price">{formatPrice(product.price)}원</span>
                  <Icon name="close" size={20} className="product-detail-cart-remove" />
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