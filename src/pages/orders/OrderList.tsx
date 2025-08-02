import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../../api/order';
import { OrderResponseDto, OrderDetailStatus } from '../../types';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  const getStatusColor = (status: OrderDetailStatus) => {
    switch (status) {
      case OrderDetailStatus.PAYMENT_PENDING:
        return 'text-yellow-600 bg-yellow-100';
      case OrderDetailStatus.PAYMENT_COMPLETED:
        return 'text-blue-600 bg-blue-100';
      case OrderDetailStatus.SHIPPING:
        return 'text-purple-600 bg-purple-100';
      case OrderDetailStatus.DELIVERED:
        return 'text-green-600 bg-green-100';
      case OrderDetailStatus.PAYMENT_CANCELED:
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">주문 목록</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">주문 내역이 없습니다.</p>
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
          >
            상품 둘러보기
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      주문번호: {order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      주문일: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">
                      총 금액: {formatPrice(order.totalAmount)}원
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">주문 상품</h4>
                  <div className="space-y-3">
                    {order.orderDetails.map((detail) => (
                      <div key={detail.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{detail.productName}</p>
                          <p className="text-sm text-gray-500">
                            수량: {detail.quantity}개 | 단가: {formatPrice(detail.price)}원
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(detail.status)}`}>
                            {getStatusText(detail.status)}
                          </span>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {formatPrice(detail.price * detail.quantity)}원
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                  >
                    상세보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList; 