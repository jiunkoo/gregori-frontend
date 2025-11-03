import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { productAPI } from "@api/product";
import { useAuthStore } from "@stores/authStore";
import { ProductResponseDto } from "@models";
import { Icon, Layout } from "@components";
import { PRODUCT_DETAIL_CONSTANTS, COLORS } from "@constants";
import "@styles/product-detail.css";

interface DiscountItemProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
  name: string;
  amount: string;
  hasDownload?: boolean;
  downloadText?: string;
  hasDetails?: boolean;
  detailsText?: string;
}

const DiscountItem = ({
  label,
  isChecked,
  onToggle,
  name,
  amount,
  hasDownload,
  downloadText,
  hasDetails,
  detailsText,
}: DiscountItemProps) => (
  <div className="product-detail__discount-item">
    <span className="product-detail__discount-label">{label}</span>
    <button
      type="button"
      className="product-detail__discount-checkbox"
      onClick={onToggle}
    >
      <Icon
        name={isChecked ? "checkboxChecked" : "checkbox"}
        size={28}
        color={isChecked ? "var(--color-black)" : "var(--color-gray-medium)"}
      />
    </button>
    {hasDownload ? (
      <div className="product-detail__coupon-item">
        <button type="button" className="product-detail__coupon-download">
          <Icon
            name="download"
            size={24}
            className="product-detail__coupon-icon"
          />
          {downloadText}
        </button>
        <span className="product-detail__coupon-name">{name}</span>
      </div>
    ) : (
      <span className="product-detail__discount-name">
        {name}
        {hasDetails && (
          <span className="product-detail__discount-details">
            {detailsText}
          </span>
        )}
      </span>
    )}
    <span
      className={`product-detail__discount-amount ${
        !isChecked ? "product-detail__discount-amount--disabled" : ""
      }`}
    >
      {amount}
    </span>
  </div>
);

