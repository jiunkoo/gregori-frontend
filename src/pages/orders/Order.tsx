import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductResponseDto } from "@models";
import { Icon, Layout } from "@components";
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

const Order = () => {
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

  const getCheckboxClassName = (checked: boolean) => {
    const classes = ["order__agreement-checkbox"];
    if (checked) classes.push("order__agreement-checkbox--checked");
    return classes.join(" ");
  };

  const getPaymentMethodClassName = (isSelected: boolean) => {
    const classes = ["order__payment-method-button"];
    if (isSelected) classes.push("order__payment-method-button--selected");
    return classes.join(" ");
  };

  return (
    <Layout>
      <main className="order">
        <div className="order__progress">
          <span className="order__progress-item order__progress-item--inactive">
            {ORDER_CONSTANTS.PROGRESS.STEP_1}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order__progress-divider"
            color="black"
          />
          <span className="order__progress-item">
            {ORDER_CONSTANTS.PROGRESS.STEP_2}
          </span>
          <Icon
            name="arrowRight"
            size={20}
            className="order__progress-divider"
            color="black"
          />
          <span className="order__progress-item order__progress-item--inactive">
            {ORDER_CONSTANTS.PROGRESS.STEP_3}
          </span>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.PRODUCT_INFO}
            </h2>
          </div>

          <div className="order__products">
            {orderData.items.map((item) => (
              <div key={item.product.id} className="order__product-item">
                <div className="order__product-image">
                  <Icon name="image" size={60} />
                </div>
                <div className="order__product-info">
                  <div className="order__product-brand">
                    {item.product.sellerName}
                  </div>
                  <div className="order__product-name">{item.product.name}</div>
                  <div className="order__product-option">
                    {ORDER_CONSTANTS.PRODUCT.OPTION}
                  </div>
                  <div className="order__product-price">
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

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.ORDERER_INFO}
            </h2>
          </div>

          <div className="order__user-info">
            <div className="order__user-item">
              <div className="order__user-label">
                {ORDER_CONSTANTS.USER.NAME}
              </div>
              <div className="order__user-value">{ordererInfo.name}</div>
              <button type="button" className="order__user-edit">
                <span className="order__user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </span>
              </button>
            </div>
            <div className="order__user-item">
              <div className="order__user-label">
                {ORDER_CONSTANTS.USER.PHONE}
              </div>
              <div className="order__user-value">{ordererInfo.phone}</div>
              <button type="button" className="order__user-edit">
                <span className="order__user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </span>
              </button>
            </div>
            <div className="order__user-item">
              <div className="order__user-label">
                {ORDER_CONSTANTS.USER.EMAIL}
              </div>
              <div className="order__user-value">{ordererInfo.email}</div>
              <button type="button" className="order__user-edit">
                <span className="order__user-edit-text">
                  {ORDER_CONSTANTS.USER.EDIT}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.SHIPPING_INFO}
            </h2>
            <Icon name="question" size={30} className="order__question-icon" />
            <span className="order__section-required-text">
              {ORDER_CONSTANTS.SHIPPING.REQUIRED_TEXT}
            </span>
          </div>

          <div className="order__shipping-options">
            <div className="order__shipping-option">
              <button
                type="button"
                className="order__shipping-radio-button"
                onClick={() =>
                  setShippingInfo({ ...shippingInfo, type: "default" })
                }
                aria-label="기본 배송지"
              >
                <Icon
                  name={
                    shippingInfo.type === "default" ? "radioSelected" : "radio"
                  }
                  size={30}
                />
              </button>
              <span className="order__shipping-label">
                {ORDER_CONSTANTS.SHIPPING.DEFAULT}
              </span>
            </div>
            <div className="order__shipping-option">
              <button
                type="button"
                className="order__shipping-radio-button"
                onClick={() =>
                  setShippingInfo({ ...shippingInfo, type: "new" })
                }
                aria-label="새 배송지"
              >
                <Icon
                  name={shippingInfo.type === "new" ? "radioSelected" : "radio"}
                  size={30}
                />
              </button>
              <span className="order__shipping-label">
                {ORDER_CONSTANTS.SHIPPING.NEW}
              </span>
            </div>
            <button type="button" className="order__shipping-button">
              <span className="order__shipping-button-text">
                {ORDER_CONSTANTS.SHIPPING.LIST}
              </span>
            </button>
          </div>

          <form className="order__shipping-form">
            <div className="order__shipping-input-group">
              <label className="order__shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.NAME}
              </label>
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.NAME}
              />
            </div>
            <div className="order__shipping-input-group">
              <label className="order__shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.RECIPIENT}
              </label>
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.RECIPIENT}
              />
            </div>
            <div className="order__shipping-input-group">
              <label className="order__shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.ADDRESS}
              </label>
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.ADDRESS}
              />
              <input
                type="text"
                className="order__shipping-input"
                placeholder={
                  ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.DETAIL_ADDRESS
                }
              />
            </div>
            <div className="order__shipping-input-group">
              <label className="order__shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.PHONE1}
              </label>
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE}
              />
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_MIDDLE}
              />
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_LAST}
              />
            </div>
            <div className="order__shipping-input-group">
              <label className="order__shipping-label-text">
                {ORDER_CONSTANTS.SHIPPING.PHONE2}
              </label>
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE}
              />
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_MIDDLE}
              />
              <input
                type="text"
                className="order__shipping-input"
                placeholder={ORDER_CONSTANTS.SHIPPING.PLACEHOLDER.PHONE_LAST}
              />
            </div>
            <div className="order__shipping-checkbox-group">
              <button
                type="button"
                className="order__shipping-checkbox-button"
                onClick={() =>
                  setShippingInfo({
                    ...shippingInfo,
                    setAsDefault: !shippingInfo.setAsDefault,
                  })
                }
                aria-label="기본 배송지로 저장"
              >
                <Icon
                  name={
                    shippingInfo.setAsDefault ? "checkboxChecked" : "checkbox"
                  }
                  size={30}
                />
              </button>
              <span className="order__shipping-checkbox-label">
                {ORDER_CONSTANTS.SHIPPING.SET_DEFAULT}
              </span>
            </div>
            <div className="order__shipping-input-group">
              <select className="order__shipping-select">
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
          </form>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.COUPON_MILES}
            </h2>
            <Icon
              name="question"
              size={30}
              className="order__question-icon"
              color="#33363F"
            />
          </div>

          <div className="order__coupon-section">
            <div className="order__coupon-item">
              <div className="order__coupon-label">
                {ORDER_CONSTANTS.COUPON.BONUS}
              </div>
              <button type="button" className="order__coupon-dropdown">
                <span className="order__coupon-dropdown-text">
                  {couponInfo.bonusCoupon}
                </span>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order__coupon-dropdown-arrow"
                  color="black"
                />
              </button>
            </div>
            <div className="order__coupon-item">
              <div className="order__coupon-label">
                {ORDER_CONSTANTS.COUPON.BRAND}
              </div>
              <button type="button" className="order__coupon-dropdown" disabled>
                <span className="order__coupon-dropdown-text order__coupon-dropdown-text--disabled">
                  {couponInfo.brandCoupon}
                </span>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order__coupon-dropdown-arrow"
                  color="#747474"
                />
              </button>
            </div>
            <div className="order__miles-info">
              <label className="order__miles-label">
                {ORDER_CONSTANTS.COUPON.MILES}
              </label>
              <input
                type="number"
                className="order__miles-input"
                value={couponInfo.milesUsed}
                onChange={(e) =>
                  setCouponInfo({
                    ...couponInfo,
                    milesUsed: parseInt(e.target.value) || 0,
                  })
                }
              />
              <button type="button" className="order__miles-button">
                <span className="order__miles-button-text">
                  {ORDER_CONSTANTS.COUPON.USE_ALL}
                </span>
              </button>
              <div className="order__miles-info-text">
                {ORDER_CONSTANTS.COUPON.AVAILABLE}{" "}
                <span className="order__miles-info-text">
                  {couponInfo.milesUsed}
                </span>
                p /
                <span className="order__miles-info-text order__miles-info-text--gray">
                  {" "}
                  {ORDER_CONSTANTS.COUPON.HOLD} 0p
                </span>
              </div>
              <Icon
                name="question"
                size={30}
                className="order__question-icon"
                color="#33363F"
              />
            </div>
          </div>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.PAYMENT_DETAIL}
            </h2>
          </div>

          <div className="order__payment-detail">
            <div className="order__payment-item">
              <div className="order__payment-label">
                {ORDER_CONSTANTS.PAYMENT.TOTAL_PRODUCT}
              </div>
              <div className="order__payment-amount">
                <span className="order__payment-amount-text">
                  {formatPrice(amounts.totalProductAmount)}
                </span>
                <span className="order__payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </span>
              </div>
            </div>
            <div className="order__payment-item">
              <div className="order__payment-label">
                {ORDER_CONSTANTS.PAYMENT.COUPON_USE}
              </div>
              <div className="order__payment-amount">
                <span className="order__payment-amount-text">
                  - {formatPrice(amounts.couponDiscount)}
                </span>
                <span className="order__payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </span>
              </div>
            </div>
            <div className="order__payment-item">
              <div className="order__payment-label">
                {ORDER_CONSTANTS.PAYMENT.MILES_USE}
              </div>
              <div className="order__payment-amount">
                <span className="order__payment-amount-text">
                  - {formatPrice(amounts.milesDiscount)}
                </span>
                <span className="order__payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </span>
              </div>
            </div>
            <div className="order__payment-item">
              <div className="order__payment-label">
                {ORDER_CONSTANTS.PAYMENT.SHIPPING_FEE}
              </div>
              <div className="order__payment-amount">
                <span className="order__payment-amount-text">
                  + {formatPrice(amounts.shippingFee)}
                </span>
                <span className="order__payment-amount-currency">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </span>
              </div>
            </div>
            <div className="order__payment-item">
              <div className="order__payment-label order__payment-label--total">
                {ORDER_CONSTANTS.PAYMENT.TOTAL_AMOUNT}
              </div>
              <div className="order__payment-amount">
                <span className="order__payment-amount-text order__payment-amount-text--large">
                  {formatPrice(amounts.finalAmount)}
                </span>
                <span className="order__payment-amount-currency order__payment-amount-currency--large">
                  {ORDER_CONSTANTS.PRODUCT.CURRENCY}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.PAYMENT_METHOD}
            </h2>
          </div>

          <div className="order__payment-notice">
            {ORDER_CONSTANTS.PAYMENT.NOTICE}
          </div>

          <div className="order__payment-methods">
            <div className="order__payment-method-row">
              <button
                type="button"
                className={getPaymentMethodClassName(
                  paymentMethod === "credit-card"
                )}
                onClick={() => setPaymentMethod("credit-card")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.CREDIT_CARD}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(
                  paymentMethod === "hyundai"
                )}
                onClick={() => setPaymentMethod("hyundai")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.HYUNDAI}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "toss")}
                onClick={() => setPaymentMethod("toss")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.TOSS}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "naver")}
                onClick={() => setPaymentMethod("naver")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.NAVER}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "kakao")}
                onClick={() => setPaymentMethod("kakao")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.KAKAO}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(
                  paymentMethod === "samsung"
                )}
                onClick={() => setPaymentMethod("samsung")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SAMSUNG}
                </span>
              </button>
            </div>

            <div className="order__payment-method-row">
              <button
                type="button"
                className={getPaymentMethodClassName(
                  paymentMethod === "samsung2"
                )}
                onClick={() => setPaymentMethod("samsung2")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SAMSUNG}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "payco")}
                onClick={() => setPaymentMethod("payco")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.PAYCO}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "ssg")}
                onClick={() => setPaymentMethod("ssg")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.SSG}
                </span>
              </button>
              <button
                type="button"
                className={getPaymentMethodClassName(paymentMethod === "bank")}
                onClick={() => setPaymentMethod("bank")}
              >
                <span className="order__payment-method-button-text">
                  {ORDER_CONSTANTS.PAYMENT.METHODS.BANK}
                </span>
              </button>
            </div>

            {paymentMethod === "credit-card" && (
              <button type="button" className="order__payment-method-dropdown">
                <span className="order__payment-method-dropdown-text">
                  {ORDER_CONSTANTS.PAYMENT.CARD_SELECT}
                </span>
                <Icon
                  name="arrowDown"
                  size={16}
                  className="order__payment-method-dropdown-arrow"
                  color="black"
                />
              </button>
            )}

            <div className="order__payment-benefits">
              <div className="order__payment-benefit">
                <button type="button" className="order__payment-benefit-button">
                  <span className="order__payment-benefit-button-text">
                    {ORDER_CONSTANTS.PAYMENT.BENEFIT}
                  </span>
                </button>
                <span className="order__payment-benefit-text">
                  {ORDER_CONSTANTS.PAYMENT.BENEFITS.TOSS}
                </span>
                <Icon
                  name="arrowRight"
                  size={10}
                  className="order__payment-benefit-arrow"
                  color="black"
                />
              </div>
              <div className="order__payment-benefit">
                <button type="button" className="order__payment-benefit-button">
                  <span className="order__payment-benefit-button-text">
                    {ORDER_CONSTANTS.PAYMENT.BENEFIT}
                  </span>
                </button>
                <span className="order__payment-benefit-text">
                  {ORDER_CONSTANTS.PAYMENT.BENEFITS.KAKAO}
                </span>
                <Icon
                  name="arrowRight"
                  size={10}
                  className="order__payment-benefit-arrow"
                  color="black"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="order__section">
          <div className="order__section-header">
            <h2 className="order__section-title">
              {ORDER_CONSTANTS.SECTION.AGREEMENT}
            </h2>
          </div>

          <div className="order__agreement">
            <div className="order__agreement-item">
              <button
                type="button"
                className={getCheckboxClassName(agreements.all)}
                onClick={() => handleAgreementChange("all", !agreements.all)}
                aria-label="전체 동의"
              >
                <Icon
                  name={agreements.all ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <span className="order__agreement-text">
                {ORDER_CONSTANTS.AGREEMENT.ALL}
              </span>
            </div>
            <div className="order__agreement-item">
              <button
                type="button"
                className={getCheckboxClassName(agreements.personalInfo)}
                onClick={() =>
                  handleAgreementChange(
                    "personalInfo",
                    !agreements.personalInfo
                  )
                }
                aria-label="개인정보 처리 동의"
              >
                <Icon
                  name={
                    agreements.personalInfo ? "checkboxChecked" : "checkbox"
                  }
                  size={30}
                />
              </button>
              <span className="order__agreement-text order__agreement-text--small">
                {ORDER_CONSTANTS.AGREEMENT.PERSONAL_INFO}{" "}
                <button type="button" className="order__agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </button>
              </span>
            </div>
            <div className="order__agreement-item">
              <button
                type="button"
                className={getCheckboxClassName(agreements.thirdParty)}
                onClick={() =>
                  handleAgreementChange("thirdParty", !agreements.thirdParty)
                }
                aria-label="제3자 정보제공 동의"
              >
                <Icon
                  name={agreements.thirdParty ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <span className="order__agreement-text order__agreement-text--small">
                {ORDER_CONSTANTS.AGREEMENT.THIRD_PARTY}{" "}
                <button type="button" className="order__agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </button>
              </span>
            </div>
            <div className="order__agreement-item">
              <button
                type="button"
                className={getCheckboxClassName(agreements.payment)}
                onClick={() =>
                  handleAgreementChange("payment", !agreements.payment)
                }
                aria-label="결제대행 서비스 이용약관 동의"
              >
                <Icon
                  name={agreements.payment ? "checkboxChecked" : "checkbox"}
                  size={30}
                />
              </button>
              <span className="order__agreement-text order__agreement-text--small">
                {ORDER_CONSTANTS.AGREEMENT.PAYMENT}{" "}
                <button type="button" className="order__agreement-link">
                  {ORDER_CONSTANTS.AGREEMENT.VIEW}
                </button>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="order__payment-button"
          onClick={handlePayment}
        >
          {ORDER_CONSTANTS.PAYMENT.PAY_BUTTON}
        </button>
      </main>
    </Layout>
  );
};

export default Order;
