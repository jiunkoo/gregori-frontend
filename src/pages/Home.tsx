import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { productAPI } from "@api/product";
import { ProductResponseDto } from "@models";
import { Layout } from "@components";
import "@styles/home.css";

const DUMMY_PRODUCTS: ProductResponseDto[] = [
  {
    id: 1,
    name: "토마토 파스타",
    price: 12000,
    description: "신선한 토마토로 만든 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "크림 파스타",
    price: 13000,
    description: "부드러운 크림 소스 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "봉골레 파스타",
    price: 14000,
    description: "조개가 듬뿍 들어간 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "알리오 올리오",
    price: 11000,
    description: "마늘 향 가득한 오일 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "미트볼 파스타",
    price: 15000,
    description: "육즙 가득한 미트볼 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "페스토 파스타",
    price: 13500,
    description: "바질 향이 일품인 페스토 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "까르보나라",
    price: 12500,
    description: "크리미한 까르보나라",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: "아라비아타",
    price: 11500,
    description: "매콤한 토마토 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "해산물 파스타",
    price: 16000,
    description: "싱싱한 해산물 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "로제 파스타",
    price: 13000,
    description: "크림과 토마토의 조화",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 11,
    name: "베이컨 파스타",
    price: 12800,
    description: "바삭한 베이컨 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 12,
    name: "치즈 파스타",
    price: 14500,
    description: "치즈 듬뿍 파스타",
    stock: 100,
    categoryId: 1,
    categoryName: "양식",
    sellerId: 1,
    sellerName: "GREGORI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

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
      const data = await productAPI.getProducts({
        sorter: "CREATED_AT_DESC" as any,
        page: 1,
      });
      setProducts(data.length > 0 ? data : DUMMY_PRODUCTS);
    } catch (error) {
      console.error("상품 로딩 실패:", error);
      setProducts(DUMMY_PRODUCTS);
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
          {products.map((product, index) => {
            const images = [
              "/images/products/pasta1_tomato1.jpg",
              "/images/products/pasta2_cream1.jpg",
              "/images/products/pasta3_oil1.jpg",
              "/images/products/pasta3_oil2.jpg",
              "/images/products/pasta4_meat1.jpg",
              "/images/products/pasta4_meat2.jpg",
              "/images/main_pasta.jpg",
            ];
            const imageSrc = images[index % images.length];

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
