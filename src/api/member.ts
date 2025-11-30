import api from "@api/axios";
import {
  MemberRegisterDto,
  MemberNameUpdateDto,
  MemberPasswordUpdateDto,
} from "@models";

export const memberAPI = {
  // 회원가입
  register: async (data: MemberRegisterDto) => {
    const response = await api.post("/api/member/register", data);
    return response.data;
  },

  // 회원 조회
  getMember: async () => {
    const response = await api.get("/api/member");
    return response.data;
  },

  // 이름 변경
  updateName: async (data: MemberNameUpdateDto) => {
    const response = await api.post("/api/member/name", data);
    return response.data;
  },

  // 비밀번호 변경
  updatePassword: async (data: MemberPasswordUpdateDto) => {
    const response = await api.post("/api/member/password", data);
    return response.data;
  },

  // 회원 탈퇴
  deleteMember: async () => {
    const response = await api.delete("/api/member");
    return response.data;
  },
};
