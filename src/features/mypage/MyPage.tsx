import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { orderAPI } from "@api/order";
import { productAPI } from "@api/product";
import { Icon, Layout } from "@components";
import { useAuthStore } from "@stores";

import { Authority, OrderResponseDto, ProductResponseDto } from "@models";
import { toResult } from "@/utils/result";
import { MYPAGE_CONSTANTS } from "@/features/mypage/MyPage.constants";
import "@/features/mypage/MyPage.css";

const MyPage = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [productsById, setProductsById] = useState<
    Record<number, ProductResponseDto>
  >({});
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const ordersResult = await toResult(orderAPI.getOrders(1));
      if (!ordersResult.ok) {
        return;
      }

      const data = ordersResult.value;
      setOrders(data);

      const ids = new Set<number>();
      data.forEach((order) => {
        order.orderDetails.forEach((detail) => {
          ids.add(detail.productId);
        });
      });

      const missingIds = Array.from(ids).filter((id) => !productsById[id]);
      if (missingIds.length === 0) {
        return;
      }

      const products = await Promise.all(
        missingIds.map(async (id) => {
          const result = await toResult(productAPI.getProduct(id));
          return result.ok ? result.value : null;
        })
      );

      setProductsById((prev) => {
        const next = { ...prev };
        products.forEach((product) => {
          if (!product) return;
          next[product.id] = product;
        });
        return next;
      });
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
  const hasRecentOrders = recentOrders.length > 0;

  const getAuthorityLabel = (authority?: Authority) => {
    switch (authority) {
      case Authority.GENERAL_MEMBER:
        return MYPAGE_CONSTANTS.GRADE.LABELS.GENERAL_MEMBER;
      case Authority.SELLING_MEMBER:
        return MYPAGE_CONSTANTS.GRADE.LABELS.SELLING_MEMBER;
      case Authority.ADMIN_MEMBER:
        return MYPAGE_CONSTANTS.GRADE.LABELS.ADMIN_MEMBER;
      default:
        return MYPAGE_CONSTANTS.USER_FALLBACK.AUTHORITY_GUEST;
    }
  };

  const authorityLabel = getAuthorityLabel(user?.authority);

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
            {hasRecentOrders ? (
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
            ) : (
              <div className="mypage__section-more mypage__section-more--disabled">
                <span className="mypage__section-more-text">
                  {MYPAGE_CONSTANTS.SECTION.MORE}
                </span>
                <Icon
                  name="arrowRight"
                  size={16}
                  className="mypage__section-more-arrow"
                  color="black"
                />
              </div>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="mypage__order-item">
              <div className="mypage__order-date">
                {MYPAGE_CONSTANTS.RECENT_ORDERS.EMPTY_TEXT}
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
                      {hasMore
                        ? `${MYPAGE_CONSTANTS.RECENT_ORDERS.MORE_PREFIX}${
                            order.orderDetails.length - 1
                          }${MYPAGE_CONSTANTS.RECENT_ORDERS.MORE_SUFFIX}`
                        : ""}
                    </div>
                  </div>
                  <div className="mypage__order-price">
                    {formatPrice(order.paymentAmount)}
                    {MYPAGE_CONSTANTS.RECENT_ORDERS.CURRENCY}
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
