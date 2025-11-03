import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { orderAPI } from "@api/order";
import { OrderResponseDto, OrderDetailStatus } from "@models";
import { Icon, Layout } from "@components";
import { MYPAGE_CONSTANTS, ORDERLIST_CONSTANTS } from "@constants";
import "@styles/orderlist.css";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderAPI.getOrders(page);
      setOrders(data);
    } catch (error) {
      console.error(ORDERLIST_CONSTANTS.LOADING.ERROR, error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR");
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
        <main className="orderlist">
          <div className="orderlist__loading">
            <div className="orderlist__loading-content">
              <p className="orderlist__loading-text">
                {ORDERLIST_CONSTANTS.LOADING.MESSAGE}
              </p>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout showMyPageSidebar={true}>
      <main className="orderlist">
        <div className="orderlist__grade-section">
          <div className="orderlist__grade-item">
            <div className="orderlist__grade-header">
              <div className="orderlist__grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist__grade-footer">
              <div className="orderlist__grade-value">
                {MYPAGE_CONSTANTS.GRADE.VALUE}
              </div>
              <button type="button" className="orderlist__grade-benefit-button">
                {MYPAGE_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </button>
            </div>
          </div>
          <div className="orderlist__grade-item">
            <div className="orderlist__grade-header">
              <div className="orderlist__grade-label">
                {MYPAGE_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist__grade-footer">
              <div className="orderlist__grade-value">4</div>
            </div>
          </div>
          <div className="orderlist__grade-item">
            <div className="orderlist__grade-header">
              <div className="orderlist__grade-label">
                {MYPAGE_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist__grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist__grade-footer">
              <div className="orderlist__grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="orderlist__section">
          <div className="orderlist__section-header">
            <h2 className="orderlist__section-title">
              {ORDERLIST_CONSTANTS.SECTION.TITLE}
            </h2>
          </div>

          <div className="orderlist__orders">
            {orders.map((order) => (
              <div key={order.id} className="orderlist__order-item">
                <div className="orderlist__order-info">
                  <div className="orderlist__order-date">
                    {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
                    <span className="orderlist__order-date-value">
                      {formatDate(order.createdAt)}
                    </span>{" "}
                    {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
                    <span className="orderlist__order-number">{order.id}</span>
                  </div>
                </div>

                <Link
                  to={`/orderdetail/${order.id}`}
                  className="orderlist__order-detail"
                >
                  {order.orderDetails.map((detail) => (
                    <div key={detail.id} className="orderlist__order-product">
                      <div className="orderlist__order-image">
                        <Icon name="image" size={120} />
                      </div>
                      <div className="orderlist__order-info">
                        <div className="orderlist__order-brand">
                          {ORDERLIST_CONSTANTS.PRODUCT.BRAND}
                        </div>
                        <div className="orderlist__order-name">
                          {detail.productName}
                        </div>
                        <div className="orderlist__order-option">
                          {ORDERLIST_CONSTANTS.PRODUCT.OPTION}
                        </div>
                        <div className="orderlist__order-price">
                          {formatPrice(detail.price)}원
                        </div>
                      </div>

                      <div className="orderlist__order-quantity">
                        {detail.quantity}
                        {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                      </div>
                      <div className="orderlist__order-shipping">
                        {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                        {ORDERLIST_CONSTANTS.SHIPPING.FEE}
                      </div>
                      <div className="orderlist__order-status">
                        {getStatusText(detail.status)}
                      </div>
                      <div className="orderlist__order-delivery">
                        {ORDERLIST_CONSTANTS.SHIPPING.EXPECTED_DATE}
                        <br />
                        {ORDERLIST_CONSTANTS.SHIPPING.STATUS}
                      </div>
                    </div>
                  ))}

                  <div className="orderlist__order-actions">
                    <button
                      type="button"
                      className="orderlist__order-action-button"
                    >
                      {ORDERLIST_CONSTANTS.BUTTONS.CANCEL}
                    </button>
                    <button
                      type="button"
                      className="orderlist__order-action-button"
                    >
                      {ORDERLIST_CONSTANTS.BUTTONS.INQUIRY}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="orderlist__order-item">
            <div className="orderlist__order-header">
              <div className="orderlist__order-date">
                {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
                <span className="orderlist__order-date-value">
                  {ORDERLIST_CONSTANTS.ORDER.DUMMY_DATE}
                </span>{" "}
                {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
                <span className="orderlist__order-number">
                  {ORDERLIST_CONSTANTS.ORDER.DUMMY_NUMBER}
                </span>
              </div>
            </div>

            <Link to="/orderdetail" className="orderlist__order-detail">
              <div className="orderlist__order-product">
                <div className="orderlist__order-image">
                  <Icon name="image" size={60} />
                </div>
                <div className="orderlist__order-info">
                  <div className="orderlist__order-brand">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.BRAND}
                  </div>
                  <div className="orderlist__order-name">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.NAME}
                  </div>
                  <div className="orderlist__order-option">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.OPTION}
                  </div>
                  <div className="orderlist__order-price">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.PRICE}
                  </div>
                </div>
              </div>

              <div className="orderlist__order-quantity">
                {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.QUANTITY}
              </div>
              <div className="orderlist__order-shipping">
                {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERLIST_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderlist__order-status">
                {ORDERLIST_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderlist__order-delivery">
                {ORDERLIST_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERLIST_CONSTANTS.SHIPPING.STATUS}
              </div>

              <div className="orderlist__order-actions">
                <button
                  type="button"
                  className="orderlist__order-action-button"
                >
                  {ORDERLIST_CONSTANTS.BUTTONS.CANCEL}
                </button>
                <button
                  type="button"
                  className="orderlist__order-action-button"
                >
                  {ORDERLIST_CONSTANTS.BUTTONS.INQUIRY}
                </button>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderList;
