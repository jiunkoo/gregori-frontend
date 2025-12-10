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
import { ORDERLIST_CONSTANTS } from "@/features/orders/orderlist.constants";
import "@/features/orders/order-list.css";

const OrderList = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});
  const [page] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const data = await orderAPI.getOrders(page);
      setOrders(data);
      await fetchProductsForOrders(data);
    } catch (error) {
      console.error("주문 조회 실패:", error);
    } finally {
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatExpectedDate = (dateString?: string) => {
    if (!dateString) return "-";
    const clean = dateString.split("[")[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return "-";

    date.setDate(date.getDate() + 3);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

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

  return (
    <Layout showMyPageSidebar={true}>
      <main className="order-list">
        <div className="order-list__section">
          <div className="order-list__section-header">
            <h2 className="order-list__section-title">
              {ORDERLIST_CONSTANTS.SECTION.TITLE}
            </h2>
          </div>

          <div className="order-list__orders">
            {orders.map((order) => (
              <div key={order.id} className="order-list__order-item">
                <div className="order-list__order-info">
                  <div className="order-list__order-date">
                    {ORDERLIST_CONSTANTS.ORDER.DATE_LABEL}{" "}
                    <span className="order-list__order-date-value">
                      {formatDate(order.createdAt)}
                    </span>{" "}
                    {ORDERLIST_CONSTANTS.ORDER.NUMBER_LABEL}{" "}
                    <span className="order-list__order-number">
                      {order.orderNumber}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/orderdetail/${order.id}`}
                  className="order-list__order-detail"
                >
                  {order.orderDetails.map((detail) => {
                    const product = productsById[detail.productId];
                    const brand =
                      product?.sellerName ?? ORDERLIST_CONSTANTS.PRODUCT.BRAND;
                    const imageUrl = product?.imageUrl;

                    return (
                      <div
                        key={detail.id}
                        className="order-list__order-product"
                      >
                        <div className="order-list__order-image">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={detail.productName}
                              className="order-list__order-image-src"
                            />
                          ) : (
                            <Icon name="image" size={120} />
                          )}
                        </div>
                        <div className="order-list__order-info">
                          <div className="order-list__order-brand">{brand}</div>
                          <div className="order-list__order-name">
                            {detail.productName}
                          </div>
                          <div className="order-list__order-price">
                            {formatPrice(detail.productPrice)}원
                          </div>
                        </div>

                        <div className="order-list__order-quantity">
                          {detail.productCount}
                          {ORDERLIST_CONSTANTS.PRODUCT.QUANTITY_UNIT}
                        </div>
                        <div className="order-list__order-shipping">
                          {ORDERLIST_CONSTANTS.SHIPPING.LABEL} <br />
                          {formatPrice(order.deliveryCost)}원
                        </div>
                        <div className="order-list__order-status">
                          {getStatusText(detail.status)}
                        </div>
                        <div className="order-list__order-delivery">
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
