import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/icons/SvgIcon';
import { orderAPI } from '../../api/order';
import { OrderResponseDto, OrderDetailStatus } from '../../types';
import '../../styles/orderlist.css';

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
      console.error('주문 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };


  const getStatusText = (status: OrderDetailStatus) => {
    switch (status) {
      case OrderDetailStatus.PAYMENT_PENDING:
        return '결제 대기';
      case OrderDetailStatus.PAYMENT_COMPLETED:
        return '결제 완료';
      case OrderDetailStatus.SHIPPING:
        return '배송 중';
      case OrderDetailStatus.DELIVERED:
        return '배송 완료';
      case OrderDetailStatus.PAYMENT_CANCELED:
        return '결제 취소';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="orderlist-wrapper">
        <div className="orderlist-container">
          <div className="orderlist-content">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">로딩 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orderlist-wrapper">
      <div className="orderlist-container">
        {/* 좌측 내비게이션 바 */}
        <div className="orderlist-sidebar">
          <div className="orderlist-user-info">
            <div className="orderlist-brand">KOUBIT</div>
          </div>
          
          <div className="orderlist-nav-title">나의 쇼핑 정보</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/orderlist" className="orderlist-nav-item">주문배송조회</Link>
          <Link to="/orderlist" className="orderlist-nav-item">취소/교환/반품 내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">상품 리뷰</Link>
          
          <div className="orderlist-nav-title">나의 계정 설정</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/mypage" className="orderlist-nav-item">회원정보수정</Link>
          <Link to="/mypage" className="orderlist-nav-item">멤버십 등급</Link>
          <Link to="/mypage" className="orderlist-nav-item">쿠폰</Link>
          <Link to="/mypage" className="orderlist-nav-item">마일리지</Link>
          
          <div className="orderlist-nav-title">고객센터</div>
          <div className="orderlist-nav-divider"></div>
          
          <Link to="/orderlist" className="orderlist-nav-item">1:1 문의내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">상품 Q&A내역</Link>
          <Link to="/orderlist" className="orderlist-nav-item">공지사항</Link>
          <Link to="/orderlist" className="orderlist-nav-item">FAQ</Link>
          <Link to="/orderlist" className="orderlist-nav-item">고객의 소리</Link>
        </div>

        {/* 기본 정보 영역 */}
        <div className="orderlist-content">
          {/* 등급 영역 */}
          <div className="orderlist-grade-section">
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">멤버십 등급</div>
                <div className="orderlist-grade-value">GREEN</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderlist-grade-arrow" color="white" />
            </div>
            <div className="orderlist-grade-divider"></div>
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">사용가능쿠폰</div>
                <div className="orderlist-grade-value">4</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderlist-grade-arrow" color="white" />
            </div>
            <div className="orderlist-grade-divider"></div>
            <div className="orderlist-grade-item">
              <div className="orderlist-grade-content">
                <div className="orderlist-grade-label">마일리지</div>
                <div className="orderlist-grade-value">0</div>
              </div>
              <Icon name="arrowRight" size={10} className="orderlist-grade-arrow" color="white" />
            </div>
            <div className="orderlist-grade-benefit">
              <div className="orderlist-grade-benefit-button">할인 혜택 보기</div>
            </div>
          </div>

          {/* 주문 상품 정보 섹션 */}
          <div className="orderlist-section">
            <div className="orderlist-section-header">
              <div className="orderlist-section-title">주문 상품 정보</div>
            </div>
            <div className="orderlist-section-divider"></div>
            
            {orders.length === 0 ? (
              <div className="orderlist-empty">
                <div className="orderlist-empty-text">주문 내역이 없습니다.</div>
                <Link to="/products" className="orderlist-empty-button">
                  상품 둘러보기
                </Link>
              </div>
            ) : (
              <div className="orderlist-orders">
                {orders.map((order) => (
                  <div key={order.id} className="orderlist-order-item">
                    {/* 주문 정보 */}
                    <div className="orderlist-order-info">
                      <div className="orderlist-order-date">
                        주문일자 <span className="orderlist-order-date-value">{formatDate(order.createdAt)}</span>     주문번호 <span className="orderlist-order-number">{order.id}</span>
                      </div>
                    </div>
                    <div className="orderlist-section-divider"></div>
                    
                    {/* 주문 상품 상세 */}
                    <Link to={`/orderdetail/${order.id}`} className="orderlist-order-detail">
                      {order.orderDetails.map((detail) => (
                        <div key={detail.id} className="orderlist-order-product">
                          <div className="orderlist-order-image">
                            <Icon name="image" size={120} />
                          </div>
                          <div className="orderlist-order-info">
                            <div className="orderlist-order-brand">브랜드</div>
                            <div className="orderlist-order-name">{detail.productName}</div>
                            <div className="orderlist-order-option">옵션: [사이즈] M, [색상] Navy</div>
                            <div className="orderlist-order-price">{formatPrice(detail.price)}원</div>
                          </div>
                          
                          <div className="orderlist-order-quantity">{detail.quantity}개</div>
                          <div className="orderlist-order-shipping">배송비 <br/>3,000원</div>
                          <div className="orderlist-order-status">{getStatusText(detail.status)}</div>
                          <div className="orderlist-order-delivery">2023.01.31 이내<br/>출고 예정</div>
                        </div>
                      ))}
                      
                      <div className="orderlist-order-actions">
                        <button className="orderlist-order-action-button">취소 접수</button>
                        <button className="orderlist-order-action-button">1:1 문의</button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
