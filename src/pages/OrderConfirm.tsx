import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { orderAPI } from '../api/order';
import { ProductResponseDto, OrderRequestDto } from '../types';

interface OrderConfirmData {
  productName?: string;
  quantity?: number;
  price?: number;
  items?: { product: ProductResponseDto; quantity: number }[];
  totalAmount: number;
}

const OrderConfirm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [orderData, setOrderData] = useState<OrderConfirmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const orderFromState = location.state as OrderConfirmData;
    if (orderFromState) {
      setOrderData(orderFromState);
      setLoading(false);
    } else {
      navigate('/');
    }
  }, [isAuthenticated, navigate, location.state]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  const handleConfirmOrder = async () => {
    if (!orderData || !user) return;

    setOrderLoading(true);
    try {
      const orderRequestData: OrderRequestDto = {
        memberId: user.id,
        paymentMethod: 'CARD',
        paymentAmount: orderData.totalAmount,
        deliveryCost: 0,
        orderDetails: orderData.items ? 
          orderData.items.map(item => ({
            productId: item.product.id,
            productCount: item.quantity,
          })) :
          [{
            productId: 1, // 임시 - 실제로는 상품 ID가 필요
            productCount: orderData.quantity || 1,
          }]
      };

      await orderAPI.createOrder(orderRequestData);
      
      // 주문 완료 페이지로 이동
      navigate('/order-complete', { 
        state: { 
          success: true,
          productName: orderData.productName,
          quantity: orderData.quantity,
          items: orderData.items?.map(item => ({ name: item.product.name, quantity: item.quantity })),
          amount: orderData.totalAmount
        } 
      });
    } catch (error: any) {
      alert(error.response?.data?.message || '주문에 실패했습니다.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 mb-4">
              <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
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
            <div className="w-20 h-20 bg-primary-600 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">주문 확인</h1>
            <p className="text-gray-600">주문 정보를 확인하고 결제를 진행해주세요.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 주문 상품 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">주문 상품</h2>
              
              <div className="space-y-4">
                {orderData.items ? (
                  orderData.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                        <p className="text-sm text-gray-500">판매자: {item.product.sellerName}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₩{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))
                ) : orderData.productName ? (
                  <div className="flex items-center space-x-4 p-4 border border-gray-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{orderData.productName}</h3>
                      <p className="text-sm text-gray-500">수량: {orderData.quantity}개</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₩{formatPrice((orderData.price || 0) * (orderData.quantity || 1))}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="bg-white shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">배송 정보</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">받는 사람</span>
                  <span className="font-medium text-gray-900">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">연락처</span>
                  <span className="font-medium text-gray-900">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">배송지</span>
                  <span className="font-medium text-gray-900">기본 배송지</span>
                </div>
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-soft p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">결제 정보</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">₩{formatPrice(orderData.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span className="font-medium text-success-600">무료</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제 금액</span>
                  <span className="text-primary-600">₩{formatPrice(orderData.totalAmount)}</span>
                </div>
              </div>

              {/* 결제 방법 */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">결제 방법</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-200 cursor-pointer">
                    <input type="radio" name="payment" value="card" defaultChecked className="mr-3" />
                    <span className="text-gray-700">신용카드</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleConfirmOrder}
                  disabled={orderLoading}
                  className="w-full bg-primary-600 text-white py-4 px-6 hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {orderLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      결제 처리 중...
                    </div>
                  ) : (
                    `₩${formatPrice(orderData.totalAmount)} 결제하기`
                  )}
                </button>
                
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-6 hover:bg-gray-200 transition-all duration-200 font-semibold text-center"
                >
                  이전으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;