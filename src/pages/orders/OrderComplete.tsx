import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@stores/authStore";
import { Icon, Layout } from "@components";
import "@styles/order-complete.css";

interface OrderCompleteData {
  success: boolean;
  productName?: string;
  quantity?: number;
  amount?: number;
  items?: { name: string; quantity: number }[];
}

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [orderData, setOrderData] = useState<OrderCompleteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const orderFromState = location.state as OrderCompleteData;
    if (orderFromState?.success) {
      setOrderData(orderFromState);
      setLoading(false);
    } else {
      navigate("/");
    }
  }, [isAuthenticated, navigate, location.state]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Layout>
        <main className="order-complete">
          <div className="order-complete__loading">
            <div className="order-complete__loading-container">
              <div className="order-complete__loading-content">
                <div className="order-complete__loading-icon-wrapper">
                  <Icon
                    name="loading"
                    size={32}
                    className="order-complete__loading-icon"
                  />
                </div>
                <p className="order-complete__loading-text">
                  주문 정보를 불러오는 중...
                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (!orderData) {
    return null;
  }

  return (
    <Layout>
      <main className="order-complete">
        <div className="order-complete__header">
          <div className="order-complete__header-container">
            <div className="order-complete__header-content">
              <div className="order-complete__success-icon-wrapper">
                <Icon
                  name="check"
                  size={40}
                  className="order-complete__success-icon"
                />
              </div>
              <h1 className="order-complete__header-title">
                주문이 완료되었습니다!
              </h1>
              <p className="order-complete__header-description">
                주문이 성공적으로 처리되었습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="order-complete__container">
          <div className="order-complete__grid">
            <div className="order-complete__main">
              <div className="order-complete__section">
                <h2 className="order-complete__section-title">주문 상세</h2>

                <div className="order-complete__items">
                  {orderData.items ? (
                    orderData.items.map((item, index) => (
                      <div key={index} className="order-complete__item">
                        <div className="order-complete__item-image-wrapper">
                          <Icon
                            name="image"
                            size={32}
                            className="order-complete__item-image"
                          />
                        </div>
                        <div className="order-complete__item-info">
                          <h3 className="order-complete__item-name">
                            {item.name}
                          </h3>
                          <p className="order-complete__item-quantity">
                            수량: {item.quantity}개
                          </p>
                        </div>
                      </div>
                    ))
                  ) : orderData.productName ? (
                    <div className="order-complete__item">
                      <div className="order-complete__item-image-wrapper">
                        <Icon
                          name="image"
                          size={32}
                          className="order-complete__item-image"
                        />
                      </div>
                      <div className="order-complete__item-info">
                        <h3 className="order-complete__item-name">
                          {orderData.productName}
                        </h3>
                        <p className="order-complete__item-quantity">
                          수량: {orderData.quantity}개
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="order-complete__section">
                <h2 className="order-complete__section-title">배송 정보</h2>

                <div className="order-complete__info-list">
                  <div className="order-complete__info-item">
                    <span className="order-complete__info-label">주문자</span>
                    <span className="order-complete__info-value">
                      {user?.name}
                    </span>
                  </div>
                  <div className="order-complete__info-item">
                    <span className="order-complete__info-label">주문일시</span>
                    <span className="order-complete__info-value">
                      {formatDate()}
                    </span>
                  </div>
                  <div className="order-complete__info-item">
                    <span className="order-complete__info-label">
                      배송 상태
                    </span>
                    <span className="order-complete__status-badge">
                      주문 확인
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-complete__sidebar">
              <div className="order-complete__summary">
                <h2 className="order-complete__summary-title">주문 요약</h2>

                <div className="order-complete__summary-list">
                  <div className="order-complete__summary-item">
                    <span className="order-complete__summary-label">
                      상품 금액
                    </span>
                    <span className="order-complete__summary-value">
                      ₩{formatPrice(orderData.amount || 0)}
                    </span>
                  </div>
                  <div className="order-complete__summary-item">
                    <span className="order-complete__summary-label">
                      배송비
                    </span>
                    <span className="order-complete__summary-value order-complete__summary-value--free">
                      무료
                    </span>
                  </div>
                  <hr className="order-complete__summary-divider" />
                  <div className="order-complete__summary-total">
                    <span>총 결제 금액</span>
                    <span className="order-complete__summary-total-value">
                      ₩{formatPrice(orderData.amount || 0)}
                    </span>
                  </div>
                </div>

                <div className="order-complete__summary-buttons">
                  <Link to="/mypage" className="order-complete__button">
                    주문 내역 보기
                  </Link>
                  <Link
                    to="/products"
                    className="order-complete__button order-complete__button--secondary"
                  >
                    쇼핑 계속하기
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="order-complete__notice">
            <h2 className="order-complete__notice-title">주문 완료 안내</h2>
            <div className="order-complete__notice-grid">
              <div className="order-complete__notice-item">
                <div className="order-complete__notice-number">
                  <span className="order-complete__notice-number-text">1</span>
                </div>
                <div className="order-complete__notice-content">
                  <h3 className="order-complete__notice-item-title">
                    주문 확인
                  </h3>
                  <p className="order-complete__notice-item-text">
                    주문이 성공적으로 접수되었습니다.
                  </p>
                </div>
              </div>
              <div className="order-complete__notice-item">
                <div className="order-complete__notice-number">
                  <span className="order-complete__notice-number-text">2</span>
                </div>
                <div className="order-complete__notice-content">
                  <h3 className="order-complete__notice-item-title">
                    상품 준비
                  </h3>
                  <p className="order-complete__notice-item-text">
                    판매자가 상품을 준비하고 있습니다.
                  </p>
                </div>
              </div>
              <div className="order-complete__notice-item">
                <div className="order-complete__notice-number">
                  <span className="order-complete__notice-number-text">3</span>
                </div>
                <div className="order-complete__notice-content">
                  <h3 className="order-complete__notice-item-title">
                    배송 시작
                  </h3>
                  <p className="order-complete__notice-item-text">
                    상품이 배송되면 알려드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default OrderComplete;
