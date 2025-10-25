import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Icon from '../../components/icons/SvgIcon';

interface OrderCompleteData {
  success: boolean;
  productName?: string;
  quantity?: number;
  amount?: number;
  items?: { name: string; quantity: number }[];
}

const OrderComplete: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [orderData, setOrderData] = useState<OrderCompleteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // URL 파라미터나 state에서 주문 정보 가져오기
    const orderFromState = location.state as OrderCompleteData;
    if (orderFromState?.success) {
      setOrderData(orderFromState);
      setLoading(false);
    } else {
      // 주문 정보가 없으면 홈으로 이동
      navigate('/');
    }
  }, [isAuthenticated, navigate, location.state]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
              <Icon name="loading" size={32} className="animate-spin text-white" />
            </div>
            <p className="text-gray-600">주문 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="check" size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h1>
            <p className="text-gray-600">주문이 성공적으로 처리되었습니다.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 주문 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 주문 상세 */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">주문 상세</h2>
              
              <div className="space-y-4">
                {orderData.items ? (
                  orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="image" size={32} className="text-gray-400" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                      </div>
                    </div>
                  ))
                ) : orderData.productName ? (
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name="image" size={32} className="text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{orderData.productName}</h3>
                      <p className="text-sm text-gray-500">수량: {orderData.quantity}개</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">배송 정보</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">주문자</span>
                  <span className="font-medium text-gray-900">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">주문일시</span>
                  <span className="font-medium text-gray-900">{formatDate()}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">배송 상태</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    주문 확인
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">주문 요약</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">₩{formatPrice(orderData.amount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span className="font-medium text-success-600">무료</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제 금액</span>
                  <span className="text-primary-600">₩{formatPrice(orderData.amount || 0)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/mypage"
                  className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-center block"
                >
                  주문 내역 보기
                </Link>
                <Link
                  to="/products"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold text-center block"
                >
                  쇼핑 계속하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 안내 */}
        <div className="mt-8 bg-white rounded-2xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 완료 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">주문 확인</h3>
                <p className="text-sm text-gray-600">주문이 성공적으로 접수되었습니다.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">상품 준비</h3>
                <p className="text-sm text-gray-600">판매자가 상품을 준비하고 있습니다.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">배송 시작</h3>
                <p className="text-sm text-gray-600">상품이 배송되면 알려드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete; 