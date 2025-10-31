import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductResponseDto } from "@models";
import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import "@styles/cart.css";
import { CART_CONSTANTS } from "@constants";

interface CartItem {
  product: ProductResponseDto;
  quantity: number;
  checked?: boolean;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          updatedAt: new Date().toISOString(),
        },
        quantity: 2,
        checked: false,
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
          updatedAt: new Date().toISOString(),
        },
        quantity: 1,
        checked: false,
      },
    ];
    setCartItems(dummyCartItems);
    localStorage.setItem(
      CART_CONSTANTS.STORAGE.KEY,
      JSON.stringify(dummyCartItems)
    );
    setLoading(false);
  }, []);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem(
      CART_CONSTANTS.STORAGE.KEY,
      JSON.stringify(updatedItems)
    );
  };

  const removeItem = (productId: number) => {
    const updatedItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedItems);
    localStorage.setItem(
      CART_CONSTANTS.STORAGE.KEY,
      JSON.stringify(updatedItems)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_CONSTANTS.STORAGE.KEY);
  };

  const toggleItemCheck = (productId: number) => {
    const updatedItems = cartItems.map((item) =>
      item.product.id === productId ? { ...item, checked: !item.checked } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem(
      CART_CONSTANTS.STORAGE.KEY,
      JSON.stringify(updatedItems)
    );
  };

  const toggleAllCheck = () => {
    const allChecked = cartItems.every((item) => item.checked);
    const updatedItems = cartItems.map((item) => ({
      ...item,
      checked: !allChecked,
    }));
    setCartItems(updatedItems);
    localStorage.setItem(
      CART_CONSTANTS.STORAGE.KEY,
      JSON.stringify(updatedItems)
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      console.warn(CART_CONSTANTS.WARNINGS.EMPTY_CART);
      return;
    }

    navigate("/order", {
      state: {
        items: cartItems,
        totalAmount: getTotalPrice(),
      },
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <Icon name="loading" size={48} />
          </div>
          <p>{CART_CONSTANTS.LOADING_TEXT}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-progress">
          <span className="cart-progress-item">
            {CART_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="cart-progress-divider"
            color="black"
          />
          <span className="cart-progress-item inactive">
            {CART_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="cart-progress-divider"
            color="black"
          />
          <span className="cart-progress-item inactive">
            {CART_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        <div className="cart-main">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">
                <Icon name="cart" size={48} />
              </div>
              <h2 className="cart-empty-title">{CART_CONSTANTS.EMPTY.TITLE}</h2>
              <p className="cart-empty-description">
                {CART_CONSTANTS.EMPTY.DESCRIPTION}
              </p>
              <Link to="/products" className="cart-continue-button">
                <Icon name="shopping" size={24} />
                {CART_CONSTANTS.EMPTY.CONTINUE}
              </Link>
            </div>
          ) : (
            <div className="cart-section">
              <div className="cart-line"></div>
              <div className="cart-section-header">
                <button
                  className="cart-checkbox-button"
                  onClick={toggleAllCheck}
                >
                  <Icon
                    name={
                      cartItems.every((item) => item.checked)
                        ? "checkboxChecked"
                        : "checkbox"
                    }
                    size={30}
                  />
                </button>
                <span>{CART_CONSTANTS.SECTION.ORDER_INFO_TITLE}</span>
              </div>

              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item">
                  {/* 컬럼 1: 상품 정보 */}
                  <div className="cart-item-product">
                    <button
                      className="cart-checkbox-button"
                      onClick={() => toggleItemCheck(item.product.id)}
                    >
                      <Icon
                        name={item.checked ? "checkboxChecked" : "checkbox"}
                        size={30}
                      />
                    </button>

                    <div className="cart-item-image">
                      <Icon name="image" size={60} />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-brand">
                        {item.product.sellerName}
                      </div>
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-price">
                        {formatPrice(item.product.price)}
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </div>
                      <div className="cart-item-discount">
                        {CART_CONSTANTS.ITEM.DISCOUNT_PREFIX}{" "}
                        {formatPrice(Math.floor(item.product.price * 0.8))}원
                      </div>
                      <div className="cart-item-option">
                        {CART_CONSTANTS.ITEM.OPTION_SAMPLE}
                      </div>
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Icon name="remove" size={36} />
                    </button>
                  </div>

                  {/* 컬럼 2: 수량 조절 */}
                  <div className="cart-item-controls">
                    <button
                      className="cart-quantity-button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Icon name="minus" size={30} color="#33363F" />
                    </button>
                    <div className="cart-quantity-display">{item.quantity}</div>
                    <button
                      className="cart-quantity-button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Icon name="plus" size={30} color="#33363F" />
                    </button>
                  </div>

                  {/* 컬럼 3: 총 가격 */}
                  <div className="cart-item-price-total">
                    <div className="cart-price-amount">
                      {formatPrice(
                        Math.floor(item.product.price * 0.8 * item.quantity)
                      )}
                      {CART_CONSTANTS.SUMMARY.CURRENCY}
                    </div>
                    <button className="cart-item-order-button">
                      {CART_CONSTANTS.ITEM.ORDER_BUTTON}
                    </button>
                  </div>

                  {/* 컬럼 4: 배송 정보 */}
                  <div className="cart-item-shipping">
                    <div className="cart-shipping-info">
                      {CART_CONSTANTS.SHIPPING.FEE_TEXT}
                    </div>
                    <div className="cart-shipping-detail">
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_1}
                      <br />
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_2}
                      <br />
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_3}
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-actions">
                <button className="cart-action-button" onClick={clearCart}>
                  {CART_CONSTANTS.ACTIONS.REMOVE_SELECTED}
                </button>
                <button className="cart-action-button">
                  {CART_CONSTANTS.ACTIONS.REMOVE_SOLD_OUT}
                </button>
                <div className="cart-notice">
                  {CART_CONSTANTS.ACTIONS.NOTICE}
                </div>
              </div>

              <div className="cart-line"></div>
              <div className="cart-summary">
                <div className="cart-summary-content">
                  <div className="cart-summary-item">
                    <span className="cart-summary-label">
                      {CART_CONSTANTS.SUMMARY.TOTAL_ORDER_LABEL}
                    </span>
                    <div>
                      <span className="cart-summary-amount">
                        {formatPrice(getTotalPrice())}
                      </span>
                      <span className="cart-summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart-summary-operator">
                    <Icon name="plusCircle" size={40} />
                  </div>

                  <div className="cart-summary-item">
                    <span className="cart-summary-label">
                      {CART_CONSTANTS.SUMMARY.SHIPPING_LABEL}
                    </span>
                    <div>
                      <span className="cart-summary-amount">
                        {CART_CONSTANTS.SUMMARY.SHIPPING_FEE_TEXT}
                      </span>
                      <span className="cart-summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart-summary-operator">
                    <Icon name="minusCircle" size={40} />
                  </div>

                  <div className="cart-summary-item">
                    <span className="cart-summary-label">
                      {CART_CONSTANTS.SUMMARY.DISCOUNT_LABEL}
                    </span>
                    <div>
                      <span className="cart-summary-amount discount">
                        {formatPrice(Math.floor(getTotalPrice() * 0.2))}
                      </span>
                      <span className="cart-summary-currency discount">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart-summary-operator">
                    <Icon name="equalCircle" size={40} />
                  </div>

                  <div className="cart-summary-item">
                    <span className="cart-summary-label">
                      {CART_CONSTANTS.SUMMARY.TOTAL_PAYMENT_LABEL}
                    </span>
                    <div>
                      <span className="cart-summary-amount">
                        {formatPrice(Math.floor(getTotalPrice() * 0.8) + 6000)}
                      </span>
                      <span className="cart-summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart-order-buttons">
                <button
                  className="cart-order-button-secondary"
                  onClick={() => navigate("/products")}
                >
                  {CART_CONSTANTS.ORDER_BUTTONS.CONTINUE}
                </button>
                <button
                  className="cart-order-button-primary"
                  onClick={handleCheckout}
                >
                  {CART_CONSTANTS.ORDER_BUTTONS.CHECKOUT}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
