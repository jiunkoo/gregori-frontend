import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ProductResponseDto } from "@models";
import { Icon, Layout } from "@components";
import { CART_CONSTANTS } from "@constants";
import "@styles/cart.css";

interface CartItem {
  product: ProductResponseDto;
  quantity: number;
  checked?: boolean;
}

const Cart = () => {
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
        <main className="cart">
          <div className="cart__empty">
            <div className="cart__empty-icon">
              <Icon name="loading" size={48} />
            </div>
            <p>{CART_CONSTANTS.LOADING_TEXT}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="cart">
        <div className="cart__progress">
          <span className="cart__progress-item">
            {CART_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="cart__progress-divider"
            color="black"
          />
          <span className="cart__progress-item cart__progress-item--inactive">
            {CART_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="cart__progress-divider"
            color="black"
          />
          <span className="cart__progress-item cart__progress-item--inactive">
            {CART_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        <div className="cart__main">
          {cartItems.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">
                <Icon name="cart" size={48} />
              </div>
              <h2 className="cart__empty-title">
                {CART_CONSTANTS.EMPTY.TITLE}
              </h2>
              <p className="cart__empty-description">
                {CART_CONSTANTS.EMPTY.DESCRIPTION}
              </p>
              <Link to="/products" className="cart__continue-button">
                <Icon name="shopping" size={24} />
                {CART_CONSTANTS.EMPTY.CONTINUE}
              </Link>
            </div>
          ) : (
            <div className="cart__section">
              <div className="cart__line"></div>
              <div className="cart__section-header">
                <button
                  type="button"
                  className="cart__checkbox-button"
                  onClick={toggleAllCheck}
                  aria-label="전체 선택"
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
                <div key={item.product.id} className="cart__item">
                  <div className="cart__item-product">
                    <button
                      type="button"
                      className="cart__checkbox-button"
                      onClick={() => toggleItemCheck(item.product.id)}
                      aria-label={`${item.product.name} 선택`}
                    >
                      <Icon
                        name={item.checked ? "checkboxChecked" : "checkbox"}
                        size={30}
                      />
                    </button>

                    <div className="cart__item-image">
                      <Icon name="image" size={60} />
                    </div>

                    <div className="cart__item-info">
                      <div className="cart__item-brand">
                        {item.product.sellerName}
                      </div>
                      <div className="cart__item-name">{item.product.name}</div>
                      <div className="cart__item-price">
                        {formatPrice(item.product.price)}
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </div>
                      <div className="cart__item-discount">
                        {CART_CONSTANTS.ITEM.DISCOUNT_PREFIX}{" "}
                        {formatPrice(Math.floor(item.product.price * 0.8))}원
                      </div>
                      <div className="cart__item-option">
                        {CART_CONSTANTS.ITEM.OPTION_SAMPLE}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="cart__item-remove"
                      onClick={() => removeItem(item.product.id)}
                      aria-label={`${item.product.name} 삭제`}
                    >
                      <Icon name="remove" size={36} />
                    </button>
                  </div>

                  <div className="cart__item-controls">
                    <button
                      type="button"
                      className="cart__quantity-button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      aria-label="수량 감소"
                    >
                      <Icon name="minus" size={30} color="#33363F" />
                    </button>
                    <div className="cart__quantity-display">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      className="cart__quantity-button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label="수량 증가"
                    >
                      <Icon name="plus" size={30} color="#33363F" />
                    </button>
                  </div>

                  <div className="cart__item-price-total">
                    <div className="cart__price-amount">
                      {formatPrice(
                        Math.floor(item.product.price * 0.8 * item.quantity)
                      )}
                      {CART_CONSTANTS.SUMMARY.CURRENCY}
                    </div>
                    <button type="button" className="cart__item-order-button">
                      {CART_CONSTANTS.ITEM.ORDER_BUTTON}
                    </button>
                  </div>

                  <div className="cart__item-shipping">
                    <div className="cart__shipping-info">
                      {CART_CONSTANTS.SHIPPING.FEE_TEXT}
                    </div>
                    <div className="cart__shipping-detail">
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_1}
                      <br />
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_2}
                      <br />
                      {CART_CONSTANTS.SHIPPING.DETAIL_LINE_3}
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart__actions">
                <button
                  type="button"
                  className="cart__action-button"
                  onClick={clearCart}
                >
                  {CART_CONSTANTS.ACTIONS.REMOVE_SELECTED}
                </button>
                <button type="button" className="cart__action-button">
                  {CART_CONSTANTS.ACTIONS.REMOVE_SOLD_OUT}
                </button>
                <div className="cart__notice">
                  {CART_CONSTANTS.ACTIONS.NOTICE}
                </div>
              </div>

              <div className="cart__line"></div>
              <div className="cart__summary">
                <div className="cart__summary-content">
                  <div className="cart__summary-item">
                    <span className="cart__summary-label">
                      {CART_CONSTANTS.SUMMARY.TOTAL_ORDER_LABEL}
                    </span>
                    <div>
                      <span className="cart__summary-amount">
                        {formatPrice(getTotalPrice())}
                      </span>
                      <span className="cart__summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart__summary-operator">
                    <Icon name="plusCircle" size={40} />
                  </div>

                  <div className="cart__summary-item">
                    <span className="cart__summary-label">
                      {CART_CONSTANTS.SUMMARY.SHIPPING_LABEL}
                    </span>
                    <div>
                      <span className="cart__summary-amount">
                        {CART_CONSTANTS.SUMMARY.SHIPPING_FEE_TEXT}
                      </span>
                      <span className="cart__summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart__summary-operator">
                    <Icon name="minusCircle" size={40} />
                  </div>

                  <div className="cart__summary-item">
                    <span className="cart__summary-label">
                      {CART_CONSTANTS.SUMMARY.DISCOUNT_LABEL}
                    </span>
                    <div>
                      <span className="cart__summary-amount cart__summary-amount--discount">
                        {formatPrice(Math.floor(getTotalPrice() * 0.2))}
                      </span>
                      <span className="cart__summary-currency cart__summary-currency--discount">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>

                  <div className="cart__summary-operator">
                    <Icon name="equalCircle" size={40} />
                  </div>

                  <div className="cart__summary-item">
                    <span className="cart__summary-label">
                      {CART_CONSTANTS.SUMMARY.TOTAL_PAYMENT_LABEL}
                    </span>
                    <div>
                      <span className="cart__summary-amount">
                        {formatPrice(Math.floor(getTotalPrice() * 0.8) + 6000)}
                      </span>
                      <span className="cart__summary-currency">
                        {CART_CONSTANTS.SUMMARY.CURRENCY}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cart__order-buttons">
                <button
                  type="button"
                  className="cart__order-button cart__order-button--secondary"
                  onClick={() => navigate("/products")}
                >
                  {CART_CONSTANTS.ORDER_BUTTONS.CONTINUE}
                </button>
                <button
                  type="button"
                  className="cart__order-button cart__order-button--primary"
                  onClick={handleCheckout}
                >
                  {CART_CONSTANTS.ORDER_BUTTONS.CHECKOUT}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Cart;
