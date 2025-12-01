import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { productAPI } from "@api/product";
import { useAuthStore } from "@stores/authStore";
import { ProductResponseDto } from "@models";
import { Icon, Layout } from "@components";
import { PRODUCT_DETAIL_CONSTANTS, COLORS } from "@constants";
import "@styles/product-detail.css";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;

    try {
      const data = await productAPI.getProduct(parseInt(productId));
      setProduct(data);
    } catch (error) {
      console.error(PRODUCT_DETAIL_CONSTANTS.ERROR.FETCH_FAILED, error);
      setProduct(null);
    } finally {
      // no-op: loading UI 제거
    }
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate(PRODUCT_DETAIL_CONSTANTS.AUTH.LOGIN_REDIRECT);
      return;
    }

    if (!product) return;

    navigate("/order", {
      state: {
        items: [
          {
            product,
            quantity,
          },
        ],
        totalAmount: product.price * quantity,
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (!product) {
    return (
      <Layout>
        <main className="product-detail">
          <div className="product-detail__error">
            <Icon
              name="error"
              size={24}
              className="product-detail__error-icon"
            />
            <p className="product-detail__error-text">
              {PRODUCT_DETAIL_CONSTANTS.ERROR.PRODUCT_NOT_FOUND}
            </p>
            <Link to="/" className="product-detail__error-button">
              <Icon
                name="arrowLeft"
                size={20}
                className="product-detail__back-icon"
              />
              {PRODUCT_DETAIL_CONSTANTS.NAVIGATION.BACK_TO_HOME}
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const imageSectionStyle = product.imageUrl
    ? {
        backgroundImage: `url(${product.imageUrl})`,
      }
    : undefined;

  return (
    <Layout>
      <main className="product-detail">
        <div className="product-detail__main">
          <div
            className="product-detail__image-section"
            style={imageSectionStyle}
          >
            <button type="button" className="product-detail__nav-button">
              <Icon name="arrowLeft" size={20} />
            </button>
            <div className="product-detail__image-content">
              {!product.imageUrl && (
                <div className="product-detail__image-placeholder">
                  {PRODUCT_DETAIL_CONSTANTS.IMAGE.PLACEHOLDER_TEXT}
                </div>
              )}
              <div className="product-detail__image-dots">
                <div className="product-detail__dot product-detail__dot--active"></div>
                <div className="product-detail__dot"></div>
                <div className="product-detail__dot"></div>
              </div>
            </div>
            <button type="button" className="product-detail__nav-button">
              <Icon name="arrowRight" size={20} />
            </button>
          </div>

          <div className="product-detail__info-section">
            <div className="product-detail__line"></div>
            <div className="product-detail__title">
              <h1>{product.name}</h1>
            </div>

            <div className="product-detail__price-section">
              <div className="product-detail__price">
                {formatPrice(product.price)}
                {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
              </div>
            </div>

            <div className="product-detail__shipping">
              <h3 className="product-detail__shipping-title">배송정보</h3>
              <div className="product-detail__shipping-item">
                <span className="product-detail__shipping-label">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.LABEL}
                </span>
                <div className="product-detail__shipping-content">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.FREE_SHIPPING_TEXT}
                  <br />
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.ISLAND_SHIPPING_TEXT}
                </div>
              </div>
              <div className="product-detail__shipping-item">
                <span className="product-detail__shipping-label">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.SCHEDULE_LABEL}
                </span>
                <div className="product-detail__shipping-content">
                  <span className="product-detail__shipping-highlight">
                    {PRODUCT_DETAIL_CONSTANTS.SHIPPING.DELIVERY_TIME}
                  </span>{" "}
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.DELIVERY_TIME_TEXT}
                </div>
              </div>
            </div>

            <div className="product-detail__cart-section">
              <div className="product-detail__cart-item">
                <span className="product-detail__cart-option">
                  {product.name}
                </span>
                <div className="product-detail__cart-controls">
                  <button
                    type="button"
                    className="product-detail__cart-button"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <Icon name="minus" size={30} color={COLORS.ICON_DEFAULT} />
                  </button>
                  <div className="product-detail__cart-quantity">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    className="product-detail__cart-button"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Icon name="plus" size={30} color={COLORS.ICON_DEFAULT} />
                  </button>
                </div>
                <span className="product-detail__cart-price">
                  {formatPrice(product.price * quantity)}
                  {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
                </span>
              </div>
            </div>
            <div className="product-detail__line"></div>
            <div className="product-detail__total">
              <span className="product-detail__total-label">
                {PRODUCT_DETAIL_CONSTANTS.CART.TOTAL_LABEL}
              </span>
              <span className="product-detail__total-price">
                <span className="product-detail__total-amount">
                  {formatPrice(product.price * quantity)}
                </span>
                {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
              </span>
            </div>

            <div className="product-detail__order-buttons">
              <button
                type="button"
                className="product-detail__order-button product-detail__order-button--primary"
                onClick={handleOrder}
                disabled={product.stock <= 0}
              >
                {PRODUCT_DETAIL_CONSTANTS.CART.ORDER_NOW}
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProductDetail;
