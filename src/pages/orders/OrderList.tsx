import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@components/icons/SvgIcon";
import { orderAPI } from "@api/order";
import { OrderResponseDto, OrderDetailStatus } from "@models";
import Layout from "@components/Layout";
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
        <div className="orderlist-container">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">{ORDERLIST_CONSTANTS.LOADING.MESSAGE}</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showMyPageSidebar={true}>
      <div className="orderlist-container">
        <div className="orderlist-grade-section">
          <div className="orderlist-grade-item orderlist-grade-item-standard">
            <div className="orderlist-grade-header">
              <div className="orderlist-grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist-grade-footer">
              <div className="orderlist-grade-value">
                {MYPAGE_CONSTANTS.GRADE.VALUE}
              </div>
              <div className="orderlist-grade-benefit-button">
                {MYPAGE_CONSTANTS.GRADE.BENEFIT_BUTTON}
              </div>
            </div>
          </div>
          <div className="orderlist-grade-item orderlist-grade-item-standard">
            <div className="orderlist-grade-header">
              <div className="orderlist-grade-label">
                {MYPAGE_CONSTANTS.GRADE.COUPON_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist-grade-footer">
              <div className="orderlist-grade-value">4</div>
            </div>
          </div>
          <div className="orderlist-grade-item orderlist-grade-item-standard">
            <div className="orderlist-grade-header">
              <div className="orderlist-grade-label">
                {MYPAGE_CONSTANTS.GRADE.MILEAGE_LABEL}
              </div>
              <Icon
                name="arrowRight"
                size={20}
                className="orderlist-grade-header-arrow"
                color="white"
              />
            </div>
            <div className="orderlist-grade-footer">
              <div className="orderlist-grade-value">0</div>
            </div>
          </div>
        </div>

        <div className="orderlist-section">
          <div className="orderlist-section-header">
            <div className="orderlist-section-title">
              {ORDERLIST_CONSTANTS.SECTION.TITLE}
            </div>
          </div>

          <div className="orderlist-orders">
            {orders.map((order) => (
              <div key={order.id} className="orderlist-order-item">
                <div className="orderlist-order-info">
                  <div className="orderlist-order-date">
                    {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
                    <span className="orderlist-order-date-value">
                      {formatDate(order.createdAt)}
                    </span>{" "}
                    {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
                    <span className="orderlist-order-number">{order.id}</span>
                  </div>
                </div>

                <Link
                  to={`/orderdetail/${order.id}`}
                  className="orderlist-order-detail"
                >
                  {order.orderDetails.map((detail) => (
                    <div key={detail.id} className="orderlist-order-product">
                      <div className="orderlist-order-image">
                        <Icon name="image" size={120} />
                      </div>
                      <div className="orderlist-order-info">
                        <div className="orderlist-order-brand">
                          {ORDERLIST_CONSTANTS.PRODUCT.BRAND}
                        </div>
                        <div className="orderlist-order-name">
                          {detail.productName}
                        </div>
                        <div className="orderlist-order-option">
                          {ORDERLIST_CONSTANTS.PRODUCT.OPTION}
                        </div>
                        <div className="orderlist-order-price">
                          {formatPrice(detail.price)}원
                        </div>
                      </div>

                      <div className="orderlist-order-quantity">
                        {detail.quantity}
                        {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                      </div>
                      <div className="orderlist-order-shipping">
                        {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                        {ORDERLIST_CONSTANTS.SHIPPING.FEE}
                      </div>
                      <div className="orderlist-order-status">
                        {getStatusText(detail.status)}
                      </div>
                      <div className="orderlist-order-delivery">
                        {ORDERLIST_CONSTANTS.SHIPPING.EXPECTED_DATE}
                        <br />
                        {ORDERLIST_CONSTANTS.SHIPPING.STATUS}
                      </div>
                    </div>
                  ))}

                  <div className="orderlist-order-actions">
                    <button className="orderlist-order-action-button">
                      {ORDERLIST_CONSTANTS.BUTTONS.CANCEL}
                    </button>
                    <button className="orderlist-order-action-button">
                      {ORDERLIST_CONSTANTS.BUTTONS.INQUIRY}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="orderlist-order-item">
            <div className="orderlist-order-header">
              <div className="orderlist-order-date">
                {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
                <span className="orderlist-order-date-value">
                  {ORDERLIST_CONSTANTS.ORDER.DUMMY_DATE}
                </span>{" "}
                {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
                <span className="orderlist-order-number">
                  {ORDERLIST_CONSTANTS.ORDER.DUMMY_NUMBER}
                </span>
              </div>
            </div>

            <Link to="/orderdetail" className="orderlist-order-detail">
              <div className="orderlist-order-product">
                <div className="orderlist-order-image">
                  <Icon name="image" size={60} />
                </div>
                <div className="orderlist-order-info">
                  <div className="orderlist-order-brand">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.BRAND}
                  </div>
                  <div className="orderlist-order-name">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.NAME}
                  </div>
                  <div className="orderlist-order-option">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.OPTION}
                  </div>
                  <div className="orderlist-order-price">
                    {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.PRICE}
                  </div>
                </div>
              </div>

              <div className="orderlist-order-quantity">
                {ORDERLIST_CONSTANTS.DUMMY_PRODUCT.QUANTITY}
              </div>
              <div className="orderlist-order-shipping">
                {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                {ORDERLIST_CONSTANTS.SHIPPING.FEE}
              </div>
              <div className="orderlist-order-status">
                {ORDERLIST_CONSTANTS.STATUS.PAYMENT_COMPLETED}
              </div>
              <div className="orderlist-order-delivery">
                {ORDERLIST_CONSTANTS.SHIPPING.EXPECTED_DATE}
                <br />
                {ORDERLIST_CONSTANTS.SHIPPING.STATUS}
              </div>

              <div className="orderlist-order-actions">
                <button className="orderlist-order-action-button">
                  {ORDERLIST_CONSTANTS.BUTTONS.CANCEL}
                </button>
                <button className="orderlist-order-action-button">
                  {ORDERLIST_CONSTANTS.BUTTONS.INQUIRY}
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderList;
