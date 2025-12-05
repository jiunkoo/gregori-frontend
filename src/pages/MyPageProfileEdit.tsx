import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Icon } from "@components";
import { useAuthStore } from "@stores";
import { memberAPI } from "@api/member";
import "@styles/mypage-profile-edit.css";

const MyPageProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setError } = useAuthStore();

  const [name, setName] = useState(user?.name ?? "");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [savingName, setSavingName] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleNameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setMessage("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setLocalError("이름을 입력해주세요.");
      return;
    }

    try {
      setSavingName(true);
      await memberAPI.updateName({ name: trimmedName });
      setUser({ ...user, name: trimmedName });
      setMessage("이름이 성공적으로 변경되었습니다.");
    } catch (error: any) {
      const msg = error?.response?.data?.message ?? "이름 변경에 실패했습니다.";
      setLocalError(msg);
      setError(msg);
    } finally {
      setSavingName(false);
    }
  };

  const hasFeedback = !!localError || !!message;

  return (
    <Layout showMyPageSidebar={true}>
      <main className="mypage-profile-edit">
        <div className="mypage-profile-edit__section">
          <div className="mypage-profile-edit__section-header">
            <div className="mypage-profile-edit__section-title">기본 정보</div>
          </div>

          <form
            className="mypage-profile-edit__form"
            onSubmit={handleNameSubmit}
          >
            <div className="mypage-profile-edit__form-group">
              <label className="mypage-profile-edit__form-label">이메일</label>
              <div className="mypage-profile-edit__form-email">
                <input
                  type="email"
                  className="mypage-profile-edit__form-input"
                  value={user.email}
                  disabled
                />
                <span className="mypage-profile-edit__form-email-note">
                  *이메일은 변경할 수 없습니다.
                </span>
              </div>
            </div>
            <div className="mypage-profile-edit__form-group">
              <label className="mypage-profile-edit__form-label">이름</label>
              <input
                type="text"
                className="mypage-profile-edit__form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mypage-profile-edit__form-actions">
              <button
                type="submit"
                className="mypage-profile-edit__button mypage-profile-edit__button--primary"
                disabled={savingName}
              >
                회원 정보 수정
              </button>
              <button
                type="button"
                className="mypage-profile-edit__button mypage-profile-edit__button--secondary"
                onClick={() => {
                  setName(user.name);
                  setLocalError("");
                  setMessage("");
                }}
              >
                수정 취소
              </button>
            </div>
          </form>
        </div>

        {hasFeedback && (
          <div className="mypage-profile-edit__section">
            <div className="mypage-profile-edit__feedback">
              {localError && (
                <div
                  className="mypage-profile-edit__feedback-error"
                  role="alert"
                >
                  <Icon
                    name="error"
                    size={20}
                    className="mypage-profile-edit__feedback-icon"
                  />
                  <span>{localError}</span>
                </div>
              )}
              {message && !localError && (
                <div className="mypage-profile-edit__feedback-success">
                  <span>{message}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default MyPageProfileEdit;
