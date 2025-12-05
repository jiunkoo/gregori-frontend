import { create } from "zustand";
import { SessionMember, Authority } from "@models";
import { memberAPI } from "@api/member";

interface AuthState {
  user: SessionMember | null;
  isAuthenticated: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

interface AuthActions {
  setUser: (user: SessionMember | null) => void;
  setError: (error: string | null) => void;
  setAuthChecked: (checked: boolean) => void;
  logout: () => void;
  hasAuthority: (authority: Authority) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isAuthChecked: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isAuthChecked: true,
    }),

  setError: (error) => set({ error }),

  setAuthChecked: (checked) => set({ isAuthChecked: checked }),

  logout: async () => {
    try {
      await memberAPI.deleteMember();
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isAuthChecked: true,
      });
    }
  },

  hasAuthority: (authority) => {
    const { user } = get();
    if (!user) return false;

    switch (authority) {
      case Authority.ADMIN_MEMBER:
        return user.authority === Authority.ADMIN_MEMBER;
      case Authority.SELLING_MEMBER:
        return (
          user.authority === Authority.SELLING_MEMBER ||
          user.authority === Authority.ADMIN_MEMBER
        );
      case Authority.GENERAL_MEMBER:
        return true;
      default:
        return false;
    }
  },
}));
