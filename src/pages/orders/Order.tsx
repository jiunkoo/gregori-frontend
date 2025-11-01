import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductResponseDto } from "@models";
import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import { ORDER_CONSTANTS } from "@constants";
import "@styles/order.css";

interface CartItem {
  product: ProductResponseDto;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  totalAmount: number;
}

const Order: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = (location.state as OrderData) || {
    items: [
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
      },
    ],
    totalAmount: 2026500,
  };

  // 주문자 정보 상태
  const [ordererInfo] = useState({
    name: "Koubit",
    phone: "010-1***-1***",
    email: "j*******@g*******.com",
  });

  // 배송지 정보 상태
  const [shippingInfo, setShippingInfo] = useState({
    type: "default", // 'default', 'new'
    name: "",
    recipient: "",
    address: "",
    detailAddress: "",
    phone1: "",
    phone2: "",
    request: "",
    setAsDefault: false,
  });

  // 쿠폰/마일리지 상태
  const [couponInfo, setCouponInfo] = useState({
    bonusCoupon: "사용 가능 쿠폰 3장 / 보유 4장",
    brandCoupon: "적용 가능한 쿠폰이 없습니다.",
    miles: 0,
    milesUsed: 0,
  });

  // 결제 방법 상태
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // 주문동의 상태
  const [agreements, setAgreements] = useState({
    all: false,
    personalInfo: false,
    thirdParty: false,
    payment: false,
  });

  // 금액 계산
  const calculateAmounts = () => {
    const totalProductAmount = orderData?.totalAmount || 0;
    const discountAmount = Math.floor(totalProductAmount * 0.2); // 20% 할인
    const shippingFee = 6000;
    const couponDiscount = 243180; // 쿠폰 할인
    const milesDiscount = couponInfo.milesUsed;

    const finalAmount =
      totalProductAmount -
      discountAmount -
      couponDiscount -
      milesDiscount +
      shippingFee;

    return {
      totalProductAmount,
      discountAmount,
      shippingFee,
      couponDiscount,
      milesDiscount,
      finalAmount,
    };
  };

  const amounts = calculateAmounts();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const handlePayment = () => {
    if (!agreements.all) {
      console.warn(ORDER_CONSTANTS.WARNINGS.AGREEMENT_REQUIRED);
      return;
    }

    // 결제 처리 로직
    console.log("결제 진행", {
      orderData,
      ordererInfo,
      shippingInfo,
      couponInfo,
      paymentMethod,
      agreements,
      amounts,
    });

    // 주문 확인 페이지로 이동
    navigate("/order-confirm", {
      state: {
        orderData,
        ordererInfo,
        shippingInfo,
        couponInfo,
        paymentMethod,
        agreements,
        amounts,
      },
    });
  };

  const handleAgreementChange = (
    type: keyof typeof agreements,
    checked: boolean
  ) => {
    if (type === "all") {
      setAgreements({
        all: checked,
        personalInfo: checked,
        thirdParty: checked,
        payment: checked,
      });
    } else {
      const newAgreements = { ...agreements, [type]: checked };
      newAgreements.all =
        newAgreements.personalInfo &&
        newAgreements.thirdParty &&
        newAgreements.payment;
      setAgreements(newAgreements);
    }
  };

  return (
    <Layout>
      <div className="order-container">
        <div className="order-progress">
          <span className="order-progress-item inactive">
            {ORDER_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-progress-divider"
            color="black"
          />
          <span className="order-progress-item">
            {ORDER_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order-progress-divider"
            color="black"
          />
          <span className="order-progress-item inactive">
            {ORDER_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.PRODUCT_INFO}
            </div>
          </div>

          <div className="order-products">
            {orderData.items.map((item) => (
              <div key={item.product.id} className="order-product-item">
                <div className="order-product-image">
                  <Icon name="image" size={60} />
                </div>
                <div className="order-product-info">
                  <div className="order-product-brand">
                    {item.product.sellerName}
                  </div>
                  <div className="order-product-name">{item.product.name}</div>
                  <div className="order-product-option">
                    {ORDER_CONSTANTS.PRODUCT.OPTION}
                  </div>
                  <div className="order-product-price">
                    {ORDER_CONSTANTS.PRODUCT.DISCOUNT}{" "}
                    {formatPrice(
                      Math.floor(item.product.price * 0.8 * item.quantity)
                    )}
                    {ORDER_CONSTANTS.PRODUCT.CURRENCY} / 수량 {item.quantity}
                    {ORDER_CONSTANTS.PRODUCT.QUANTITY}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.ORDERER_INFO}
            </div>
          </div>

          <div className="order-user-info">
            <div className="order-user-item">
              <div className="order-user-label">
                {ORDER_CONSTANTS.USER.NAME}
              </div>
              <div className="order-user-value">{ordererInfo.name}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </div>
              </div>
            </div>
            <div className="order-user-item">
              <div className="order-user-label">
                {ORDER_CONSTANTS.USER.PHONE}
              </div>
              <div className="order-user-value">{ordererInfo.phone}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </div>
              </div>
            </div>
            <div className="order-user-item">
              <div className="order-user-label">
                {ORDER_CONSTANTS.USER.EMAIL}
              </div>
              <div className="order-user-value">{ordererInfo.email}</div>
              <div className="order-user-edit">
                <div className="order-user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.SHIPPING_INFO}
            </div>
            <Icon name="question" size={30} className="order-question-icon" />
            <div className="order-section-required-text">
              {ORDER_CONSTANTS.SHIPPING.REQUIRED_TEXT}
            </div>
          </div>

          <div className="order-shipping-options">
            <div className="order-shipping-option">
              <Icon
                name={
                  shippingInfo.type === "default" ? "radioSelected" : "radio"
                }
                size={30}
                className="order-shipping-radio"
                onClick={() =>
                  setShippingInfo({ ...shippingInfo, type: "default" })
                }
              />
              <div className="order-shipping-label">
                {ORDER_CONSTANTS.SHIPPING.DEFAULT}
              </div>
            </div>
            <div className="order-shipping-option">
              <Icon
                name={shippingInfo.type === "new" ? "radioSelected" : "radio"}
                size={30}
                className="order-shipping-radio"
                onClick={() =>
                  setShippingInfo({ ...shippingInfo, type: "new" })
                }
              />
              <div className="order-shipping-label">
                {ORDER_CONSTANTS.SHIPPING.NEW}
              </div>
            </div>
            <div className="order-shipping-button">
              <div className="order-shipping-button-text">
                {ORDER_CONSTANTS.SHIPPING.LIST}
              </div>
            </div>
          </div>

          <div className="order-shipping-form">
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.NAME}
              </div>
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.NAME}
              />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.RECIPIENT}
              </div>
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.RECIPIENT}
              />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.ADDRESS}
              </div>
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.ADDRESS}
              />
              <input
                type="text"
                className="order-shipping-input"
                placeholder={
                  ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.DETAIL_ADDRESS
                }
              />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.PHONE1}
              </div>
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE}
              />
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_MIDDLE}
              />
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_LAST}
              />
            </div>
            <div className="order-shipping-input-group">
              <div className="order-shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.PHONE2}
              </div>
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE}
              />
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_MIDDLE}
              />
              <input
                type="text"
                className="order-shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_LAST}
              />
            </div>
            <div className="order-shipping-checkbox-group">
              <button
                className="order-shipping-checkbox-button"
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    setAsDefault: !shippingInfo.setAsDefault,
                  })
                }
              >
                <Icon
                  name={
                    shippingInfo.setAsDefault ? "checkboxChecked" : "checkbox"
                  }
                  size={30}
                />
              </button>
              <div className="order-shipping-checkbox-label">
                {ORDER_CONSTANTS.SHIPPING.SET_DEFAULT}
              </div>
            </div>
            <div className="order-shipping-input-group">
              <select className="order-shipping-select">
                <option>{ORDER_CONSTANTS.SHIPPING.REQUEST_PLACEHOLDER}</option>
                <option>
                  {ORDER_CONSTANTS.SHIPPING.REQUEST_OPTIONS.GUARD}
                </option>
                <option>{ORDER_CONSTANTS.SHIPPING.REQUEST_OPTIONS.DOOR}</option>
                <option>
                  {ORDER_CONSTANTS.SHIPPING.REQUEST_OPTIONS.DIRECT}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.COUPON_MILES}
            </div>
            <Icon
              name="question"
              size={30}
              className="order-question-icon"
              color="#33363F"
            />
          </div>

          <div className="order-coupon-section">
            <div className="order-coupon-item">
              <div className="order-coupon-label">
                {ORDER_CONSTANTS.COUPON.BONUS}
              </div>
              <div className="order-coupon-dropdown">
                <div className="order-coupon-dropdown-text">
                  {couponInfo.bonusCoupon}
                </div>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order-coupon-dropdown-arrow"
                  color="black"
                />
              </div>
            </div>
            <div className="order-coupon-item">
              <div className="order-coupon-label">
                {ORDER_CONSTANTS.COUPON.BRAND}
              </div>
              <div className="order-coupon-dropdown">
                <div className="order-coupon-dropdown-text disabled">
                  {couponInfo.brandCoupon}
                </div>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order-coupon-dropdown-arrow"
                  color="#747474"
                />
              </div>
            </div>
            <div className="order-miles-info">
              <div className="order-miles-label">
                {ORDER_CONSTANTS.COUPON.MILES}
              </div>
              <input
                type="number"
                className="order-miles-input"
                value={couponInfo.milesUsed}
                onChange={(e) =>
                  setCouponInfo({
                    ...couponInfo,
                    milesUsed: parseInt(e.target.value) || 0,
                  })
                }
              />
              <div className="order-miles-button">
                <div className="order-miles-button-text">
                  {ORDER_CONSTANTS.COUPON.USE_ALL}
                </div>
              </div>
              <div className="order-miles-info-text">
                {ORDER_CONSTANTS.COUPON.AVAILABLE}{" "}
                <span className="order-miles-info-text">
                  {couponInfo.milesUsed}
                </span>
                p /
                <span className="order-miles-info-text gray">
                  {" "}
                  {ORDER_CONSTANTS.COUPON.HOLD} 0p
                </span>
              </div>
              <Icon
                name="question"
                size={30}
                className="order-question-icon"
                color="#33363F"
              />
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.PAYMENT_DETAIL}
            </div>
          </div>

          <div className="order-payment-detail">
            <div className="order-payment-item">
              <div className="order-payment-label">
                {ORDER_CONSTANTS.PAYMENT.TOTAL_PRODUCT}
              </div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">
                  {formatPrice(amounts.totalProductAmount)}
                </div>
                <div className="order-payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">
                {ORDER_CONSTANTS.PAYMENT.COUPON_USE}
              </div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">
                  - {formatPrice(amounts.couponDiscount)}
                </div>
                <div className="order-payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">
                {ORDER_CONSTANTS.PAYMENT.MILES_USE}
              </div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">
                  - {formatPrice(amounts.milesDiscount)}
                </div>
                <div className="order-payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label">
                {ORDER_CONSTANTS.PAYMENT.SHIPPING_FEE}
              </div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text">
                  + {formatPrice(amounts.shippingFee)}
                </div>
                <div className="order-payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </div>
              </div>
            </div>
            <div className="order-payment-item">
              <div className="order-payment-label total">
                {ORDER_CONSTANTS.PAYMENT.TOTAL_AMOUNT}
              </div>
              <div className="order-payment-amount">
                <div className="order-payment-amount-text large">
                  {formatPrice(amounts.finalAmount)}
                </div>
                <div className="order-payment-amount-currency large">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.PAYMENT_METHOD}
            </div>
          </div>

          <div className="order-payment-notice">
            {ORDER_CONSTANTS.PAYMENT.NOTICE}
          </div>

          <div className="order-payment-methods">
            <div className="order-payment-method-row">
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "credit-card" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("credit-card")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.CREDIT_CARD}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "hyundai" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("hyundai")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.HYUNDAI}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "toss" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("toss")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.TOSS}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "naver" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("naver")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.NAVER}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "kakao" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("kakao")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.KAKAO}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "samsung" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("samsung")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SAMSUNG}
                </div>
              </div>
            </div>

            <div className="order-payment-method-row">
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "samsung2" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("samsung2")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SAMSUNG}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "payco" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("payco")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.PAYCO}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "ssg" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("ssg")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SSG}
                </div>
              </div>
              <div
                className={`order-payment-method-button ${
                  paymentMethod === "bank" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("bank")}
              >
                <div className="order-payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.BANK}
                </div>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="order-payment-method-dropdown">
                <div className="order-payment-method-dropdown-text">
                  {ORDER_CONSTANTS.PAYMENT.CARD_SELECT}
                </div>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order-payment-method-dropdown-arrow"
                  color="black"
                />
              </div>
            )}

            <div className="order-payment-benefits">
              <div className="order-payment-benefit">
                <div className="order-payment-benefit-button">
                  <div className="order-payment-benefit-button-text">
                    {ORDER_CONSTANTS.PAYMENT.BENEFIT}
                  </div>
                </div>
                <div className="order-payment-benefit-text">
                  {ORDER_CONSTANTS.PAYMENT.BENEFITS.TOSS}
                </div>
                <Icon
                  name="arrowRightSmall"
                  size={10}
                  className="order-payment-benefit-arrow"
                  color="black"
                />
              </div>
              <div className="order-payment-benefit">
                <div className="order-payment-benefit-button">
                  <div className="order-payment-benefit-button-text">
                    {ORDER_CONSTANTS.PAYMENT.BENEFIT}
                  </div>
                </div>
                <div className="order-payment-benefit-text">
                  {ORDER_CONSTANTS.PAYMENT.BENEFITS.KAKAO}
                </div>
                <Icon
                  name="arrowRightSmall"
                  size={10}
                  className="order-payment-benefit-arrow"
                  color="black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="order-section">
          <div className="order-section-header">
            <div className="order-section-title">
              {ORDER_CONSTANTS.SECTION.AGREEMENT}
            </div>
          </div>

          <div className="order-agreement">
            <div className="order-agreement-item">
              <button
                className="order-agreement-checkbox-button"
                onClick={() => handleAgreementChange("all", !agreements.all)}
              >
                <Icon
                  name={agreements.all ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <div className="order-agreement-text">
                {ORDER_CONSTANTS.AGREEMENT.ALL}
              </div>
            </div>
            <div className="order-agreement-item">
              <button
                className="order-agreement-checkbox-button"
                onClick={() =>
                  handleAgreementChange(
                    "personalInfo",
                    !agreements.personalInfo
                  )
                }
              >
                <Icon
                  name={
                    agreements.personalInfo ? "checkboxChecked" : "checkbox"
                  }
                  size={30}
                />
              </button>
              <div className="order-agreement-text small">
                {ORDER_CONSTANTS.AGREEMENT.PERSONAL_INFO}{" "}
                <span className="order-agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </span>
              </div>
            </div>
            <div className="order-agreement-item">
              <button
                className="order-agreement-checkbox-button"
                onClick={() =>
                  handleAgreementChange("thirdParty", !agreements.thirdParty)
                }
              >
                <Icon
                  name={agreements.thirdParty ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <div className="order-agreement-text small">
                {ORDER_CONSTANTS.AGREEMENT.THIRD_PARTY}{" "}
                <span className="order-agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </span>
              </div>
            </div>
            <div className="order-agreement-item">
              <button
                className="order-agreement-checkbox-button"
                onClick={() =>
                  handleAgreementChange("payment", !agreements.payment)
                }
              >
                <Icon
                  name={agreements.payment ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <div className="order-agreement-text small">
                {ORDER_CONSTANTS.AGREEMENT.PAYMENT}{" "}
                <span className="order-agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button className="order-payment-button" onClick={handlePayment}>
          <div className="order-payment-button-text">
            {ORDER_CONSTANTS.PAYMENT.PAY_BUTTON}
          </div>
        </button>
      </div>
    </Layout>
  );
};

export default Order;
