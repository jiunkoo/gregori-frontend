import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { authAPI, memberAPI } from "@api";
import { Layout, Icon } from "@components";
import { useAuthStore } from "@stores";

import { toResult } from "@/utils/result";
import { getApiErrorMessage } from "@/utils/error";
import { LOGIN_CONSTANTS } from "@/features/auth/Login.constants";
import "@/features/auth/Login.css";

const REMEMBERED_EMAIL = "rememberedEmail";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setAuthError(null);

    const trimmed = {
      ...formData,
      email: formData.email.trim(),
    };

    const signInResult = await toResult(authAPI.signIn(trimmed));
    if (!signInResult.ok) {
      const msg = getApiErrorMessage(
        signInResult.error,
        LOGIN_CONSTANTS.ERROR_MESSAGE
      );
      setError(msg);
      setAuthError(msg);
      return;
    }

    const userInfoResult = await toResult(memberAPI.getMember());
    const user = userInfoResult.ok
      ? userInfoResult.value
      : {
          id: 0,
          email: trimmed.email,
          name: LOGIN_CONSTANTS.DEFAULT_USER_NAME,
          authority: "GENERAL_MEMBER" as const,
        };

    setUser(user);

    if (autoLogin) {
      localStorage.setItem(REMEMBERED_EMAIL, trimmed.email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL);
    }

    navigate("/");
  };

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
                    showPassword
                      ? LOGIN_CONSTANTS.PASSWORD_HIDE_ARIA_LABEL
                      : LOGIN_CONSTANTS.PASSWORD_SHOW_ARIA_LABEL
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
            disabled={!isFormValid}
          >
            {LOGIN_CONSTANTS.BUTTON_TEXT}
          </button>
        </form>

        <div className="login__options">
          <label className="login__auto-login">
            <button
              type="button"
              className={getCheckboxClassName()}
              onClick={() => setAutoLogin(!autoLogin)}
              aria-label={LOGIN_CONSTANTS.AUTO_LOGIN_ARIA_LABEL}
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
