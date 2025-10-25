export const UI_CONSTANTS = {
  BANNER: {
    PREFIX: "GREGORI 신규 회원",
    DISCOUNT: "20%",
    SUFFIX: "파격 할인 쿠폰"
  },
  
  LOGO: {
    TEXT: "GREGORI"
  },
  
  NAV_MENU: [
    { label: "인기", path: "/products" },
    { label: "치킨", path: "/products?category=chicken" },
    { label: "피자", path: "/products?category=pizza" },
    { label: "한식", path: "/products?category=korean" },
    { label: "중식", path: "/products?category=chinese" },
    { label: "양식", path: "/products?category=western" },
    { label: "일식", path: "/products?category=japanese" },
    { label: "분식", path: "/products?category=bunsik" },
    { label: "카페", path: "/products?category=cafe" }
  ],
  
  ACTIONS: [
    { name: "user", text: "마이페이지", path: "/mypage" },
    { name: "heart", text: "찜목록", path: null },
    { name: "cart", text: "장바구니", path: "/cart" },
    { name: "login", text: "로그인", path: "/login" }
  ]
};
