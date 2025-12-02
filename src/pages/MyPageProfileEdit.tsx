import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Icon } from "@components";
import { useAuthStore } from "@stores";
import { memberAPI } from "@api/member";
import "@styles/mypage.css";

const MyPageProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, setError } = useAuthStore();

  const [name, setName] = useState(user?.name ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

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

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError("현재 비밀번호와 새 비밀번호를 모두 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setSavingPassword(true);
      await memberAPI.updatePassword({
        currentPassword,
        newPassword,
      });
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ?? "비밀번호 변경에 실패했습니다.";
      setLocalError(msg);
      setError(msg);
    } finally {
      setSavingPassword(false);
    }
  };

  const hasFeedback = !!localError || !!message;

  return (
    <Layout showMyPageSidebar={true}>
      <main className="mypage">
        <div className="mypage__section">
          <div className="mypage__section-header">
            <div className="mypage__section-title">기본 정보</div>
          </div>

          <form className="mypage__form" onSubmit={handleNameSubmit}>
            <div className="mypage__form-group">
              <label className="mypage__form-label">이메일</label>
              <div className="mypage__form-value">{user.email}</div>
            </div>
            <div className="mypage__form-group">
              <label className="mypage__form-label">이름</label>
              <input
                type="text"
                className="mypage__form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mypage__form-actions">
              <button
                type="submit"
                className="mypage__button mypage__button--primary"
                disabled={savingName}
              >
                이름 저장
              </button>
              <button
                type="button"
                className="mypage__button"
                onClick={() => {
                  setName(user.name);
                  setLocalError("");
                  setMessage("");
                }}
              >
                되돌리기
              </button>
            </div>
          </form>
        </div>

        <div className="mypage__section">
          <div className="mypage__section-header">
            <div className="mypage__section-title">비밀번호 변경</div>
          </div>

          <form className="mypage__form" onSubmit={handlePasswordSubmit}>
            <div className="mypage__form-group">
              <label className="mypage__form-label">현재 비밀번호</label>
              <input
                type="password"
                className="mypage__form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mypage__form-group">
              <label className="mypage__form-label">새 비밀번호</label>
              <input
                type="password"
                className="mypage__form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mypage__form-group">
              <label className="mypage__form-label">새 비밀번호 확인</label>
              <input
                type="password"
                className="mypage__form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mypage__form-actions">
              <button
                type="submit"
                className="mypage__button mypage__button--primary"
                disabled={savingPassword}
              >
                비밀번호 변경
              </button>
            </div>
          </form>
        </div>

        {hasFeedback && (
          <div className="mypage__section">
            <div className="mypage__feedback">
              {localError && (
                <div className="mypage__feedback-error" role="alert">
                  <Icon
                    name="error"
                    size={20}
                    className="mypage__feedback-icon"
                  />
                  <span>{localError}</span>
                </div>
              )}
              {message && !localError && (
                <div className="mypage__feedback-success">
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
