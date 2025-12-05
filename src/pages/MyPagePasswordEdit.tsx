import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Icon } from "@components";
import { MYPAGE_CONSTANTS } from "@constants";
import { useAuthStore } from "@stores";
import { memberAPI } from "@api/member";
import "@styles/mypage-password-edit.css";

const MyPagePasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user, setError } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError(MYPAGE_CONSTANTS.PASSWORD_EDIT.MESSAGES.REQUIRED);
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError(MYPAGE_CONSTANTS.PASSWORD_EDIT.MESSAGES.MISMATCH);
      return;
    }

    try {
      setSavingPassword(true);
      await memberAPI.updatePassword({
        currentPassword,
        newPassword,
      });
      setMessage(MYPAGE_CONSTANTS.PASSWORD_EDIT.MESSAGES.SUCCESS);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        MYPAGE_CONSTANTS.PASSWORD_EDIT.MESSAGES.FAILURE;
      setLocalError(msg);
      setError(msg);
    } finally {
      setSavingPassword(false);
    }
  };

  const hasFeedback = !!localError || !!message;

  return (
    <Layout showMyPageSidebar={true}>
      <main className="mypage-password-edit">
        <div className="mypage-password-edit__section">
          <div className="mypage-password-edit__section-header">
            <div className="mypage-password-edit__section-title">
              {MYPAGE_CONSTANTS.PASSWORD_EDIT.TITLE}
            </div>
          </div>

          <form
            className="mypage-password-edit__form"
            onSubmit={handlePasswordSubmit}
          >
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_CONSTANTS.PASSWORD_EDIT.LABELS.CURRENT_PASSWORD}
              </label>
              <input
                type="password"
                className="mypage-password-edit__form-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_CONSTANTS.PASSWORD_EDIT.LABELS.NEW_PASSWORD}
              </label>
              <input
                type="password"
                className="mypage-password-edit__form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_CONSTANTS.PASSWORD_EDIT.LABELS.CONFIRM_PASSWORD}
              </label>
              <input
                type="password"
                className="mypage-password-edit__form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mypage-password-edit__form-actions">
              <button
                type="submit"
                className="mypage-password-edit__button mypage-password-edit__button--primary"
                disabled={savingPassword}
              >
                {MYPAGE_CONSTANTS.PASSWORD_EDIT.BUTTONS.SUBMIT}
              </button>
              <button
                type="button"
                className="mypage-password-edit__button mypage-password-edit__button--secondary"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setLocalError("");
                  setMessage("");
                }}
              >
                {MYPAGE_CONSTANTS.PASSWORD_EDIT.BUTTONS.CANCEL}
              </button>
            </div>
          </form>
        </div>

        {hasFeedback && (
          <div className="mypage-password-edit__section">
            <div className="mypage-password-edit__feedback">
              {localError && (
                <div
                  className="mypage-password-edit__feedback-error"
                  role="alert"
                >
                  <Icon
                    name="error"
                    size={20}
                    className="mypage-password-edit__feedback-icon"
                  />
                  <span>{localError}</span>
                </div>
              )}
              {message && !localError && (
                <div className="mypage-password-edit__feedback-success">
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

export default MyPagePasswordEdit;
