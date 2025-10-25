import { create } from 'zustand';
import { SessionMember, Authority } from '@/types';
import { memberAPI } from '@/api/member';

interface AuthState {
  user: SessionMember | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  setUser: (user: SessionMember | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  hasAuthority: (authority: Authority) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  logout: async () => {
    try {
      await memberAPI.deleteMember();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      set({ user: null, isAuthenticated: false, error: null });
    }
  },
  
  hasAuthority: (authority) => {
    const { user } = get();
    if (!user) return false;
    
    switch (authority) {
      case Authority.ADMIN_MEMBER:
        return user.authority === Authority.ADMIN_MEMBER;
      case Authority.SELLING_MEMBER:
        return user.authority === Authority.SELLING_MEMBER || user.authority === Authority.ADMIN_MEMBER;
      case Authority.GENERAL_MEMBER:
        return true; // 모든 인증된 사용자는 일반 회원 권한을 가짐
      default:
        return false;
    }
  },
})); 