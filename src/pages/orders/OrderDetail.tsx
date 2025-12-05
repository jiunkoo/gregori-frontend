import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Icon from "@components/icons/SvgIcon";
import Layout from "@components/Layout";
import {
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
import "@styles/order-detail.css";

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuthStore();

  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const orderData = await orderAPI.getOrder(Number(orderId));
        setOrder(orderData);

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
      }
    };

    fetchOrder();
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

  if (!order) {
    return (
      <Layout showMyPageSidebar={true}>
        <main className="order-detail">
          <div className="order-detail__message">
            <p className="order-detail__message-text">
              {ORDERDETAIL_CONSTANTS.ERROR.NOT_FOUND}
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
      <main className="order-detail">
        <div className="order-detail__section">
          <div className="order-detail__section-header">
            <h2 className="order-detail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_DETAIL}
            </h2>
          </div>

          <div className="order-detail__progress">
            {progressSteps.map((step, index) => {
              const isActive = step.number === 1;
              return (
                <Fragment key={step.label}>
                  <div
                    className={
                      "order-detail__progress-item" +
                      (isActive ? " order-detail__progress-item--active" : "")
                    }
                  >
                    <div className="order-detail__progress-circle">
                      {step.number}
                      <div className="order-detail__progress-label">
                        {step.label}
                      </div>
                    </div>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <Icon
                      name="arrowRight"
                      size={24}
                      className="order-detail__progress-arrow"
                      color="black"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section-header">
            <h2 className="order-detail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.ORDER_PRODUCT}
            </h2>
          </div>

          <div className="order-detail__order-header">
            <div className="order-detail__order-date">
              {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
              <span className="order-detail__order-date-value">
                {formatDate(order.createdAt)}
              </span>{" "}
              {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
              <span className="order-detail__order-number">
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
              <div key={detail.id} className="order-detail__order-detail">
                <div className="order-detail__order-product">
                  <div className="order-detail__order-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={detail.productName}
                        className="order-detail__order-image-src"
                      />
                    ) : (
                      <Icon name="image" size={60} />
                    )}
                  </div>
                  <div className="order-detail__order-info">
                    <div className="order-detail__order-brand">{brand}</div>
                    <div className="order-detail__order-name">
                      {detail.productName}
                    </div>
                    <div className="order-detail__order-price">
                      {formatPrice(detail.productPrice)}원
                    </div>
                  </div>

                  <div className="order-detail__order-quantity">
                    {detail.productCount}
                    {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                  </div>
                  <div className="order-detail__order-shipping">
                    {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                    {formatPrice(order.deliveryCost)}원
                  </div>
                  <div className="order-detail__order-status">
                    {getStatusText(detail.status)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section-header">
            <h2 className="order-detail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.CUSTOMER}
            </h2>
          </div>

          <div className="order-detail__customer-info">
            <div className="order-detail__customer-item">
              <div className="order-detail__customer-label">
                {ORDER_CONFIRM_CONSTANTS.USER.NAME}
              </div>
              <div className="order-detail__customer-value">
                {user?.name ?? "-"}
              </div>
            </div>
            <div className="order-detail__customer-item">
              <div className="order-detail__customer-label">
                {ORDER_CONFIRM_CONSTANTS.USER.EMAIL}
              </div>
              <div className="order-detail__customer-value">
                {user?.email ?? "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="order-detail__section">
          <div className="order-detail__section-header">
            <h2 className="order-detail__section-title">
              {ORDERDETAIL_CONSTANTS.SECTION.PAYMENT}
            </h2>
          </div>
          <div className="order-detail__section-divider"></div>

          <div className="order-detail__payment-info">
            <div className="order-detail__payment-item">
              <div className="order-detail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.METHOD}
              </div>
              <div className="order-detail__payment-value">
                {order.paymentMethod}
              </div>
            </div>
            <div className="order-detail__payment-item">
              <div className="order-detail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.STATUS}
              </div>
              <div className="order-detail__payment-value">
                {getStatusText(primaryStatus)}
              </div>
            </div>
            <div className="order-detail__payment-item">
              <div className="order-detail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.ORDER_TIME}
              </div>
              <div className="order-detail__payment-value">
                {formatDateTime(order.createdAt)}
              </div>
            </div>
            <div className="order-detail__payment-item">
              <div className="order-detail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.SHIPPING_FEE}
              </div>
              <div className="order-detail__payment-value">
                {formatPrice(order.deliveryCost)}
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.CURRENCY}
              </div>
            </div>
            <div className="order-detail__payment-item">
              <div className="order-detail__payment-label">
                {ORDER_CONFIRM_CONSTANTS.PAYMENT.LABELS.TOTAL_AMOUNT}
              </div>
              <div className="order-detail__payment-value">
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
