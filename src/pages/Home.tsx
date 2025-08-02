import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Gregori에 오신 것을 환영합니다
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          다양한 상품을 만나보고 편리하게 주문하세요
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              상품 둘러보기
            </h2>
            <p className="text-gray-600 mb-4">
              다양한 카테고리의 상품들을 확인해보세요
            </p>
            <Link
              to="/products"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700"
            >
              상품 보기
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              회원가입
            </h2>
            <p className="text-gray-600 mb-4">
              회원가입하고 더 많은 혜택을 받아보세요
            </p>
            <Link
              to="/register"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded hover:bg-primary-700"
            >
              회원가입
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Gregori의 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                안전한 거래
              </h3>
              <p className="text-gray-600">
                안전한 결제 시스템으로 안심하고 쇼핑하세요
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                빠른 배송
              </h3>
              <p className="text-gray-600">
                신속한 배송으로 빠르게 상품을 받아보세요
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                다양한 상품
              </h3>
              <p className="text-gray-600">
                다양한 카테고리의 상품을 한 곳에서 만나보세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 