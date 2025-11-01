export const ORDER_CONFIRM_CONSTANTS = {
  PROGRESS: {
    STEP_1: "01 장바구니",
    STEP_2: "02 주문",
    STEP_3: "03 주문 확인",
  },
  SECTION: {
    PRODUCT_INFO: "주문 상품 정보",
    ORDERER_INFO: "주문자 정보",
    SHIPPING_INFO: "배송지 정보",
    PAYMENT_INFO: "결제 정보",
  },
  PRODUCT: {
    OPTION: "옵션: [사이즈] M, [색상] Navy",
    CURRENCY: "원",
    QUANTITY_UNIT: "개",
    STATUS: "결제 완료",
  },
  USER: {
    NAME: "이름",
    PHONE: "연락처",
    EMAIL: "이메일",
  },
  SHIPPING: {
    LABELS: {
      RECIPIENT: "수령인",
      PHONE: "휴대폰번호",
      ADDRESS: "배송지",
      REQUEST: "배송 요청사항",
    },
    VALUES: {
      RECIPIENT: "Koubit",
      PHONE: "010-1111-1111",
      ADDRESS: "00000 한양시 조선구 고려동 11-1 신라아파트 111동 111호",
      REQUEST: "파손 위험이 있으니 주의해서 취급 부탁드립니다.",
    },
    CHANGE: "배송지 정보 변경",
  },
  PAYMENT: {
    LABELS: {
      METHOD: "결제 방법",
      STATUS: "주문 상태",
      ORDER_TIME: "주문 접수 일시",
      COMPLETE_TIME: "결제 완료 일시",
      SHIPPING_FEE: "배송비",
      TOTAL_AMOUNT: "결제 금액",
      RECEIPT: "영수증",
    },
    VALUES: {
      METHOD: "카카오페이",
      STATUS: "결제 완료",
      ORDER_TIME: "2023-01-01 18:00 PM",
      COMPLETE_TIME: "2023-01-01 18:00 PM",
      PRINT_RECEIPT: "영수증 출력",
    },
    CURRENCY: "원",
  },
  NOTICE: {
    OUT_OF_STOCK:
      "* 상품이 품절되는 경우 주문이 자동으로 취소되며, 주문하신 분의 SMS와 이메일로 관련 안내를 발송해드립니다.",
    DETAIL_IN_MYPAGE: "* 상세 내역은 마이페이지에서 확인하실 수 있습니다.",
  },
  BUTTONS: {
    CONTINUE_SHOPPING: "계속 쇼핑하기",
    ORDER_INQUIRY: "주문/배송 조회",
  },
};
