import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { productAPI } from "@api/product";
import { ProductResponseDto } from "@models";
import { Layout } from "@components";
import "@styles/home.css";

const Home = () => {
  const [products, setProducts] = useState<ProductResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const [digitalProducts, clothingProducts] = await Promise.all([
        productAPI.getProducts({
          categoryId: 1, // 가전제품
          sorter: "CREATED_AT_DESC" as any,
          page: 1,
        }),
        productAPI.getProducts({
          categoryId: 2, // 의류
          sorter: "CREATED_AT_DESC" as any,
          page: 1,
        }),
      ]);

      // 두 카테고리 상품 합치기
      const allProducts = [...digitalProducts, ...clothingProducts];

      // 랜덤으로 섞기
      const shuffled = allProducts.sort(() => Math.random() - 0.5);

      // 5개만 선택
      const selectedProducts = shuffled.slice(0, 10);

      setProducts(selectedProducts);
    } catch (error) {
      console.error("상품 로딩 실패:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout showNav={true}>
        <main className="home">
          <div className="home__loading">
            <div className="home__loading-spinner"></div>
            <p className="home__loading-text">상품을 불러오는 중...</p>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      showNav={true}
      showBestSidebar={true}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    >
      <main className="home">
        <div className="home__products">
          {products.map((product) => {
            const imageSrc = product.imageUrl || "/images/main_pasta.jpg";

            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="home__product-card"
              >
                <img
                  src={imageSrc}
                  alt={product.name}
                  className="home__product-image"
                />
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
