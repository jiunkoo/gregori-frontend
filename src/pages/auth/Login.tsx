import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores";
import { authAPI, memberAPI } from "@api";
import { Layout, Icon } from "@components";
import { LOGIN_CONSTANTS } from "@constants";
import "@styles/login.css";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const navigate = useNavigate();
  const { setUser, setError: setAuthError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authAPI.signIn(formData);

      try {
        const userInfo = await memberAPI.getMember();
        setUser(userInfo);
      } catch (userErr: any) {
        console.error("사용자 정보 조회 실패:", userErr);
        setUser({
          id: 0,
          email: formData.email,
          name: LOGIN_CONSTANTS.DEFAULT_USER_NAME,
          authority: "GENERAL_MEMBER" as any,
        });
      }

      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || LOGIN_CONSTANTS.ERROR_MESSAGE);
      setAuthError(
        err.response?.data?.message || LOGIN_CONSTANTS.ERROR_MESSAGE
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout showNav={false}>
      <div className="login-container">
        <div className="login-title">
          <h1 className="login-title-text">{LOGIN_CONSTANTS.TITLE}</h1>
        </div>

        <div className="login-input-section">
          <form onSubmit={handleSubmit}>
            <div className="login-input-container">
              <input
                type="email"
                className="login-input"
                placeholder={LOGIN_CONSTANTS.EMAIL_PLACEHOLDER}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="login-input-container">
              <input
                type="password"
                className="login-input"
                placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </form>
        </div>

        <div className="login-button-section">
          <button
            type="submit"
            className="login-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="login-button-text">
              {isLoading
                ? LOGIN_CONSTANTS.BUTTON_LOADING_TEXT
                : LOGIN_CONSTANTS.BUTTON_TEXT}
            </span>
          </button>
        </div>

        <div className="login-options-section">
          <div className="login-auto-login">
            <div
              className={`login-checkbox ${autoLogin ? "checked" : ""}`}
              onClick={() => setAutoLogin(!autoLogin)}
            >
              {autoLogin && <Icon name="check" size={12} color="white" />}
            </div>
            <span className="login-auto-login-text">
              {LOGIN_CONSTANTS.AUTO_LOGIN_TEXT}
            </span>
          </div>

          <div className="login-find-links">
            <button className="login-find-link">
              {LOGIN_CONSTANTS.FIND_EMAIL_TEXT}
            </button>
            <div className="login-divider"></div>
            <button className="login-find-link">
              {LOGIN_CONSTANTS.FIND_PASSWORD_TEXT}
            </button>
          </div>
        </div>

        <div className="login-social-section">
          <button className="login-social-button facebook">
            <Icon
              name="facebook"
              size={28}
              className="login-social-icon"
              color="white"
            />
            <span className="login-social-text">
              {LOGIN_CONSTANTS.SOCIAL_LOGIN.FACEBOOK}
            </span>
          </button>

          <button className="login-social-button kakao">
            <Icon
              name="kakao"
              size={28}
              className="login-social-icon"
              color="#3A1C1E"
            />
            <span className="login-social-text">
              {LOGIN_CONSTANTS.SOCIAL_LOGIN.KAKAO}
            </span>
          </button>

          <button className="login-social-button google">
            <Icon
              name="googleSocial"
              size={28}
              className="login-social-icon"
              color="white"
            />
            <span className="login-social-text">
              {LOGIN_CONSTANTS.SOCIAL_LOGIN.GOOGLE}
            </span>
          </button>
        </div>

        <div className="login-signup-section">
          <button
            onClick={() => navigate("/register")}
            className="login-signup-button"
          >
            <span className="login-signup-text">
              {LOGIN_CONSTANTS.SIGNUP_TEXT}
            </span>
          </button>
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Login;
