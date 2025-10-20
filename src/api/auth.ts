import api from './axios';
import { AuthSignInDto } from '../types';

export const authAPI = {
  // 로그인
  signIn: async (data: AuthSignInDto) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },

  // 로그아웃
  signOut: async () => {
    const response = await api.post('/auth/signout');
    return response.data;
  },
}; 