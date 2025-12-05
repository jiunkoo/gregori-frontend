import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout, Icon } from "@components";
import { MYPAGE_CONSTANTS } from "@constants";
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
      setLocalError(MYPAGE_CONSTANTS.PROFILE_EDIT.MESSAGES.NAME_REQUIRED);
      return;
    }

    try {
      setSavingName(true);
      await memberAPI.updateName({ name: trimmedName });
      setUser({ ...user, name: trimmedName });
      setMessage(MYPAGE_CONSTANTS.PROFILE_EDIT.MESSAGES.NAME_SUCCESS);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ??
        MYPAGE_CONSTANTS.PROFILE_EDIT.MESSAGES.NAME_FAILURE;
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
            <div className="mypage-profile-edit__section-title">
              {MYPAGE_CONSTANTS.PROFILE_EDIT.TITLE}
            </div>
          </div>

          <form
            className="mypage-profile-edit__form"
            onSubmit={handleNameSubmit}
          >
            <div className="mypage-profile-edit__form-group">
              <label className="mypage-profile-edit__form-label">
                {MYPAGE_CONSTANTS.PROFILE_EDIT.LABELS.EMAIL}
              </label>
              <div className="mypage-profile-edit__form-email">
                <input
                  type="email"
                  className="mypage-profile-edit__form-input"
                  value={user.email}
                  disabled
                />
                <span className="mypage-profile-edit__form-email-note">
                  {MYPAGE_CONSTANTS.PROFILE_EDIT.MESSAGES.EMAIL_NOTE}
                </span>
              </div>
            </div>
            <div className="mypage-profile-edit__form-group">
              <label className="mypage-profile-edit__form-label">
                {MYPAGE_CONSTANTS.PROFILE_EDIT.LABELS.NAME}
              </label>
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
                {MYPAGE_CONSTANTS.PROFILE_EDIT.BUTTONS.SUBMIT}
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
                {MYPAGE_CONSTANTS.PROFILE_EDIT.BUTTONS.CANCEL}
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
