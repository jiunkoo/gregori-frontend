import api from '@api/axios';
import { CategoryRequestDto, Category } from '@models';

export const categoryAPI = {
  // 카테고리 생성 (관리자만)
  createCategory: async (data: CategoryRequestDto) => {
    const response = await api.post('/category', data);
    return response.data;
  },

  // 카테고리 이름 수정 (관리자만)
  updateCategoryName: async (categoryId: number, data: CategoryRequestDto) => {
    const response = await api.post(`/category/${categoryId}`, data);
    return response.data;
  },

  // 카테고리 삭제 (관리자만)
  deleteCategory: async (categoryId: number) => {
    const response = await api.delete(`/category/${categoryId}`);
    return response.data;
  },

  // 카테고리 조회
  getCategory: async (categoryId: number) => {
    const response = await api.get<Category>(`/category/${categoryId}`);
    return response.data;
  },

  // 카테고리 목록 조회
  getCategories: async (page?: number) => {
    const response = await api.get<Category[]>('/category', { params: { page } });
    return response.data;
  }
};
