import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { productAPI } from "@api/product";
import { ProductResponseDto, Sorter } from "@models";
import { Icon, Layout } from "@components";
import "@styles/product-list.css";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<Sorter>(Sorter.CREATED_AT_DESC);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || ""
  );

  const getCategoryId = (categoryName: string): number | undefined => {
    const categoryMap: { [key: string]: number } = {
      electronics: 1,
      fashion: 2,
      home: 3,
      food: 4,
      beauty: 5,
      sports: 6,
      books: 7,
      toys: 8,
    };
    return categoryMap[categoryName];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productList = await productAPI.getProducts({
          sorter: sortBy,
          keyword: searchQuery || undefined,
          categoryId: categoryFilter
            ? getCategoryId(categoryFilter)
            : undefined,
        });
        setProducts(productList);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "상품 목록을 불러오는데 실패했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortBy, searchQuery, categoryFilter]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    setSearchQuery(search);
    setCategoryFilter(category);
  }, [searchParams]);

  const getCategoryName = (categoryId: number): string => {
    const categoryMap: { [key: number]: string } = {
      1: "전자제품",
      2: "패션",
      3: "홈&리빙",
      4: "식품",
      5: "뷰티",
      6: "스포츠",
      7: "도서",
      8: "장난감",
    };
    return categoryMap[categoryId] || "기타";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (loading) {
    return (
      <Layout>
        <main className="product-list">
          <div className="product-list__loading">
            <div className="product-list__loading-container">
              <div className="product-list__loading-icon-wrapper">
                <Icon
                  name="loading"
                  size={32}
                  className="product-list__loading-icon"
                />
              </div>
              <p className="product-list__loading-text">
                상품 목록을 불러오는 중...
              </p>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className="product-list">
          <div className="product-list__error">
            <div className="product-list__error-icon-wrapper">
              <Icon
                name="error"
                size={32}
                className="product-list__error-icon"
              />
            </div>
            <p className="product-list__error-text">{error}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="product-list">
        <div className="product-list__header">
          <div className="product-list__header-content">
            <div className="product-list__header-info">
              <h1 className="product-list__title">
                {searchQuery
                  ? `"${searchQuery}" 검색 결과`
                  : categoryFilter
                  ? `${getCategoryName(getCategoryId(categoryFilter) || 0)}`
                  : "상품 목록"}
              </h1>
              <p className="product-list__count">
                총 {products.length}개의 상품
                {searchQuery && (
                  <span className="product-list__search-term">
                    {" "}
                    (검색어: "{searchQuery}")
                  </span>
                )}
              </p>
            </div>

            <div className="product-list__controls">
              <div className="product-list__view-toggle">
                <button
                  type="button"
                  className={`product-list__view-button ${
                    viewMode === "grid"
                      ? "product-list__view-button--active"
                      : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Icon name="grid" size={20} />
                </button>
                <button
                  type="button"
                  className={`product-list__view-button ${
                    viewMode === "list"
                      ? "product-list__view-button--active"
                      : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <Icon name="list" size={20} />
                </button>
              </div>

              <div className="product-list__sort-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as Sorter)}
                  className="product-list__sort-select"
                >
                  <option value={Sorter.CREATED_AT_DESC}>최신순</option>
                  <option value={Sorter.CREATED_AT_ASC}>오래된순</option>
                  <option value={Sorter.PRICE_DESC}>가격 높은순</option>
                  <option value={Sorter.PRICE_ASC}>가격 낮은순</option>
                  <option value={Sorter.NAME_ASC}>이름순</option>
                </select>
                <div className="product-list__sort-icon">
                  <Icon name="dropdownArrow" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-list__content">
          {products.length === 0 ? (
            <div className="product-list__empty">
              <div className="product-list__empty-icon-wrapper">
                <Icon
                  name="shopping"
                  size={32}
                  className="product-list__empty-icon"
                />
              </div>
              <p className="product-list__empty-text">
                {searchQuery
                  ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                  : "등록된 상품이 없습니다."}
              </p>
              {searchQuery && (
                <Link to="/products" className="product-list__empty-link">
                  전체 상품 보기
                </Link>
              )}
            </div>
          ) : viewMode === "grid" ? (
            <div className="product-list__grid">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="product-list__card"
                >
                  <div className="product-list__card-image">
                    <div className="product-list__card-image-placeholder">
                      <Icon
                        name="image"
                        size={48}
                        className="product-list__card-image-icon"
                      />
                      <span className="product-list__card-image-text">
                        이미지 준비중
                      </span>
                    </div>
                  </div>
                  <div className="product-list__card-content">
                    <div className="product-list__card-header">
                      <span className="product-list__card-category">
                        {product.categoryName}
                      </span>
                      <div className="product-list__card-stock">
                        <Icon name="check" size={16} />
                        <span className="product-list__card-stock-text">
                          재고: {product.stock}개
                        </span>
                      </div>
                    </div>
                    <h3 className="product-list__card-title">{product.name}</h3>
                    <p className="product-list__card-description">
                      {product.description}
                    </p>
                    <div className="product-list__card-footer">
                      <span className="product-list__card-price">
                        ₩{formatPrice(product.price)}
                      </span>
                      <span className="product-list__card-seller">
                        {product.sellerName}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="product-list__list">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="product-list__list-item"
                >
                  <div className="product-list__list-image">
                    <div className="product-list__list-image-placeholder">
                      <Icon
                        name="image"
                        size={32}
                        className="product-list__list-image-icon"
                      />
                      <span className="product-list__list-image-text">
                        이미지 준비중
                      </span>
                    </div>
                  </div>
                  <div className="product-list__list-content">
                    <div className="product-list__list-header">
                      <div className="product-list__list-info">
                        <div className="product-list__list-meta">
                          <span className="product-list__list-category">
                            {product.categoryName}
                          </span>
                          <span className="product-list__list-separator">
                            •
                          </span>
                          <span className="product-list__list-seller">
                            {product.sellerName}
                          </span>
                        </div>
                        <h3 className="product-list__list-title">
                          {product.name}
                        </h3>
                        <p className="product-list__list-description">
                          {product.description}
                        </p>
                      </div>
                      <div className="product-list__list-footer">
                        <div className="product-list__list-price">
                          ₩{formatPrice(product.price)}
                        </div>
                        <div className="product-list__list-stock">
                          <Icon name="check" size={16} />
                          <span className="product-list__list-stock-text">
                            재고: {product.stock}개
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ProductList;
