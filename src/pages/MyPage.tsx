import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Icon, Layout } from "@components";
import { MYPAGE_CONSTANTS, ORDERLIST_CONSTANTS } from "@constants";
import { useAuthStore } from "@stores";
import { orderAPI } from "@api/order";
import { OrderResponseDto } from "@models";
import "@styles/mypage.css";

const MyPage = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      setLoading(true);
      try {
        const data = await orderAPI.getOrders(1);
        setOrders(data);
      } catch (error) {
        console.error(ORDERLIST_CONSTANTS.LOADING.ERROR, error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";

    // 백엔드에서 ZonedDateTime을 "2025-12-01T12:00:00+09:00[Asia/Seoul]" 형태로 내려줄 수 있으므로
    // 브라우저가 인식하지 못하는 타임존 정보([Asia/Seoul])는 제거한다.
    const clean = dateString.split("[")[0];
    const date = new Date(clean);

    if (Number.isNaN(date.getTime())) return "-";

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 예: 2025-12-1 형태로 출력
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

          {loading ? (
            <div className="mypage__order-item">
              <div className="mypage__order-date">
                {ORDERLIST_CONSTANTS.LOADING.MESSAGE}
              </div>
            </div>
          ) : recentOrders.length === 0 ? (
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

              return (
                <div key={order.id} className="mypage__order-item">
                  <div className="mypage__order-date">
                    {order.createdAt ? formatDate(order.createdAt) : "-"}
                  </div>
                  <div className="mypage__order-image">
                    <Icon name="image" size={40} />
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
