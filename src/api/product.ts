import api from '@api/axios';
import { ProductCreateDto, ProductUpdateDto, ProductResponseDto, Sorter } from '@models';

export const productAPI = {
  // 상품 생성
  createProduct: async (data: ProductCreateDto) => {
    const response = await api.post('/product', data);
    return response.data;
  },

  // 상품 수정
  updateProduct: async (data: ProductUpdateDto) => {
    const response = await api.put('/product', data);
    return response.data;
  },

  // 상품 삭제
  deleteProduct: async (productId: number) => {
    const response = await api.delete(`/product/${productId}`);
    return response.data;
  },

  // 상품 조회
  getProduct: async (productId: number) => {
    const response = await api.get<ProductResponseDto>(`/product/${productId}`);
    return response.data;
  },

  // 상품 목록 조회
  getProducts: async (params?: {
    keyword?: string;
    categoryId?: number;
    sellerId?: number;
    page?: number;
    sorter?: Sorter;
  }) => {
    const response = await api.get<ProductResponseDto[]>('/product', { params });
    return response.data;
  }
};
