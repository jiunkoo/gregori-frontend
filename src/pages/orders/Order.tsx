import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ProductResponseDto } from "@models";
import { Icon, Layout } from "@components";
import { ORDER_CONSTANTS } from "@constants";
import { orderAPI } from "@api/order";
import { useAuthStore } from "@stores/authStore";
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
  const orderData = location.state as OrderData | undefined;
  const { user } = useAuthStore();

  // 주문자 정보 상태
  const [ordererInfo] = useState({
    name: "Koubit",
    email: "j*******@g*******.com",
  });

  // 배송지 정보 상태
  const [shippingInfo] = useState({
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
  const [couponInfo] = useState({
    bonusCoupon: "사용 가능 쿠폰 3장 / 보유 4장",
    brandCoupon: "적용 가능한 쿠폰이 없습니다.",
    miles: 0,
    milesUsed: 0,
  });

  // 주문동의 상태
  const [agreements, setAgreements] = useState({
    all: false,
    personalInfo: false,
    thirdParty: false,
    payment: false,
  });

  // 금액 계산
  const calculateAmounts = () => {
    // 주문 상품 기준 총 상품 금액
    const totalProductAmount =
      orderData?.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ) || 0;

    // 현재는 추가 할인/쿠폰/마일리지 없이 상품 금액 + 배송비만 사용
    const discountAmount = 0;
    const shippingFee = 6000;
    const couponDiscount = 0;
    const milesDiscount = 0;

    const finalAmount = totalProductAmount + shippingFee;

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
  const FIXED_PAYMENT_METHOD = ORDER_CONSTANTS.PAYMENT.METHODS.BANK;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  // 주문 정보가 없으면 홈으로 리다이렉트
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    navigate("/");
    return null;
  }

  const handlePayment = async () => {
    if (!agreements.all) {
      console.warn(ORDER_CONSTANTS.WARNINGS.AGREEMENT_REQUIRED);
      return;
    }

    // 사용자 정보가 없는 경우 주문 생성 불가
    if (!user) {
      console.error("주문 생성 실패: 사용자 정보가 없습니다.");
      return;
    }

    try {
      // 백엔드로 주문 생성 요청
      const createdOrder = await orderAPI.createOrder({
        memberId: user.id,
        paymentMethod: FIXED_PAYMENT_METHOD,
        paymentAmount: amounts.finalAmount,
        deliveryCost: amounts.shippingFee,
        orderDetails:
          orderData?.items.map((item) => ({
            productId: item.product.id,
            productCount: item.quantity,
          })) ?? [],
      });

      // 주문 확인 페이지로 이동 (백엔드에서 받은 주문 정보 포함)
      navigate("/order-confirm", {
        state: {
          orderData,
          ordererInfo,
          shippingInfo,
          couponInfo,
          paymentMethod: FIXED_PAYMENT_METHOD,
          agreements,
          amounts,
          orderCreatedAt: createdOrder.createdAt,
        },
      });
    } catch (error) {
      console.error("주문 생성 실패:", error);
      // TODO: 사용자에게 에러 안내 토스트/모달 등을 표시할 수 있음
    }
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
            {orderData?.items && orderData.items.length > 0 ? (
              orderData.items.map((item) => (
                <div key={item.product.id} className="order__product-item">
                  <div className="order__product-image">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="order__product-image-src"
                      />
                    ) : (
                      <Icon name="image" size={60} />
                    )}
                  </div>
                  <div className="order__product-info">
                    <div className="order__product-brand">
                      {item.product.sellerName}
                    </div>
                    <div className="order__product-name">
                      {item.product.name}
                    </div>
                    <div className="order__product-price">
                      {formatPrice(item.product.price * item.quantity)}
                      {ORDER_CONSTANTS.PRODUCT.CURRENCY} / 수량 {item.quantity}
                      {ORDER_CONSTANTS.PRODUCT.QUANTITY}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="order__products-empty">
                주문할 상품이 없습니다.
              </div>
            )}
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
          disabled={!agreements.all}
        >
          {ORDER_CONSTANTS.PAYMENT.PAY_BUTTON}
        </button>
      </main>
    </Layout>
  );
};

export default Order;
