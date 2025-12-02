import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Icon, Layout } from "@components";
import { MYPAGE_CONSTANTS, ORDERLIST_CONSTANTS } from "@constants";
import { useAuthStore } from "@stores";
import { orderAPI } from "@api/order";
import { OrderResponseDto, ProductResponseDto } from "@models";
import { productAPI } from "@api/product";
import "@styles/mypage.css";

const MyPage = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const data = await orderAPI.getOrders(1);
        setOrders(data);

        const ids = new Set<number>();
        data.forEach((order) => {
          order.orderDetails.forEach((detail) => {
            ids.add(detail.productId);
          });
        });

        const missingIds = Array.from(ids).filter((id) => !productsById[id]);
        if (missingIds.length > 0) {
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
        }
      } catch (error) {
        console.error("주문 조회 실패:", error);
      } finally {
      }
    };

    fetchRecentOrders();
  }, []);

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

  const recentOrders = orders.slice(0, 3);
  const authorityLabel = user?.authority ?? "GUEST";

  return (
    <Layout showMyPageSidebar={true}>
      <main className="mypage">
        <div className="mypage__grade-section">
          <div className="mypage__grade-item mypage__grade-item--standard">
            <div className="mypage__grade-header">
              <div className="mypage__grade-label">
                {MYPAGE_CONSTANTS.GRADE.LABEL}
              </div>
            </div>
            <div className="mypage__grade-footer">
              <div className="mypage__grade-value">{authorityLabel}</div>
            </div>
          </div>
        </div>

        <div className="mypage__section">
          <div className="mypage__section-header">
            <div className="mypage__section-title">
              {MYPAGE_CONSTANTS.SECTION.RECENT_ORDER}
            </div>
            <Link to="/orderlist" className="mypage__section-more">
              <span className="mypage__section-more-text">
                {MYPAGE_CONSTANTS.SECTION.MORE}
              </span>
              <Icon
                name="arrowRight"
                size={16}
                className="mypage__section-more-arrow"
                color="black"
              />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mypage__order-item">
              <div className="mypage__order-date">
                최근 주문 내역이 없습니다.
              </div>
            </div>
          ) : (
            recentOrders.map((order) => {
              const firstDetail = order.orderDetails[0];
              if (!firstDetail) return null;

              const hasMore = order.orderDetails.length > 1;
              const product = productsById[firstDetail.productId];
              const imageUrl = product?.imageUrl;

              return (
                <div key={order.id} className="mypage__order-item">
                  <div className="mypage__order-date">
                    {order.createdAt ? formatDate(order.createdAt) : "-"}
                  </div>
                  <div className="mypage__order-image">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={firstDetail.productName}
                        className="mypage__order-image-src"
                      />
                    ) : (
                      <Icon name="image" size={40} />
                    )}
                  </div>
                  <div className="mypage__order-info">
                    <div className="mypage__order-product">
                      {firstDetail.productName}
                      {hasMore ? ` 외 ${order.orderDetails.length - 1}건` : ""}
                    </div>
                  </div>
                  <div className="mypage__order-price">
                    {formatPrice(order.paymentAmount)}원
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </Layout>
  );
};

export default MyPage;
