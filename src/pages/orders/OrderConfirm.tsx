import React from "react";
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
    description: string;
    sellerName: string;
    categoryId: number;
    stock: number;
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
    phone: string;
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

const OrderConfirm: React.FC = () => {
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

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="order-confirm-container">
        {/* 진행 단계 */}
        <div className="order-confirm-progress">
          <span className="order-confirm-progress-item inactive">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-confirm-progress-divider"
          />
          <span className="order-confirm-progress-item inactive">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-confirm-progress-divider"
          />
          <span className="order-confirm-progress-item">
            {ORDER_CONFIRM_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        {/* 1. 주문 상품 정보 */}
        <div className="order-confirm-section">
          <div className="order-confirm-section-header">
            <div className="order-confirm-section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.PRODUCT_INFO}
            </div>
          </div>

          <div className="order-confirm-products">
            {orderConfirmData.orderData.items.map((item) => (
              <div key={item.product.id} className="order-confirm-product-item">
                <div className="order-confirm-product-image">
                  <Icon name="image" size={60} />
                </div>
                <div className="order-confirm-product-info">
                  <div className="order-confirm-product-brand">
                    {item.product.sellerName}
                  </div>
                  <div className="order-confirm-product-name">
                    {item.product.name}
                  </div>
                  <div className="order-confirm-product-option">
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.OPTION}
                  </div>
                  <div className="order-confirm-product-price">
                    {formatPrice(
                      Math.floor(item.product.price * 0.8 * item.quantity)
                    )}
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.CURRENCY}
                  </div>
                </div>
                <div className="order-confirm-product-quantity">
                  <span className="order-confirm-product-quantity-number">
                    {item.quantity}
                  </span>
                  <span className="order-confirm-product-quantity-unit">
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                  </span>
                </div>
                <div className="order-confirm-product-status">
                  <div className="order-confirm-product-status-text">
                    {ORDER_CONFIRM_CONSTANTS.PRODUCT.STATUS}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 주문자 정보 */}
        <div className="order-confirm-section">
          <div className="order-confirm-section-header">
            <div className="order-confirm-section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.ORDERER_INFO}
            </div>
          </div>

          <div className="order-confirm-user-info">
            <div className="order-confirm-user-item">
              <div className="order-confirm-user-label">
                {ORDER_CONFIRM_CONSTANTS.USER.NAME}
              </div>
              <div className="order-confirm-user-value">
                {orderConfirmData.ordererInfo.name}
              </div>
            </div>
            <div className="order-confirm-user-item">
              <div className="order-confirm-user-label">
                {ORDER_CONFIRM_CONSTANTS.USER.PHONE}
              </div>
              <div className="order-confirm-user-value">
                {orderConfirmData.ordererInfo.phone}
              </div>
            </div>
            <div className="order-confirm-user-item">
              <div className="order-confirm-user-label">
                {ORDER_CONFIRM_CONSTANTS.USER.EMAIL}
              </div>
              <div className="order-confirm-user-value">
                {orderConfirmData.ordererInfo.email}
              </div>
            </div>
          </div>
        </div>

        {/* 3. 배송지 정보 */}
        <div className="order-confirm-section">
          <div className="order-confirm-section-header">
            <div className="order-confirm-section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.SHIPPING_INFO}
            </div>
          </div>

          <div className="order-confirm-shipping-info">
            <div className="order-confirm-shipping-item">
              <div className="order-confirm-shipping-label">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.LABELS.RECIPIENT}
              </div>
              <div className="order-confirm-shipping-value">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.VALUES.RECIPIENT}
              </div>
            </div>
            <div className="order-confirm-shipping-item">
              <div className="order-confirm-shipping-label">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.LABELS.PHONE}
              </div>
              <div className="order-confirm-shipping-value">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.VALUES.PHONE}
              </div>
            </div>
            <div className="order-confirm-shipping-item">
              <div className="order-confirm-shipping-label">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.LABELS.ADDRESS}
              </div>
              <div className="order-confirm-shipping-value">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.VALUES.ADDRESS}
              </div>
              <div className="order-confirm-shipping-edit">
                <div className="order-confirm-shipping-edit-text">
                  {ORDER_CONFIRM_CONSTANTS.SHIPPING.CHANGE}
                </div>
              </div>
            </div>
            <div className="order-confirm-shipping-item">
              <div className="order-confirm-shipping-label">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.LABELS.REQUEST}
              </div>
              <div className="order-confirm-shipping-value">
                {ORDER_CONFIRM_CONSTANTS.SHIPPING.VALUES.REQUEST}
              </div>
            </div>
          </div>
        </div>

        {/* 4. 결제 정보 */}
        <div className="order-confirm-section">
          <div className="order-confirm-section-header">
            <div className="order-confirm-section-title">
              {ORDER_CONFIRM_CONSTANTS.SECTION.PAYMENT_INFO}
            </div>
          </div>

          <div className="order-confirm-payment-info">
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.METHOD}
              </div>
              <div className="order-confirm-payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.METHOD}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.STATUS}
              </div>
              <div className="order-confirm-payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.STATUS}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.ORDER_TIME}
              </div>
              <div className="order-confirm-payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.ORDER_TIME}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.COMPLETE_TIME}
              </div>
              <div className="order-confirm-payment-value">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.COMPLETE_TIME}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.SHIPPING_FEE}
              </div>
              <div className="order-confirm-payment-value">
                {formatPrice(orderConfirmData.amounts.shippingFee)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.TOTAL_AMOUNT}
              </div>
              <div className="order-confirm-payment-value">
                {formatPrice(orderConfirmData.amounts.finalAmount)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
            <div className="order-confirm-payment-item">
              <div className="order-confirm-payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.RECEIPT}
              </div>
              <div
                className="order-confirm-payment-receipt-button"
                onClick={handlePrintReceipt}
              >
                <div className="order-confirm-payment-receipt-button-text">
                  {ORDER_CONFIRM_CONSTANTS.PAYMENT.VALUES.PRINT_RECEIPT}
                </div>
              </div>
            </div>
          </div>

          <div className="order-confirm-notice">
            <div className="order-confirm-notice-text">
              {ORDER_CONFIRM_CONSTANTS.NOTICE.OUT_OF_STOCK}
              <br />
              {ORDER_CONFIRM_CONSTANTS.NOTICE.DETAIL_IN_MYPAGE}
            </div>
          </div>
        </div>

        {/* 5. 하단 버튼 */}
        <div className="order-confirm-buttons">
          <div
            className="order-confirm-button order-confirm-button-secondary"
            onClick={handleContinueShopping}
          >
            <div className="order-confirm-button-text">
              {ORDER_CONFIRM_CONSTANTS.BUTTONS.CONTINUE_SHOPPING}
            </div>
          </div>
          <div
            className="order-confirm-button order-confirm-button-primary"
            onClick={handleOrderInquiry}
          >
            <div className="order-confirm-button-text">
              {ORDER_CONFIRM_CONSTANTS.BUTTONS.ORDER_INQUIRY}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirm;
