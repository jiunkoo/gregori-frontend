import { create } from "zustand";
import { SessionMember, Authority } from "@models";
import { memberAPI } from "@api/member";

import { toResult } from "@/utils/result";
import { getApiErrorMessage } from "@/utils/error";

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
    const result = await toResult(memberAPI.deleteMember());

    if (!result.ok) {
      const message = getApiErrorMessage(
        result.error,
        "로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요."
      );
      set({ error: message });
    }

    set({
      user: null,
      isAuthenticated: false,
      error: null,
      isAuthChecked: true,
    });
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
