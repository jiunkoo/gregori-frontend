import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import {
  MYPAGE_CONSTANTS,
  ORDERDETAIL_CONSTANTS,
  ORDERLIST_CONSTANTS,
  ORDER_CONFIRM_CONSTANTS,
} from "@constants";
import { useAuthStore } from "@stores";
import { orderAPI } from "@api/order";
import { productAPI } from "@api/product";
import {
  OrderDetailResponseDto,
  OrderDetailStatus,
  OrderResponseDto,
  ProductResponseDto,
} from "@models";
import "@styles/orderdetail.css";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuthStore();
  const authorityLabel = user?.authority ?? "GUEST";

  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      setLoading(true);
      try {
        const orderData = await orderAPI.getOrder(Number(orderId));
        setOrder(orderData);

        // 주문상품 정보용 상품 상세 조회 (orderlist와 동일한 방식)
        const ids = new Set<number>();
        orderData.orderDetails.forEach((detail) => {
          ids.add(detail.productId);
        });

        const missingIds = Array.from(ids).filter((id) => !productsById[id]);
        if (missingIds.length === 0) return;

        const products = await Promise.all(
          missingIds.map((id) => productAPI.getProduct(id))
        );
        setProductsById((prev) => {
          const next = { ...prev };
          products.forEach((product) => {
            next[product.id] = product;
          });
          return next;
        });
      } catch (error) {
        console.error("주문 상세 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const clean = dateString.split("[")[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-";
    const clean = dateString.split("[")[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const hourStr = String(hours).padStart(2, "0");

    return `${year}-${month}-${day} ${hourStr}:${minutes} ${ampm}`;
  };

  const getStatusText = (status: OrderDetailStatus) => {
    switch (status) {
      case OrderDetailStatus.PAYMENT_PENDING:
        return ORDERLIST_CONSTANTS.STATUS.PAYMENT_PENDING;
      case OrderDetailStatus.PAYMENT_COMPLETED:
        return ORDERLIST_CONSTANTS.STATUS.PAYMENT_COMPLETED;
      case OrderDetailStatus.SHIPPING:
        return ORDERLIST_CONSTANTS.STATUS.SHIPPING;
      case OrderDetailStatus.DELIVERED:
        return ORDERLIST_CONSTANTS.STATUS.DELIVERED;
      case OrderDetailStatus.PAYMENT_CANCELED:
        return ORDERLIST_CONSTANTS.STATUS.PAYMENT_CANCELED;
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Layout showMyPageSidebar={true}>
        <main className="orderdetail">
          <div className="orderdetail__loading">
            <p className="orderdetail__loading-text">
              {ORDERLIST_CONSTANTS.LOADING.MESSAGE}
            </p>
          </div>
        </main>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout showMyPageSidebar={true}>
        <main className="orderdetail">
          <div className="orderdetail__loading">
            <p className="orderdetail__loading-text">
              주문 정보를 찾을 수 없습니다.
            </p>
          </div>
        </main>
      </Layout>
    );
  }

  const firstDetail: OrderDetailResponseDto | undefined = order.orderDetails[0];
  const primaryStatus = firstDetail?.status ?? order.status;

  const progressSteps = [
    { number: 0, label: ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_PENDING },
    { number: 1, label: ORDERDETAIL_CONSTANTS.PROGRESS.PAYMENT_COMPLETED },
    { number: 0, label: ORDERDETAIL_CONSTANTS.PROGRESS.PRODUCT_PREPARING },
    { number: 0, label: ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING_START },
    { number: 0, label: ORDERDETAIL_CONSTANTS.PROGRESS.SHIPPING },
    { number: 0, label: ORDERDETAIL_CONSTANTS.PROGRESS.DELIVERED },
  ];

  return (
    <Layout showMyPageSidebar={true}>
      <main className="orderdetail">
        {/* 상단 멤버십 영역 (MyPage/OrderList와 동일) - 권한 옆 화살표 제거 */}
        <div className="orderdetail__grade-section">
          <div className="orderdetail__grade-item">
            <div className="orderdetail__grade-header">
              <div className="orderdetail__grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
            </div>
            <div className="orderdetail__grade-footer">
              <div className="orderdetail__grade-value">{authorityLabel}</div>
            </div>
          </div>
        </div>

        {/* 1. 주문 상세 내역 - 기존 정적 진행 상태 유지 */}
        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_DETAIL}
            </h2>
          </div>

          <div className="orderdetail__progress">
            {progressSteps.map((step, index) => {
              const isActive = index === 1;
              return (
                <Fragment key={step.label}>
                  <div
                    className={
                      "orderdetail__progress-item" +
                      (isActive ? " orderdetail__progress-item--active" : "")
                    }
                  >
                    <div className="orderdetail__progress-circle">
                      {step.number}
                      <div className="orderdetail__progress-label">
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <Icon
                      name="arrowRight"
                      size={24}
                      className="orderdetail__progress-arrow"
                      color="black"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* 2. 주문 상품 정보 (OrderList와 동일한 데이터 사용) */}
        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_PRODUCT}
            </h2>
          </div>

          <div className="orderdetail__order-header">
            <div className="orderdetail__order-date">
              {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
              <span className="orderdetail__order-date-value">
                {formatDate(order.createdAt)}
              </span>{" "}
              {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
              <span className="orderdetail__order-number">
                {order.orderNumber}
              </span>
            </div>
          </div>

          {order.orderDetails.map((detail) => {
            const product = productsById[detail.productId];
            const brand =
              product?.sellerName ?? ORDERLIST_CONSTANTS.PRODUCT.BRAND;
            const imageUrl = product?.imageUrl;

            return (
              <div key={detail.id} className="orderdetail__order-detail">
                <div className="orderdetail__order-product">
                  <div className="orderdetail__order-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={detail.productName}
                        className="orderdetail__order-image-src"
                      />
                    ) : (
                      <Icon name="image" size={60} />
                    )}
                  </div>
                  <div className="orderdetail__order-info">
                    <div className="orderdetail__order-brand">{brand}</div>
                    <div className="orderdetail__order-name">
                      {detail.productName}
                    </div>
                    <div className="orderdetail__order-price">
                      {formatPrice(detail.productPrice)}원
                    </div>
                  </div>

                  <div className="orderdetail__order-quantity">
                    {detail.productCount}
                    {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                  </div>
                  <div className="orderdetail__order-shipping">
                    {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                    {formatPrice(order.deliveryCost)}원
                  </div>
                  <div className="orderdetail__order-status">
                    {getStatusText(detail.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. 주문자 정보 (OrderConfirm과 동일한 레이블 사용) */}
        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.CUSTOMER}
            </h2>
          </div>

          <div className="orderdetail__customer-info">
            <div className="orderdetail__customer-item">
              <div className="orderdetail__customer-label">
                {ORDER_CONFIRM_CONSTANTS.USER.NAME}
              </div>
              <div className="orderdetail__customer-value">
                {user?.name ?? "-"}
              </div>
            </div>
            <div className="orderdetail__customer-item">
              <div className="orderdetail__customer-label">
                {ORDER_CONFIRM_CONSTANTS.USER.EMAIL}
              </div>
              <div className="orderdetail__customer-value">
                {user?.email ?? "-"}
              </div>
            </div>
          </div>
        </div>

        {/* 4. 결제 정보 (OrderConfirm과 동일한 구조 / 실제 데이터 사용) */}
        <div className="orderdetail__section">
          <div className="orderdetail__section-header">
            <h2 className="orderdetail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.PAYMENT}
            </h2>
          </div>
          <div className="orderdetail__section-divider"></div>

          <div className="orderdetail__payment-info">
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.METHOD}
              </div>
              <div className="orderdetail__payment-value">
                {order.paymentMethod}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.STATUS}
              </div>
              <div className="orderdetail__payment-value">
                {getStatusText(primaryStatus)}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.ORDER_TIME}
              </div>
              <div className="orderdetail__payment-value">
                {formatDateTime(order.createdAt)}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.SHIPPING_FEE}
              </div>
              <div className="orderdetail__payment-value">
                {formatPrice(order.deliveryCost)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
            <div className="orderdetail__payment-item">
              <div className="orderdetail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.TOTAL_AMOUNT}
              </div>
              <div className="orderdetail__payment-value">
                {formatPrice(order.paymentAmount)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderDetail;
