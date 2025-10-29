import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { productAPI } from "@api/product";
import { useAuthStore } from "@stores/authStore";
import { ProductResponseDto } from "@models";
import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import { PRODUCT_DETAIL_CONSTANTS, COLORS } from "@constants";
import "@styles/product-detail.css";

// 할인 아이템 컴포넌트
const DiscountItem: React.FC<{
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  name: string;
  amount: string;
  hasDownload?: boolean;
  downloadText?: string;
  hasDetails?: boolean;
  detailsText?: string;
}> = ({
  label,
  isChecked,
  onToggle,
  name,
  amount,
  hasDownload,
  downloadText,
  hasDetails,
  detailsText,
}) => (
  <div className="product-detail-discount-item">
    <span className="product-detail-discount-label">{label}</span>
    <button className="product-detail-discount-checkbox" onClick={onToggle}>
      <div className="product-detail-checkbox-box">
        <Icon
          name="checkbox"
          size={25}
          color={isChecked ? COLORS.CHECKBOX_ACTIVE : COLORS.CHECKBOX_INACTIVE}
        />
      </div>
      {isChecked && (
        <div className="product-detail-checkbox-check">
          <Icon name="check" size={15} color={COLORS.CHECKBOX_ACTIVE} />
        </div>
      )}
    </button>
    {hasDownload ? (
      <div className="product-detail-coupon-item">
        <button className="product-detail-coupon-download">
          <Icon
            name="download"
            size={24}
            className="product-detail-coupon-icon"
          />
          {downloadText}
        </button>
        <span className="product-detail-coupon-name">{name}</span>
      </div>
    ) : (
      <span className="product-detail-discount-name">
        {name}
        {hasDetails && (
          <span
            style={{ color: COLORS.DETAILS_LINK, textDecoration: "underline" }}
          >
            {detailsText}
          </span>
        )}
      </span>
    )}
    <span
      className={`product-detail-discount-amount ${
        !isChecked ? "disabled" : ""
      }`}
    >
      {amount}
    </span>
  </div>
);

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [discountStates, setDiscountStates] = useState({
    productDiscount: true,
    couponDiscount1: false,
    couponDiscount2: false,
    paymentDiscount1: false,
    paymentDiscount2: false,
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
      console.error(PRODUCT_DETAIL_CONSTANTS.ERROR.FETCH_FAILED, error);
      const dummyProduct: ProductResponseDto = {
        id: parseInt(productId),
        name: "DIGITAL WATCH",
        price: 405300,
        description:
          "고품질 디지털 워치로 스타일과 기능을 동시에 만족시켜드립니다. 다양한 기능과 세련된 디자인이 조화를 이룬 제품입니다.",
        stock: 100,
        categoryId: 1,
        categoryName: "액세서리",
        sellerId: 1,
        sellerName: "GREGORI",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
    setDiscountStates((prev) => ({
      ...prev,
      [discountType]: !prev[discountType],
    }));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate(PRODUCT_DETAIL_CONSTANTS.AUTH.LOGIN_REDIRECT);
      return;
    }

    if (!product) return;

    navigate(PRODUCT_DETAIL_CONSTANTS.ORDER_CONFIRM.ROUTE, {
      state: {
        productName: product.name,
        quantity,
        price: product.price,
        totalAmount: product.price * quantity,
      },
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const sizes = PRODUCT_DETAIL_CONSTANTS.OPTIONS.SIZES;
  const colors = PRODUCT_DETAIL_CONSTANTS.OPTIONS.COLORS;

  if (loading) {
    return (
      <Layout>
        {" "}
        <div className="product-detail-container">
          <div className="product-detail-loading">
            <div className="product-detail-loading-spinner"></div>
            <p className="product-detail-loading-text">
              {PRODUCT_DETAIL_CONSTANTS.LOADING.MESSAGE}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="product-detail-container">
          <div className="product-detail-error">
            <Icon
              name="error"
              size={24}
              className="product-detail-error-icon"
            />
            <p className="product-detail-error-text">
              {PRODUCT_DETAIL_CONSTANTS.ERROR.PRODUCT_NOT_FOUND}
            </p>
            <Link to="/" className="product-detail-error-button">
              <Icon
                name="arrowLeft"
                size={20}
                className="product-detail-back-icon"
              />
              {PRODUCT_DETAIL_CONSTANTS.NAVIGATION.BACK_TO_HOME}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-detail-container">
        <div className="product-detail-main">
          <div className="product-detail-image-section">
            <button className="product-detail-nav-button">
              <Icon name="arrowLeft" size={20} />
            </button>
            <div className="product-detail-image-content">
              <div className="product-detail-image-dots">
                <div className="product-detail-dot active"></div>
                <div className="product-detail-dot"></div>
                <div className="product-detail-dot"></div>
              </div>
            </div>
            <button className="product-detail-nav-button">
              <Icon name="arrowRight" size={20} />
            </button>
          </div>

          <div className="product-detail-info-section">
            <div className="product-detail-line"></div>
            <div className="product-detail-title">
              <h1>{product.name}</h1>
              <button
                className="product-detail-wishlist-button"
                onClick={handleWishlistToggle}
              >
                <Icon
                  name="heart"
                  size={36}
                  className="product-detail-wishlist-icon"
                  color={isWishlisted ? COLORS.WISHLIST_ACTIVE : "currentColor"}
                />
              </button>
            </div>

            <div className="product-detail-rating">
              <div className="product-detail-stars">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={24}
                    className="product-detail-star"
                  />
                ))}
              </div>
              <span className="product-detail-review-link">
                {PRODUCT_DETAIL_CONSTANTS.REVIEW.LINK_TEXT}
              </span>
            </div>

            <div className="product-detail-price-section">
              <div className="product-detail-price">
                {formatPrice(product.price)}
                {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
              </div>
              <button className="product-detail-coupon-button">
                {PRODUCT_DETAIL_CONSTANTS.COUPON.GET_COUPON}
                <Icon
                  name="download"
                  size={32}
                  className="product-detail-coupon-icon"
                />
              </button>
            </div>

            <div className="product-detail-points">
              {PRODUCT_DETAIL_CONSTANTS.PRICE.POINTS_TEXT}
            </div>

            <div className="product-detail-divider"></div>

            <div className="product-detail-member-price">
              <span>{PRODUCT_DETAIL_CONSTANTS.PRICE.MEMBER_PRICE_LABEL}</span>
              <div className="product-detail-member-price-value">
                <span className="product-detail-discount-percent">
                  {PRODUCT_DETAIL_CONSTANTS.PRICE.DISCOUNT_PERCENT}
                </span>
                <span className="product-detail-member-price-amount">
                  {PRODUCT_DETAIL_CONSTANTS.PRICE.MEMBER_PRICE_AMOUNT}
                </span>
              </div>
            </div>

            <div className="product-detail-discount-section">
              <DiscountItem
                label={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.PRODUCT_DISCOUNT}
                isChecked={discountStates.productDiscount}
                onToggle={() => handleDiscountToggle("productDiscount")}
                name={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.BASIC_DISCOUNT}
                amount={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.AMOUNTS.BASIC}
              />

              <DiscountItem
                label={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.COUPON_DISCOUNT}
                isChecked={discountStates.couponDiscount1}
                onToggle={() => handleDiscountToggle("couponDiscount1")}
                name={PRODUCT_DETAIL_CONSTANTS.COUPON.GREEN_MEMBER}
                amount={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.AMOUNTS.GREEN_COUPON}
                hasDownload
                downloadText={PRODUCT_DETAIL_CONSTANTS.COUPON.DOWNLOAD}
              />

              <DiscountItem
                label={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.COUPON_DISCOUNT}
                isChecked={discountStates.couponDiscount2}
                onToggle={() => handleDiscountToggle("couponDiscount2")}
                name={PRODUCT_DETAIL_CONSTANTS.COUPON.CHUSEOK}
                amount={
                  PRODUCT_DETAIL_CONSTANTS.DISCOUNT.AMOUNTS.CHUSEOK_COUPON
                }
                hasDownload
                downloadText={PRODUCT_DETAIL_CONSTANTS.COUPON.DOWNLOAD}
              />

              <DiscountItem
                label={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.PAYMENT_DISCOUNT}
                isChecked={discountStates.paymentDiscount1}
                onToggle={() => handleDiscountToggle("paymentDiscount1")}
                name={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.MILEAGE_USE}
                amount={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.AMOUNTS.MILEAGE}
              />

              <DiscountItem
                label={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.PAYMENT_DISCOUNT}
                isChecked={discountStates.paymentDiscount2}
                onToggle={() => handleDiscountToggle("paymentDiscount2")}
                name={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.SAMSUNG_PAY}
                amount={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.AMOUNTS.SAMSUNG_PAY}
                hasDetails
                detailsText={PRODUCT_DETAIL_CONSTANTS.DISCOUNT.DETAILS}
              />
            </div>

            <div className="product-detail-shipping">
              <div className="product-detail-shipping-item">
                <span className="product-detail-shipping-label">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.LABEL}
                </span>
                <div className="product-detail-shipping-content">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.FREE_SHIPPING_TEXT}
                  <br />
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.ISLAND_SHIPPING_TEXT}
                </div>
              </div>
              <div className="product-detail-shipping-item">
                <span className="product-detail-shipping-label">
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.SCHEDULE_LABEL}
                </span>
                <div className="product-detail-shipping-content">
                  <span className="product-detail-shipping-highlight">
                    {PRODUCT_DETAIL_CONSTANTS.SHIPPING.DELIVERY_TIME}
                  </span>{" "}
                  {PRODUCT_DETAIL_CONSTANTS.SHIPPING.DELIVERY_TIME_TEXT}
                </div>
              </div>
            </div>

            {/* <div className="product-detail-divider"></div> */}

            <div className="product-detail-options">
              <div className="product-detail-option-group">
                <div
                  className="product-detail-option-header"
                  onClick={() => setSizeOpen(!sizeOpen)}
                >
                  <span className="product-detail-option-title">
                    {PRODUCT_DETAIL_CONSTANTS.OPTIONS.SIZE_LABEL}
                  </span>
                  <Icon
                    name="dropdownArrow"
                    size={16}
                    className={`product-detail-option-arrow ${
                      sizeOpen ? "open" : ""
                    }`}
                  />
                </div>
                <div
                  className={`product-detail-option-items ${
                    sizeOpen ? "open" : ""
                  }`}
                >
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className={`product-detail-option-item ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(size);
                        if (!selectedColor) setSelectedColor(colors[0]);
                        setSizeOpen(false);
                      }}
                    >
                      <span className="product-detail-option-label">
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-detail-option-group">
                <div
                  className={`product-detail-option-header ${
                    !selectedSize ? "disabled" : ""
                  }`}
                  onClick={() => selectedSize && setColorOpen(!colorOpen)}
                >
                  <span className="product-detail-option-title">
                    {PRODUCT_DETAIL_CONSTANTS.OPTIONS.COLOR_LABEL}
                    {selectedColor ? ` - ${selectedColor}` : ""}
                  </span>
                  <Icon
                    name="dropdownArrow"
                    size={16}
                    className={`product-detail-option-arrow ${
                      colorOpen ? "open" : ""
                    }`}
                  />
                </div>
                <div
                  className={`product-detail-option-items ${
                    colorOpen && selectedSize ? "open" : ""
                  }`}
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`product-detail-option-item ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      onClick={() => {
                        if (selectedSize) {
                          setSelectedColor(color);
                          setColorOpen(false);
                        }
                      }}
                    >
                      <span className="product-detail-option-label">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-detail-divider"></div>

            {selectedSize && selectedColor && (
              <>
                <div className="product-detail-cart-section">
                  <div className="product-detail-cart-item">
                    <span className="product-detail-cart-option">
                      {selectedSize} / {selectedColor}
                    </span>
                    <div className="product-detail-cart-controls">
                      <button
                        className="product-detail-cart-button"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <Icon
                          name="minus"
                          size={30}
                          color={COLORS.ICON_DEFAULT}
                        />
                      </button>
                      <div className="product-detail-cart-quantity">
                        {quantity}
                      </div>
                      <button
                        className="product-detail-cart-button"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Icon
                          name="plus"
                          size={30}
                          color={COLORS.ICON_DEFAULT}
                        />
                      </button>
                    </div>
                    <span className="product-detail-cart-price">
                      {formatPrice(product.price)}
                      {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
                    </span>
                    <Icon
                      name="close"
                      size={20}
                      className="product-detail-cart-remove"
                    />
                  </div>
                </div>

                <div className="product-detail-total">
                  <span className="product-detail-total-label">
                    {PRODUCT_DETAIL_CONSTANTS.CART.TOTAL_LABEL}
                  </span>
                  <span className="product-detail-total-price">
                    {formatPrice(product.price * quantity)}
                    {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
                  </span>
                </div>
              </>
            )}

            <div className="product-detail-order-buttons">
              <button
                className="product-detail-order-button"
                disabled={!selectedSize || !selectedColor}
              >
                {PRODUCT_DETAIL_CONSTANTS.CART.ADD_TO_CART}
              </button>
              <button
                className="product-detail-order-button primary"
                onClick={handleOrder}
                disabled={!selectedSize || !selectedColor}
              >
                {PRODUCT_DETAIL_CONSTANTS.CART.ORDER_NOW}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
