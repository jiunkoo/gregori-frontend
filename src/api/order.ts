import api from "@api/axios";
import {
  OrderRequestDto,
  OrderResponseDto,
  OrderDetailStatusUpdateDto,
} from "@models";

export const orderAPI = {
  // 주문 생성
  createOrder: async (data: OrderRequestDto) => {
    const response = await api.post("/api/order", data);
    return response.data;
  },

  // 주문 취소
  cancelOrder: async (orderId: number) => {
    const response = await api.patch(`/api/order/${orderId}`);
    return response.data;
  },

  // 주문 상세 상태 업데이트
  updateOrderDetailStatus: async (data: OrderDetailStatusUpdateDto) => {
    const response = await api.patch("/api/order/detail", data);
    return response.data;
  },

  // 주문 조회
  getOrder: async (orderId: number) => {
    const response = await api.get<OrderResponseDto>(`/api/order/${orderId}`);
    return response.data;
  },

  // 주문 목록 조회
  getOrders: async (page?: number) => {
    const response = await api.get<OrderResponseDto[]>("/api/order", {
      params: { page },
    });
    return response.data;
  },
};
