import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Icon } from "@components";
import { MYPAGE_PASSWORD_EDIT_CONSTANTS } from "@/features/mypage/MyPagePasswordEdit.constants";
import { useAuthStore } from "@stores";
import { memberAPI } from "@api/member";
import "@/features/mypage/MyPagePasswordEdit.css";

const MyPagePasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user, setError } = useAuthStore();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");
    setMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError(MYPAGE_PASSWORD_EDIT_CONSTANTS.MESSAGES.REQUIRED);
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError(MYPAGE_PASSWORD_EDIT_CONSTANTS.MESSAGES.MISMATCH);
      return;
    }

    try {
      setSavingPassword(true);
      await memberAPI.updatePassword({
        currentPassword,
        newPassword,
      });
      setMessage(MYPAGE_PASSWORD_EDIT_CONSTANTS.MESSAGES.SUCCESS);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        MYPAGE_PASSWORD_EDIT_CONSTANTS.MESSAGES.FAILURE;
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
              {MYPAGE_PASSWORD_EDIT_CONSTANTS.TITLE}
            </div>
          </div>

          <form
            className="mypage-password-edit__form"
            onSubmit={handlePasswordSubmit}
          >
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_PASSWORD_EDIT_CONSTANTS.LABELS.CURRENT_PASSWORD}
              </label>
              <div className="mypage-password-edit__input-wrapper">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="mypage-password-edit__form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {currentPassword && (
                  <button
                    type="button"
                    className="mypage-password-edit__eye-button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    aria-label={
                      showCurrentPassword
                        ? MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.CURRENT_HIDE
                        : MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.CURRENT_SHOW
                    }
                  >
                    <Icon
                      name={showCurrentPassword ? "eye" : "eyeHide"}
                      size={20}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_PASSWORD_EDIT_CONSTANTS.LABELS.NEW_PASSWORD}
              </label>
              <div className="mypage-password-edit__input-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="mypage-password-edit__form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPassword && (
                  <button
                    type="button"
                    className="mypage-password-edit__eye-button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    aria-label={
                      showNewPassword
                        ? MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.NEW_HIDE
                        : MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.NEW_SHOW
                    }
                  >
                    <Icon
                      name={showNewPassword ? "eye" : "eyeHide"}
                      size={20}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="mypage-password-edit__form-group">
              <label className="mypage-password-edit__form-label">
                {MYPAGE_PASSWORD_EDIT_CONSTANTS.LABELS.CONFIRM_PASSWORD}
              </label>
              <div className="mypage-password-edit__input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="mypage-password-edit__form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && (
                  <button
                    type="button"
                    className="mypage-password-edit__eye-button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.CONFIRM_HIDE
                        : MYPAGE_PASSWORD_EDIT_CONSTANTS.VISIBILITY.CONFIRM_SHOW
                    }
                  >
                    <Icon
                      name={showConfirmPassword ? "eye" : "eyeHide"}
                      size={20}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="mypage-password-edit__form-actions">
              <button
                type="submit"
                className="mypage-password-edit__button mypage-password-edit__button--primary"
                disabled={savingPassword}
              >
                {MYPAGE_PASSWORD_EDIT_CONSTANTS.BUTTONS.SUBMIT}
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
                {MYPAGE_PASSWORD_EDIT_CONSTANTS.BUTTONS.CANCEL}
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
