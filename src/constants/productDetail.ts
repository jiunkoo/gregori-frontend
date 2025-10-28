// ProductDetail 페이지에서 사용되는 상수들
export const PRODUCT_DETAIL_CONSTANTS = {
  // 로딩 메시지
  LOADING: {
    MESSAGE: "상품 정보를 불러오는 중...",
  },

  // 에러 메시지
  ERROR: {
    PRODUCT_NOT_FOUND: "상품을 찾을 수 없습니다.",
    FETCH_FAILED: "상품 조회 실패:",
  },

  // 네비게이션
  NAVIGATION: {
    HOME: "홈",
    PRODUCTS: "상품",
    BACK_TO_HOME: "홈으로 돌아가기",
  },

  // 옵션
  OPTIONS: {
    SIZES: ["S", "M", "L", "XL"],
    COLORS: ["Light Gray", "Navy", "Black", "White"],
    SIZE_LABEL: "Size",
    COLOR_LABEL: "Color",
  },

  // 이미지
  IMAGE: {
    PLACEHOLDER_TEXT: "이미지 준비중",
  },

  // 리뷰
  REVIEW: {
    LINK_TEXT: "+500 리뷰 보기",
  },

  // 가격
  PRICE: {
    CURRENCY: "원",
    POINTS_TEXT: "4,053p(1%) 적립",
    MEMBER_PRICE_LABEL: "회원님의 구매 가능 가격",
    MEMBER_PRICE_AMOUNT: "324,240원",
    DISCOUNT_PERCENT: "20%",
  },

  // 쿠폰
  COUPON: {
    GET_COUPON: "쿠폰 받기",
    DOWNLOAD: "받기",
    GREEN_MEMBER: "GREEN 회원 5% 할인 쿠폰",
    CHUSEOK: "추석맞이 10% 할인 쿠폰",
  },

  // 할인
  DISCOUNT: {
    PRODUCT_DISCOUNT: "상품 할인",
    COUPON_DISCOUNT: "쿠폰 할인",
    PAYMENT_DISCOUNT: "결제수단 할인",
    BASIC_DISCOUNT: "기본 할인 10%",
    MILEAGE_USE: "보유 마일리지 모두 사용",
    SAMSUNG_PAY: "[삼성카드] 삼성페이 결제 시 5% 청구 할인",
    DETAILS: "자세히",
    AMOUNTS: {
      BASIC: "-40,530원",
      GREEN_COUPON: "-20,265원",
      CHUSEOK_COUPON: "-40,530원",
      MILEAGE: "0p",
      SAMSUNG_PAY: "-20,265원",
    },
  },

  // 배송
  SHIPPING: {
    LABEL: "배송비",
    SCHEDULE_LABEL: "배송예정",
    FREE_SHIPPING_TEXT:
      "해당 브랜드 제품으로 100,000원 이상 구매 시 무료배송 (미만일 시 배송비 3,000원 발생)",
    ISLAND_SHIPPING_TEXT: "제주도를 포함한 도서/산간 지역 추가 배송비 없음",
    DELIVERY_TIME: "3일",
    DELIVERY_TIME_TEXT: "이내 출고 (주말, 공휴일 제외)",
  },

  // 장바구니/주문
  CART: {
    ADD_TO_CART: "장바구니 담기",
    ORDER_NOW: "바로 주문하기",
    TOTAL_LABEL: "총 상품 금액",
  },

  // 로그인
  AUTH: {
    LOGIN_REDIRECT: "/login",
  },

  // 주문 확인
  ORDER_CONFIRM: {
    ROUTE: "/order-confirm",
  },
} as const;

// 색상 상수
export const COLORS = {
  WISHLIST_ACTIVE: "#FF5252",
  CHECKBOX_INACTIVE: "#BABABA",
  CHECKBOX_ACTIVE: "black",
  DETAILS_LINK: "#747474",
  ICON_DEFAULT: "#33363F",
} as const;
