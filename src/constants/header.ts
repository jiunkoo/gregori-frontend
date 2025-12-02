export const HEADER_CONSTANTS = {
  LOGO: {
    TEXT: "GREGORI",
  },

  SEARCH: {
    PLACEHOLDER_WITH_NAV: "상품을 검색해보세요...",
    PLACEHOLDER_WITHOUT_NAV: "검색",
  },

  NAV_MENU: [
    { label: "가전제품", path: "/products?category=digital" },
    { label: "의류", path: "/products?category=clothing" },
  ],

  LOGOUT: {
    BUTTON_TEXT: "로그아웃",
    ERROR_MESSAGE: "로그아웃 API 호출 실패:",
  },

  ACTIONS: [
    { name: "user", text: "마이페이지", path: "/mypage" },
    { name: "login", text: "로그인", path: "/login" },
  ],
};
