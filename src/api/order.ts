import api from '@/api/axios';
import { OrderRequestDto, OrderResponseDto, OrderDetailStatusUpdateDto } from '@/types';

export const orderAPI = {
  // 주문 생성
  createOrder: async (data: OrderRequestDto) => {
    const response = await api.post('/order', data);
    return response.data;
  },

  // 주문 취소
  cancelOrder: async (orderId: number) => {
    const response = await api.patch(`/order/${orderId}`);
    return response.data;
  },

  // 주문 상세 상태 업데이트
  updateOrderDetailStatus: async (data: OrderDetailStatusUpdateDto) => {
    const response = await api.patch('/order/detail', data);
    return response.data;
  },

  // 주문 조회
  getOrder: async (orderId: number) => {
    const response = await api.get<OrderResponseDto>(`/order/${orderId}`);
    return response.data;
  },

  // 주문 목록 조회
  getOrders: async (page?: number) => {
    const response = await api.get<OrderResponseDto[]>('/order', { params: { page } });
    return response.data;
  },
}; 