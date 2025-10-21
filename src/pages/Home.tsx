import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../api/product';
import { ProductResponseDto } from '../types';
import Header from '../components/common/Header';

const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productAPI.getProducts({ 
          sorter: 'CREATED_AT_DESC' as any,
          page: 1
        });
        setAllProducts(products);
      } catch (error) {
        console.error('상품 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 음식 카테고리별 상품 선별 (13개 카테고리)
  const collections = {
    chicken: allProducts.slice(0, 6),      // 치킨 6개
    chinese: allProducts.slice(6, 12),     // 중식 6개  
    katsu: allProducts.slice(12, 18),      // 동가스/회 6개
    pizza: allProducts.slice(18, 24),      // 피자 6개
    fastfood: allProducts.slice(24, 30),   // 패스트푸드 6개
    stew: allProducts.slice(30, 36),       // 찜/탕 6개
    jokbal: allProducts.slice(36, 42),     // 족발/보쌈 6개
    bunsik: allProducts.slice(42, 48),     // 분식 6개
    cafe: allProducts.slice(48, 54),       // 카페/디저트 6개
    korean: allProducts.slice(54, 60),     // 한식 6개
    meat: allProducts.slice(60, 66),       // 고기 6개
    western: allProducts.slice(66, 72),    // 양식 6개
    asian: allProducts.slice(72, 78)       // 아시안 6개
  };

  // 각 상품에 더미 이미지 매핑
  const getProductImage = (product: ProductResponseDto, category: string) => {
    const imageMap: { [key: string]: string[] } = {
      chicken: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 치킨 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      chinese: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 중식 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      katsu: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 동가스/회 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      pizza: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 피자 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      fastfood: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 패스트푸드 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      stew: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 찜/탕 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      jokbal: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 족발/보쌈 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      bunsik: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 분식 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      cafe: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 카페/디저트 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      korean: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 한식 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      meat: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 고기 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      western: [
        '/images/products/pasta1_tomato.jpg', // 파스타 이미지 사용
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ],
      asian: [
        '/images/products/pasta1_tomato.jpg', // 임시 이미지 - 추후 아시안 이미지로 교체
        '/images/products/pasta3_oil2.jpg',
        '/images/products/pasta4_meat.jpg',
        '/images/products/pasta4_meat1.jpg',
        '/images/products/pasta4_meat2.jpg',
        '/images/products/2f32ad5b-61c2-4553-b73c-cf1c6360087b.png'
      ]
    };
    
    const images = imageMap[category] || [];
    const index = product.id % images.length;
    return images[index] || '/images/products/pasta1_tomato.jpg';
  };

  const ProductCard = ({ product, category }: { product: ProductResponseDto; category: string }) => {
    const imageUrl = getProductImage(product, category);
    
    return (
      <Link
        to={`/products/${product.id}`}
        className="group block bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden"
      >
        {/* 이미지 영역 */}
        <div className="aspect-square w-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300"
            onError={(e) => {
              // 이미지 로딩 실패 시 플레이스홀더 표시
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                      <svg class="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-gray-500 text-sm">이미지 준비중</span>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
        
        {/* 상품명 영역 */}
        <div className="p-4">
          <h3 className="text-center font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {loading ? (
        <div className="text-center py-32">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
            <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-600">상품을 불러오는 중...</p>
        </div>
      ) : (
        <>
          {/* 치킨 컬렉션 */}
          {collections.chicken.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    치킨 컬렉션 🍗
                  </h2>
                  <p className="text-lg text-gray-600">
                    바삭하고 맛있는 치킨의 다양한 맛을 만나보세요
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.chicken.map((product) => (
                    <ProductCard key={`chicken-${product.id}`} product={product} category="chicken" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 피자 컬렉션 */}
          {collections.pizza.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    피자 컬렉션 🍕
                  </h2>
                  <p className="text-lg text-gray-600">
                    다양한 토핑의 갓 구운 피자를 즐겨보세요
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.pizza.map((product) => (
                    <ProductCard key={`pizza-${product.id}`} product={product} category="pizza" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 한식 컬렉션 */}
          {collections.korean.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    한식 컬렉션 🍚
                  </h2>
                  <p className="text-lg text-gray-600">
                    전통의 맛과 정성이 담긴 한식 요리를 만나보세요
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.korean.map((product) => (
                    <ProductCard key={`korean-${product.id}`} product={product} category="korean" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 중식 컬렉션 */}
          {collections.chinese.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    중식 컬렉션 🥟
                  </h2>
                  <p className="text-lg text-gray-600">
                    진짜 중국의 맛을 느낄 수 있는 정통 중식 요리
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.chinese.map((product) => (
                    <ProductCard key={`chinese-${product.id}`} product={product} category="chinese" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 카페/디저트 컬렉션 */}
          {collections.cafe.length > 0 && (
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    카페/디저트 컬렉션 ☕
                  </h2>
                  <p className="text-lg text-gray-600">
                    달콤한 디저트와 향긋한 커피로 특별한 시간을
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.cafe.map((product) => (
                    <ProductCard key={`cafe-${product.id}`} product={product} category="cafe" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 양식 컬렉션 */}
          {collections.western.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    양식 컬렉션 🍝
                  </h2>
                  <p className="text-lg text-gray-600">
                    파스타, 스테이크 등 세련된 서양 요리의 맛
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {collections.western.map((product) => (
                    <ProductCard key={`western-${product.id}`} product={product} category="western" />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA Section은 유지 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            더 많은 상품을 확인해보세요
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            다양한 카테고리의 모든 상품을 둘러보고 원하는 상품을 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-soft"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              모든 상품 보기
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              회원가입하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 