const ProductDetail = () => {
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
        <main className="product-detail">
          <div className="product-detail__loading">
            <div className="product-detail__loading-spinner"></div>
            <p className="product-detail__loading-text">
              {PRODUCT_DETAIL_CONSTANTS.LOADING.MESSAGE}
            </p>
          </div>
        </main>
      </Layout>
    );
  }

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

  return (
    <Layout>
      <main className="product-detail">
        <div className="product-detail__main">
          <div className="product-detail__image-section">
            <button type="button" className="product-detail__nav-button">
              <Icon name="arrowLeft" size={20} />
            </button>
            <div className="product-detail__image-content">
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
              <button
                type="button"
                className="product-detail__wishlist-button"
                onClick={handleWishlistToggle}
              >
                <Icon
                  name="heart"
                  size={36}
                  className="product-detail__wishlist-icon"
                  color={isWishlisted ? COLORS.WISHLIST_ACTIVE : "currentColor"}
                />
              </button>
            </div>

            <div className="product-detail__rating">
              <div className="product-detail__stars">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    size={24}
                    className="product-detail__star"
                  />
                ))}
              </div>
              <span className="product-detail__review-link">
                {PRODUCT_DETAIL_CONSTANTS.REVIEW.LINK_TEXT}
              </span>
            </div>

            <div className="product-detail__price-section">
              <div className="product-detail__price">
                {formatPrice(product.price)}
                {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
              </div>
              <button type="button" className="product-detail__coupon-button">
                {PRODUCT_DETAIL_CONSTANTS.COUPON.GET_COUPON}
                <Icon
                  name="download"
                  size={32}
                  className="product-detail__coupon-icon"
                />
              </button>
            </div>

            <div className="product-detail__points">
              {PRODUCT_DETAIL_CONSTANTS.PRICE.POINTS_TEXT}
            </div>

            <div className="product-detail__member-price">
              <span>{PRODUCT_DETAIL_CONSTANTS.PRICE.MEMBER_PRICE_LABEL}</span>
              <div className="product-detail__member-price-value">
                <span className="product-detail__discount-percent">
                  {PRODUCT_DETAIL_CONSTANTS.PRICE.DISCOUNT_PERCENT}
                </span>
                <span className="product-detail__member-price-amount">
                  {PRODUCT_DETAIL_CONSTANTS.PRICE.MEMBER_PRICE_AMOUNT}
                </span>
              </div>
            </div>

            <div className="product-detail__discount-section">
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

            <div className="product-detail__options">
              <div className="product-detail__option-group">
                <div
                  className="product-detail__option-header"
                  onClick={() => setSizeOpen(!sizeOpen)}
                >
                  <span className="product-detail__option-label">
                    {PRODUCT_DETAIL_CONSTANTS.OPTIONS.SIZE_LABEL}
                  </span>
                  <Icon
                    name="arrowDown"
                    size={16}
                    className={`product-detail__option-arrow ${
                      sizeOpen ? "product-detail__option-arrow--open" : ""
                    }`}
                  />
                </div>
                <div
                  className={`product-detail__option-items ${
                    sizeOpen ? "product-detail__option-items--open" : ""
                  }`}
                >
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className={`product-detail__option-item ${
                        selectedSize === size
                          ? "product-detail__option-item--selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedSize(size);
                        if (!selectedColor) setSelectedColor(colors[0]);
                        setSizeOpen(false);
                      }}
                    >
                      <span className="product-detail__option-text">
                        {size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-detail__option-group">
                <div
                  className={`product-detail__option-header ${
                    !selectedSize
                      ? "product-detail__option-header--disabled"
                      : ""
                  }`}
                  onClick={() => selectedSize && setColorOpen(!colorOpen)}
                >
                  <span className="product-detail__option-label">
                    {PRODUCT_DETAIL_CONSTANTS.OPTIONS.COLOR_LABEL}
                    {selectedColor ? ` - ${selectedColor}` : ""}
                  </span>
                  <Icon
                    name="arrowDown"
                    size={16}
                    className={`product-detail__option-arrow ${
                      colorOpen ? "product-detail__option-arrow--open" : ""
                    }`}
                  />
                </div>
                <div
                  className={`product-detail__option-items ${
                    colorOpen && selectedSize
                      ? "product-detail__option-items--open"
                      : ""
                  }`}
                >
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`product-detail__option-item ${
                        selectedColor === color
                          ? "product-detail__option-item--selected"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedSize) {
                          setSelectedColor(color);
                          setColorOpen(false);
                        }
                      }}
                    >
                      <span className="product-detail__option-text">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedSize && selectedColor && (
              <>
                <div className="product-detail__cart-section">
                  <div className="product-detail__cart-item">
                    <span className="product-detail__cart-option">
                      {selectedSize} / {selectedColor}
                    </span>
                    <div className="product-detail__cart-controls">
                      <button
                        type="button"
                        className="product-detail__cart-button"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <Icon
                          name="minus"
                          size={30}
                          color={COLORS.ICON_DEFAULT}
                        />
                      </button>
                      <div className="product-detail__cart-quantity">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        className="product-detail__cart-button"
                        onClick={() => handleQuantityChange(1)}
                      >
                        <Icon
                          name="plus"
                          size={30}
                          color={COLORS.ICON_DEFAULT}
                        />
                      </button>
                    </div>
                    <span className="product-detail__cart-price">
                      {formatPrice(product.price)}
                      {PRODUCT_DETAIL_CONSTANTS.PRICE.CURRENCY}
                    </span>
                    <Icon
                      name="remove"
                      size={28}
                      className="product-detail__cart-remove"
                    />
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
              </>
            )}

            <div className="product-detail__order-buttons">
              <button
                type="button"
                className="product-detail__order-button"
                disabled={!selectedSize || !selectedColor}
              >
                {PRODUCT_DETAIL_CONSTANTS.CART.ADD_TO_CART}
              </button>
              <button
                type="button"
                className="product-detail__order-button product-detail__order-button--primary"
                onClick={handleOrder}
                disabled={!selectedSize || !selectedColor}
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
