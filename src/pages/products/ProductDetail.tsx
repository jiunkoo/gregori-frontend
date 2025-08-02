import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../../api/product';
import { orderAPI } from '../../api/order';
import { useAuthStore } from '../../stores/authStore';
import { ProductResponseDto, OrderRequestDto } from '../../types';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [product, setProduct] = useState<ProductResponseDto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;
    
    setLoading(true);
    try {
      const data = await productAPI.getProduct(parseInt(productId));
      setProduct(data);
    } catch (error) {
      console.error('상품 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!product) return;

    setOrderLoading(true);
    try {
      const orderData: OrderRequestDto = {
        orderDetails: [
          {
            productId: product.id,
            quantity: quantity,
          },
        ],
      };

      await orderAPI.createOrder(orderData);
      alert('주문이 완료되었습니다.');
      navigate('/orders');
    } catch (error: any) {
      alert(error.response?.data?.message || '주문에 실패했습니다.');
    } finally {
      setOrderLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 상품 정보 */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">카테고리:</span>
                  <span className="font-medium">{product.categoryName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">판매자:</span>
                  <span className="font-medium">{product.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">재고:</span>
                  <span className="font-medium">{product.stock}개</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-primary-600 mb-6">
                {formatPrice(product.price)}원
              </div>
            </div>

            {/* 주문 섹션 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                주문하기
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수량
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>총 금액:</span>
                    <span className="text-primary-600">
                      {formatPrice(product.price * quantity)}원
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleOrder}
                  disabled={orderLoading || product.stock === 0}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {orderLoading ? '주문 중...' : product.stock === 0 ? '품절' : '주문하기'}
                </button>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    주문하려면 <button onClick={() => navigate('/login')} className="text-primary-600 hover:underline">로그인</button>이 필요합니다.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 