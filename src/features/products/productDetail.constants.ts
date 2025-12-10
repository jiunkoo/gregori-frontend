export const PRODUCT_DETAIL_CONSTANTS = {
  ERROR: {
    PRODUCT_NOT_FOUND: "상품을 찾을 수 없습니다.",
    FETCH_FAILED: "상품 조회 실패:",
  },
  NAVIGATION: {
    BACK_TO_HOME: "홈으로 돌아가기",
  },
  IMAGE: {
    PLACEHOLDER_TEXT: "이미지 준비중",
  },
  PRICE: {
    CURRENCY: "원",
  },
  SHIPPING: {
    LABEL: "배송비",
    SCHEDULE_LABEL: "배송예정",
    FREE_SHIPPING_TEXT:
      "해당 브랜드 제품으로 100,000원 이상 구매 시 무료배송 (미만일 시 배송비 3,000원 발생)",
    ISLAND_SHIPPING_TEXT: "제주도를 포함한 도서/산간 지역 추가 배송비 없음",
    DELIVERY_TIME: "3일",
    DELIVERY_TIME_TEXT: "이내 출고 (주말, 공휴일 제외)",
  },
  CART: {
    ORDER_NOW: "바로 주문하기",
    TOTAL_LABEL: "총 상품 금액",
  },
  AUTH: {
    LOGIN_REDIRECT: "/login",
  },
} as const;

export const COLORS = {
  WISHLIST_ACTIVE: "#FF5252",
  CHECKBOX_INACTIVE: "BABABA",
  CHECKBOX_ACTIVE: "black",
  DETAILS_LINK: "747474",
  ICON_DEFAULT: "33363F",
} as const;
