import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { productAPI } from "@api/product";
import { ProductResponseDto, Sorter } from "@models";
import { Icon, Layout } from "@components";

import { toResult } from "@/utils/result";
import { getApiErrorMessage } from "@/utils/error";
import { PRODUCT_LIST_CONSTANTS } from "@/features/products/ProductList.constants";
import "@/features/products/ProductList.css";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortBy] = useState<Sorter>(Sorter.CREATED_AT_DESC);
  const [viewMode] = useState<"grid" | "list">("grid");
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
      const result = await toResult(
        productAPI.getProducts({
          sorter: sortBy,
          keyword: searchQuery || undefined,
          categoryId: categoryFilter
            ? getCategoryId(categoryFilter)
            : undefined,
        })
      );

      if (!result.ok) {
        const message = getApiErrorMessage(
          result.error,
          PRODUCT_LIST_CONSTANTS.ERROR.FETCH_FAILED
        );
        setError(message);
        return;
      }

      setProducts(result.value);
      setError(null);
    };

    fetchProducts();
  }, [sortBy, searchQuery, categoryFilter]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    setSearchQuery(search);
    setCategoryFilter(category);
  }, [searchParams]);

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
                  ? `${PRODUCT_LIST_CONSTANTS.EMPTY.NO_RESULTS_PREFIX}${searchQuery}${PRODUCT_LIST_CONSTANTS.EMPTY.NO_RESULTS_SUFFIX}`
                  : PRODUCT_LIST_CONSTANTS.EMPTY.NO_PRODUCTS}
              </p>
              {searchQuery && (
                <Link to="/products" className="product-list__empty-link">
                  {PRODUCT_LIST_CONSTANTS.EMPTY.VIEW_ALL}
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
                        {PRODUCT_LIST_CONSTANTS.PRICE.CURRENCY_SYMBOL}
                        {formatPrice(product.price)}
                      </div>
                      <div className="product-list__card-delivery">
                        {PRODUCT_LIST_CONSTANTS.SHIPPING.FREE}
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
                        src={product.imageUrl}
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
                          {PRODUCT_LIST_CONSTANTS.PRICE.CURRENCY_SYMBOL}
                          {formatPrice(product.price)}
                        </div>
                        <div className="product-list__list-delivery">
                          {PRODUCT_LIST_CONSTANTS.SHIPPING.FREE}
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
