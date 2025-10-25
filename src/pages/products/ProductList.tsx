import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI } from '../../api/product';
import { ProductResponseDto, Sorter } from '../../types';
import Icon from '../../components/icons/SvgIcon';

const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<Sorter>(Sorter.CREATED_AT_DESC);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productList = await productAPI.getProducts({ 
          sorter: sortBy,
          keyword: searchQuery || undefined,
          categoryId: categoryFilter ? getCategoryId(categoryFilter) : undefined
        });
        setProducts(productList);
      } catch (err: any) {
        setError(err.response?.data?.message || '상품 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, searchQuery, categoryFilter]);

  // URL 쿼리 파라미터에서 검색어와 카테고리 읽기
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    setSearchQuery(search);
    setCategoryFilter(category);
  }, [searchParams]);

  const getCategoryId = (categoryName: string): number | undefined => {
    const categoryMap: { [key: string]: number } = {
      'electronics': 1,
      'fashion': 2,
      'home': 3,
      'food': 4,
      'beauty': 5,
      'sports': 6,
      'books': 7,
      'toys': 8
    };
    return categoryMap[categoryName];
  };

  const getCategoryName = (categoryId: number): string => {
    const categoryMap: { [key: number]: string } = {
      1: '전자제품',
      2: '패션',
      3: '홈&리빙',
      4: '식품',
      5: '뷰티',
      6: '스포츠',
      7: '도서',
      8: '장난감'
    };
    return categoryMap[categoryId] || '기타';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
              <Icon name="loading" size={32} className="animate-spin text-white" />
            </div>
            <p className="text-gray-600">상품 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-error-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="error" size={32} className="text-error-600" />
            </div>
            <p className="text-error-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {searchQuery ? `"${searchQuery}" 검색 결과` : 
                 categoryFilter ? `${getCategoryName(getCategoryId(categoryFilter) || 0)}` : '상품 목록'}
              </h1>
              <p className="text-gray-600">
                총 {products.length}개의 상품
                {searchQuery && <span className="ml-2">(검색어: "{searchQuery}")</span>}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-soft' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon name="grid" size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-soft' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon name="list" size={20} />
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as Sorter)}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  <option value={Sorter.CREATED_AT_DESC}>최신순</option>
                  <option value={Sorter.CREATED_AT_ASC}>오래된순</option>
                  <option value={Sorter.PRICE_DESC}>가격 높은순</option>
                  <option value={Sorter.PRICE_ASC}>가격 낮은순</option>
                  <option value={Sorter.NAME_ASC}>이름순</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Icon name="dropdownArrow" size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="shopping" size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-lg mb-4">
              {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '등록된 상품이 없습니다.'}
            </p>
            {searchQuery && (
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200"
              >
                전체 상품 보기
              </Link>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
              >
                <div className="aspect-w-1 aspect-h-1 w-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:opacity-90 transition-opacity">
                  <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                      <Icon name="image" size={48} className="text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-500 text-sm">이미지 준비중</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.categoryName}
                    </span>
                    <div className="flex items-center text-sm text-gray-400">
                      <Icon name="check" size={16} className="mr-1" />
                      재고: {product.stock}개
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary-600">
                      ₩{formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.sellerName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
              >
                <div className="flex">
                  <div className="w-48 h-32 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="image" size={32} className="text-gray-400 mx-auto mb-1" />
                      <span className="text-gray-500 text-xs">이미지 준비중</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {product.categoryName}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{product.sellerName}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-primary-600 mb-2">
                          ₩{formatPrice(product.price)}
                        </div>
                        <div className="flex items-center justify-end text-sm text-gray-400">
                          <Icon name="check" size={16} className="mr-1" />
                          재고: {product.stock}개
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList; 