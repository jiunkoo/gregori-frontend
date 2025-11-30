export const HEADER_CONSTANTS = {
  BANNER: {
    PREFIX: "GREGORI 신규 회원",
    DISCOUNT: "20%",
    SUFFIX: "파격 할인 쿠폰",
  },

  LOGO: {
    TEXT: "GREGORI",
  },

  SEARCH: {
    PLACEHOLDER_WITH_NAV: "상품을 검색해보세요...",
    PLACEHOLDER_WITHOUT_NAV: "검색",
  },

  NAV_MENU: [
    { label: "인기", path: "/products" },
    { label: "가전제품", path: "/products?category=digital" },
    { label: "의류", path: "/products?category=clothing" },
  ],

  ACTIONS: [
    { name: "user", text: "마이페이지", path: "/mypage" },
    { name: "heart", text: "찜목록", path: "" },
    { name: "cart", text: "장바구니", path: "/cart" },
    { name: "login", text: "로그인", path: "/login" },
  ],
};
