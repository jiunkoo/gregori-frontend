import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authAPI, memberAPI } from "@api";
import { Layout, Icon } from "@components";
import { LOGIN_CONSTANTS } from "@constants";
import { useAuthStore } from "@stores";
import "@styles/login.css";

const REMEMBERED_EMAIL = "rememberedEmail";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser, setError: setAuthError } = useAuthStore();

  useEffect(() => {
    const savedEmail = localStorage.getItem(REMEMBERED_EMAIL);
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
      setAutoLogin(true);
    }
  }, []);

  useEffect(() => {
    if (!formData.password) {
      setShowPassword(false);
    }
  }, [formData.password]);

  const isFormValid = useMemo(() => {
    return formData.email.trim().length > 0 && formData.password.length > 0;
  }, [formData]);

  const getCheckboxClassName = () => {
    const classes = ["login__checkbox"];
    if (autoLogin) classes.push("login__checkbox--checked");
    return classes.join(" ");
  };

  const getSocialButtonClassName = (type: "facebook" | "kakao" | "google") => {
    return `login__social-button login__social-button--${type}`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setAuthError(null);
    setIsLoading(true);

    try {
      const trimmedFormData = {
        ...formData,
        email: formData.email.trim(),
      };

      await authAPI.signIn(trimmedFormData);

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

      if (autoLogin) {
        localStorage.setItem(REMEMBERED_EMAIL, trimmedFormData.email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL);
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

  const socialButtons = [
    {
      type: "facebook" as const,
      iconName: "facebook",
      color: "white",
      text: LOGIN_CONSTANTS.SOCIAL_LOGIN.FACEBOOK,
    },
    {
      type: "kakao" as const,
      iconName: "kakao",
      color: "#3A1C1E",
      text: LOGIN_CONSTANTS.SOCIAL_LOGIN.KAKAO,
    },
    {
      type: "google" as const,
      iconName: "googleSocial",
      color: "white",
      text: LOGIN_CONSTANTS.SOCIAL_LOGIN.GOOGLE,
    },
  ];

  return (
    <Layout showNav={false}>
      <main className="login">
        <h1 className="login__title">{LOGIN_CONSTANTS.TITLE}</h1>

        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__field">
            <input
              type="email"
              className="login__input"
              placeholder={LOGIN_CONSTANTS.EMAIL_PLACEHOLDER}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </label>

          <label className="login__field">
            <div className="login__input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="login__input"
                placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              {formData.password && (
                <button
                  type="button"
                  className="login__eye-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  <Icon name={showPassword ? "eye" : "eyeHide"} size={20} />
                </button>
              )}
            </div>
          </label>

          <button
            type="submit"
            className="login__submit"
            disabled={!isFormValid || isLoading}
            aria-busy={isLoading}
          >
            {isLoading
              ? LOGIN_CONSTANTS.BUTTON_LOADING_TEXT
              : LOGIN_CONSTANTS.BUTTON_TEXT}
          </button>
        </form>

        <div className="login__options">
          <label className="login__auto-login">
            <button
              type="button"
              className={getCheckboxClassName()}
              onClick={() => setAutoLogin(!autoLogin)}
              aria-label="자동 로그인"
            >
              {autoLogin && <Icon name="check" size={12} color="white" />}
            </button>
            <span className="login__auto-login-label">
              {LOGIN_CONSTANTS.AUTO_LOGIN_TEXT}
            </span>
          </label>

          <nav className="login__help">
            <button type="button" className="login__help-link">
              {LOGIN_CONSTANTS.FIND_EMAIL_TEXT}
            </button>
            <span className="login__divider" aria-hidden="true"></span>
            <button type="button" className="login__help-link">
              {LOGIN_CONSTANTS.FIND_PASSWORD_TEXT}
            </button>
          </nav>
        </div>

        <div className="login__social">
          {socialButtons.map((button) => (
            <button
              key={button.type}
              type="button"
              className={getSocialButtonClassName(button.type)}
            >
              <Icon
                name={button.iconName}
                size={28}
                className="login__social-icon"
                color={button.color}
              />
              <span className="login__social-label">{button.text}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="login__signup"
        >
          {LOGIN_CONSTANTS.SIGNUP_TEXT}
        </button>

        {error && (
          <div className="login__error" role="alert">
            {error}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Login;
