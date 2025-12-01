import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { orderAPI } from "@api/order";
import { productAPI } from "@api/product";
import {
  OrderResponseDto,
  OrderDetailStatus,
  ProductResponseDto,
} from "@models";
import { Icon, Layout } from "@components";
import { MYPAGE_CONSTANTS, ORDERLIST_CONSTANTS } from "@constants";
import { useAuthStore } from "@stores";
import "@styles/orderlist.css";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});
  const [page] = useState(1);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderAPI.getOrders(page);
      setOrders(data);
      await fetchProductsForOrders(data);
    } catch (error) {
      console.error(ORDERLIST_CONSTANTS.LOADING.ERROR, error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const clean = dateString.split("[")[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const formatExpectedDate = (dateString?: string) => {
    if (!dateString) return "-";
    const clean = dateString.split("[")[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return "-";

    // 주문일자로부터 3일 후
    date.setDate(date.getDate() + 3);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
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

  const fetchProductsForOrders = async (orderList: OrderResponseDto[]) => {
    const ids = new Set<number>();
    orderList.forEach((order) => {
      order.orderDetails.forEach((detail) => {
        ids.add(detail.productId);
      });
    });

    const missingIds = Array.from(ids).filter((id) => !productsById[id]);
    if (missingIds.length === 0) return;

    try {
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
      console.error("상품 정보 조회 실패:", error);
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

  const authorityLabel = user?.authority ?? "GUEST";

  return (
    <Layout showMyPageSidebar={true}>
      <main className="orderlist">
        <div className="orderlist__grade-section">
          <div className="orderlist__grade-item">
            <div className="orderlist__grade-header">
              <div className="orderlist__grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
            </div>
            <div className="orderlist__grade-footer">
              <div className="orderlist__grade-value">{authorityLabel}</div>
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
                    <span className="orderlist__order-number">
                      {order.orderNumber}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/orderdetail/${order.id}`}
                  className="orderlist__order-detail"
                >
                  {order.orderDetails.map((detail) => {
                    const product = productsById[detail.productId];
                    const brand =
                      product?.sellerName ?? ORDERLIST_CONSTANTS.PRODUCT.BRAND;
                    const imageUrl = product?.imageUrl;

                    return (
                      <div key={detail.id} className="orderlist__order-product">
                        <div className="orderlist__order-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={detail.productName}
                              className="orderlist__order-image-src"
                            />
                          ) : (
                            <Icon name="image" size={120} />
                          )}
                        </div>
                        <div className="orderlist__order-info">
                          <div className="orderlist__order-brand">{brand}</div>
                          <div className="orderlist__order-name">
                            {detail.productName}
                          </div>
                          <div className="orderlist__order-price">
                            {formatPrice(detail.productPrice)}원
                          </div>
                        </div>

                        <div className="orderlist__order-quantity">
                          {detail.productCount}
                          {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                        </div>
                        <div className="orderlist__order-shipping">
                          {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                          {formatPrice(order.deliveryCost)}원
                        </div>
                        <div className="orderlist__order-status">
                          {getStatusText(detail.status)}
                        </div>
                        <div className="orderlist__order-delivery">
                          {formatExpectedDate(order.createdAt)}
                          <br />
                          {ORDERLIST_CONSTANTS.SHIPPING.STATUS}
                        </div>
                      </div>
                    );
                  })}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderList;
