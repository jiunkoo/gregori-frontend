import api from "@api/axios";
import { AuthSignInDto } from "@models";

export const authAPI = {
  // 로그인
  signIn: async (data: AuthSignInDto) => {
    const response = await api.post("/api/auth/signin", data);
    return response.data;
  },

  // 로그아웃
  signOut: async () => {
    const response = await api.post("/api/auth/signout");
    return response.data;
  },
};
