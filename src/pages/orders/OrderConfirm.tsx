import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@components/Layout";
import Icon from "@components/icons/SvgIcon";
import { ORDER_CONFIRM_CONSTANTS } from "@constants";
import "@styles/order-confirm.css";

interface CartItem {
  product: {
    sellerId: number;
    categoryName: string;
    id: number;
    name: string;
    price: number;
    sellerName: string;
    categoryId: number;
    stock: number;
    imageUrl?: string;
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

const OrderConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderConfirmData = location.state as OrderConfirmData;

  // 주문 정보가 없으면 홈으로 리다이렉트
  if (!orderConfirmData) {
    navigate("/");
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const handleOrderInquiry = () => {
    navigate("/orders");
  };

  return (
    <Layout>
      <main className="order-confirm">
        {/* 진행 단계 */}
        <div className="order-confirm__progress">
          <span className="order-confirm__progress-item order-confirm__progress-item--inactive">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-confirm__progress-divider"
          />
          <span className="order-confirm__progress-item order-confirm__progress-item--inactive">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-confirm__progress-divider"
          />
          <span className="order-confirm__progress-item">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        {/* 1. 주문 상품 정보 */}
        <div className="order-confirm__section">
          <div className="order-confirm__section-header">
            <h2 className="order-confirm__section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.PRODUCT_INFO}
            </h2>
          </div>

          <div className="order-confirm__products">
            {orderConfirmData.orderData.items.map((item) => (
              <div
                key={item.product.id}
                className="order-confirm__product-item"
              >
                <div className="order-confirm__product-image">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="order-confirm__product-image-src"
                    />
                  ) : (
                    <Icon name="image" size={60} />
                  )}
                </div>
                <div className="order-confirm__product-info">
                  <div className="order-confirm__product-brand">
                    {item.product.sellerName}
                  </div>
                  <div className="order-confirm__product-name">
                    {item.product.name}
                  </div>
                  <div className="order-confirm__product-price">
                    {formatPrice(item.product.price * item.quantity)}
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.CURRENCY}
                  </div>
                </div>
                <div className="order-confirm__product-quantity">
                  <span className="order-confirm__product-quantity-number">
                    {item.quantity}
                  </span>
                  <span className="order-confirm__product-quantity-unit">
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                  </span>
                </div>
                <div className="order-confirm__product-status">
                  <span className="order-confirm__product-status-text">
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.STATUS}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 주문자 정보 */}
        <div className="order-confirm__section">
          <div className="order-confirm__section-header">
            <h2 className="order-confirm__section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.ORDERER_INFO}
            </h2>
          </div>

          <div className="order-confirm__user-info">
            <div className="order-confirm__user-item">
              <div className="order-confirm__user-label">
                {ORDER_CONFIRM_CONSTANTS.USER.NAME}
              </div>
              <div className="order-confirm__user-value">
                {orderConfirmData.ordererInfo.name}
              </div>
            </div>
            <div className="order-confirm__user-item">
              <div className="order-confirm__user-label">
                {ORDER_CONFIRM_CONSTANTS.USER.EMAIL}
              </div>
              <div className="order-confirm__user-value">
                {orderConfirmData.ordererInfo.email}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 결제 정보 */}
        <div className="order-confirm__section">
          <div className="order-confirm__section-header">
            <h2 className="order-confirm__section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.PAYMENT_INFO}
            </h2>
          </div>

          <div className="order-confirm__payment-info">
            <div className="order-confirm__payment-item">
              <div className="order-confirm__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.METHOD}
              </div>
              <div className="order-confirm__payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.METHOD}
              </div>
            </div>
            <div className="order-confirm__payment-item">
              <div className="order-confirm__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.STATUS}
              </div>
              <div className="order-confirm__payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.STATUS}
              </div>
            </div>
            <div className="order-confirm__payment-item">
              <div className="order-confirm__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.ORDER_TIME}
              </div>
              <div className="order-confirm__payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.ORDER_TIME}
              </div>
            </div>
            <div className="order-confirm__payment-item">
              <div className="order-confirm__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.SHIPPING_FEE}
              </div>
              <div className="order-confirm__payment-value">
                {formatPrice(orderConfirmData.amounts.shippingFee)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
            <div className="order-confirm__payment-item">
              <div className="order-confirm__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.TOTAL_AMOUNT}
              </div>
              <div className="order-confirm__payment-value">
                {formatPrice(orderConfirmData.amounts.finalAmount)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
          </div>

          <div className="order-confirm__notice">
            <p className="order-confirm__notice-text">
              {ORDER_CONFIRM_CONSTANTS.NOTICE.OUT_OF_STOCK}
              <br />
              {ORDER_CONFIRM_CONSTANTS.NOTICE.DETAIL_IN_MYPAGE}
            </p>
          </div>
        </div>

        {/* 5. 하단 버튼 */}
        <div className="order-confirm__buttons">
          <button
            type="button"
            className="order-confirm__button order-confirm__button--secondary"
            onClick={handleContinueShopping}
          >
            <span className="order-confirm__button-text">
              {ORDER_CONFIRM_CONSTANTS.BUTTONS.CONTINUE_SHOPPING}
            </span>
          </button>
          <button
            type="button"
            className="order-confirm__button order-confirm__button--primary"
            onClick={handleOrderInquiry}
          >
            <span className="order-confirm__button-text">
              {ORDER_CONFIRM_CONSTANTS.BUTTONS.ORDER_INQUIRY}
            </span>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default OrderConfirm;
