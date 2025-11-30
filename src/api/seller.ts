import api from "@api/axios";
import { SellerRegisterDto, SellerUpdateDto, SellerResponseDto } from "@models";

export const sellerAPI = {
  // 판매자 등록
  createSeller: async (data: SellerRegisterDto) => {
    const response = await api.post("/api/seller", data);
    return response.data;
  },

  // 판매자 정보 수정
  updateSeller: async (data: SellerUpdateDto) => {
    const response = await api.patch("/api/seller", data);
    return response.data;
  },

  // 판매자 삭제
  deleteSeller: async (sellerId: number) => {
    const response = await api.delete(`/api/seller/${sellerId}`);
    return response.data;
  },

  // 판매자 조회
  getSeller: async (sellerId: number) => {
    const response = await api.get<SellerResponseDto>(
      `/api/seller/${sellerId}`
    );
    return response.data;
  },

  // 판매자 목록 조회
  getSellers: async (page?: number) => {
    const response = await api.get<SellerResponseDto[]>("/api/seller", {
      params: { page },
    });
    return response.data;
  },
};
