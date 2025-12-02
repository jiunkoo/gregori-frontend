import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { productAPI } from "@api/product";
import { ProductResponseDto, Sorter } from "@models";
import { Icon, Layout } from "@components";
import "@styles/product-list.css";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
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
    const categoryMap: { [key: string]: number | undefined } = {
      digital: 1,
      clothing: 2,
      popular: undefined,
    };
    return categoryMap[categoryName];
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      1: "가전제품",
      2: "의류",
    };
    return categoryMap[categoryId] || "기타";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  if (error) {
    return (
      <Layout>
        <main className="product-list">
          <div className="product-list__error">
            <Icon name="error" size={32} className="product-list__error-icon" />
            <p className="product-list__error-text">{error}</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="product-list">
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
              {products.map((product) => {
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="product-list__card"
                  >
                    <div className="product-list__card-image">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="product-list__card-content">
                      <div className="product-list__card-brand">
                        {product.sellerName}
                      </div>
                      <h3 className="product-list__card-title">
                        {product.name}
                      </h3>
                      <div className="product-list__card-price">
                        ₩{formatPrice(product.price)}
                      </div>
                      <div className="product-list__card-delivery">
                        무료배송
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="product-list__list">
              {products.map((product) => {
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="product-list__list-item"
                  >
                    <div className="product-list__list-image">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="product-list__list-content">
                      <div className="product-list__list-info">
                        <div className="product-list__list-brand">
                          {product.sellerName}
                        </div>
                        <h3 className="product-list__list-title">
                          {product.name}
                        </h3>
                        <div className="product-list__list-price">
                          ₩{formatPrice(product.price)}
                        </div>
                        <div className="product-list__list-delivery">
                          무료배송
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ProductList;
