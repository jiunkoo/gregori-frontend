import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ProductResponseDto } from '../types';
import Icon from '../components/icons/SvgIcon';
import '../styles/cart.css';

interface CartItem {
  product: ProductResponseDto;
  quantity: number;
}

const Cart: React.FC = () => {
  const { } = useAuthStore();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 추가 (로컬 스토리지 무시)
    const dummyCartItems: CartItem[] = [
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
    ];
    setCartItems(dummyCartItems);
    localStorage.setItem('cart', JSON.stringify(dummyCartItems));
    setLoading(false);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (productId: number) => {
    const updatedItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };


  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }

    // 주문 페이지로 이동 (로그인 체크 생략)
    navigate('/order', { 
      state: { 
        items: cartItems,
        totalAmount: getTotalPrice() 
      } 
    });
  };

  if (loading) {
    return (
      <div className="cart-wrapper">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <Icon name="loading" size={48} />
            </div>
            <p>장바구니를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-progress">
          <span className="cart-progress-item">01 장바구니</span>
          <Icon name="arrowRight" size={12} className="cart-progress-divider" color="black" />
          <span className="cart-progress-item inactive">02 주문</span>
          <Icon name="arrowRight" size={12} className="cart-progress-divider" color="black" />
          <span className="cart-progress-item inactive">03 주문 확인</span>
        </div>

        <div className="cart-main">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <Icon name="cart" size={48} />
            </div>
            <h2 className="cart-empty-title">장바구니가 비어있습니다</h2>
            <p className="cart-empty-description">원하는 상품을 장바구니에 담아보세요.</p>
            <Link to="/products" className="cart-continue-button">
              <Icon name="shopping" size={24} />
              쇼핑 계속하기
            </Link>
          </div>
        ) : (
          <div className="cart-section">
            <div className="cart-section-header">
              <div className="cart-section-icon">
                <Icon name="check" size={18} color="white" />
              </div>
              <span>주문 상품 정보</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.product.id} className="cart-item">
                {/* 컬럼 1: 상품 정보 */}
                <div className="cart-item-product">
                  <div className="cart-item-checkbox">
                    <Icon name="check" size={18} color="white" />
                  </div>

                  <div className="cart-item-image">
                    <Icon name="image" size={60} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-brand">{item.product.sellerName}</div>
                    <div className="cart-item-name">{item.product.name}</div>
                    <div className="cart-item-price">{formatPrice(item.product.price)}원</div>
                    <div className="cart-item-discount">[20%] {formatPrice(Math.floor(item.product.price * 0.8))}원</div>
                    <div className="cart-item-option">옵션: [사이즈] M, [색상] Navy</div>
                  </div>

                  <button className="cart-item-remove" onClick={() => removeItem(item.product.id)}>
                    <Icon name="close" size={30} color="black" />
                  </button>
                </div>

                {/* 컬럼 2: 수량 조절 */}
                <div className="cart-item-controls">
                  <button className="cart-quantity-button" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <Icon name="minus" size={30} color="#33363F" />
                  </button>
                  <div className="cart-quantity-display">{item.quantity}</div>
                  <button className="cart-quantity-button" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <Icon name="plus" size={30} color="#33363F" />
                  </button>
                </div>

                {/* 컬럼 3: 총 가격 */}
                <div className="cart-item-price-total">
                  <div className="cart-price-amount">{formatPrice(Math.floor(item.product.price * 0.8 * item.quantity))}원</div>
                  <button className="cart-item-order-button">주문하기</button>
                </div>

                {/* 컬럼 4: 배송 정보 */}
                <div className="cart-item-shipping">
                  <div className="cart-shipping-info">3,000원 업체 배송</div>
                  <div className="cart-shipping-detail">
                    [Apple] 제품으로 500,000 이상 구매 시<br/>
                    무료배송 됩니다.<br/>
                    (배송비 3,000원)
                  </div>
                </div>

              </div>
            ))}

            <div className="cart-actions">
              <button className="cart-action-button" onClick={clearCart}>선택 상품 삭제</button>
              <button className="cart-action-button">품절 상품 삭제</button>
              <div className="cart-notice">* 장바구니는 접속 종료 후 60일 동안 보관됩니다.</div>
            </div>
            
            <div className="cart-summary">
              <div className="cart-summary-content">
                <div className="cart-summary-item">
                  <span className="cart-summary-label">총 주문금액</span>
                  <div>
                    <span className="cart-summary-amount">{formatPrice(getTotalPrice())}</span>
                    <span className="cart-summary-currency">원</span>
                  </div>
                </div>

                <div className="cart-summary-operator">+</div>

                <div className="cart-summary-item">
                  <span className="cart-summary-label">총 배송비</span>
                  <div>
                    <span className="cart-summary-amount">6,000</span>
                    <span className="cart-summary-currency">원</span>
                  </div>
                </div>

                <div className="cart-summary-operator">-</div>

                <div className="cart-summary-item">
                  <span className="cart-summary-label">할인예상금액</span>
                  <div>
                    <span className="cart-summary-amount discount">{formatPrice(Math.floor(getTotalPrice() * 0.2))}</span>
                    <span className="cart-summary-currency discount">원</span>
                  </div>
                </div>

                <div className="cart-summary-operator">=</div>

                <div className="cart-summary-item">
                  <span className="cart-summary-label">총 결제금액</span>
                  <div>
                    <span className="cart-summary-amount">{formatPrice(Math.floor(getTotalPrice() * 0.8) + 6000)}</span>
                    <span className="cart-summary-currency">원</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cart-order-buttons">
              <button className="cart-order-button-secondary" onClick={() => navigate('/products')}>계속 쇼핑하기</button>
              <button className="cart-order-button-primary" onClick={handleCheckout}>
                바로 주문하기
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 