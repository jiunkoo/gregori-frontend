import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { memberAPI } from "@api";
import { Icon } from "@components";
import { REGISTER_CONSTANTS } from "@constants";
import "@styles/register-form.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    emailDomain: REGISTER_CONSTANTS.EMAIL_DOMAINS.GMAIL,
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationVerified, setIsVerificationVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerification = async () => {
    if (!formData.phone) {
      setError(REGISTER_CONSTANTS.ERROR.PHONE_REQUIRED);
      return;
    }

    try {
      setIsVerificationSent(true);
      setError("");
    } catch (error) {
      setError(REGISTER_CONSTANTS.ERROR.VERIFICATION_SEND_FAILED);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError(REGISTER_CONSTANTS.ERROR.VERIFICATION_CODE_REQUIRED);
      return;
    }

    try {
      setIsVerificationVerified(true);
      setError("");
    } catch (error) {
      setError(REGISTER_CONSTANTS.ERROR.VERIFICATION_FAILED);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.phone
    ) {
      setError(REGISTER_CONSTANTS.ERROR.ALL_FIELDS_REQUIRED);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(REGISTER_CONSTANTS.ERROR.PASSWORD_MISMATCH);
      return;
    }

    if (!isVerificationVerified) {
      setError(REGISTER_CONSTANTS.ERROR.VERIFICATION_NOT_COMPLETED);
      return;
    }

    try {
      const fullEmail = `${formData.email}@${formData.emailDomain}`;
      await memberAPI.register({
        email: fullEmail,
        password: formData.password,
        name: formData.name,
      });

      navigate("/login", {
        state: { message: REGISTER_CONSTANTS.SUCCESS.REGISTER_COMPLETED },
      });
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          REGISTER_CONSTANTS.ERROR.REGISTER_FAILED
      );
    }
  };

  return (
    <main className="register-form">
      <h1 className="register-form__title">{REGISTER_CONSTANTS.FORM.TITLE}</h1>

      {error && (
        <div className="register-form__error" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form__form">
        <div className="register-form__group">
          <label className="register-form__label">
            {REGISTER_CONSTANTS.FORM.NAME_LABEL}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="register-form__input"
            placeholder={REGISTER_CONSTANTS.FORM.NAME_PLACEHOLDER}
            required
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">
            {REGISTER_CONSTANTS.FORM.EMAIL_LABEL}
          </label>
          <div className="register-form__email-group">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="register-form__input"
              placeholder={REGISTER_CONSTANTS.FORM.EMAIL_PLACEHOLDER}
              required
            />
            <span className="register-form__email-separator">@</span>
            <div className="register-form__select-wrapper">
              <select
                name="emailDomain"
                value={formData.emailDomain}
                onChange={handleInputChange}
                className="register-form__select"
              >
                <option value={REGISTER_CONSTANTS.EMAIL_DOMAINS.GMAIL}>
                  {REGISTER_CONSTANTS.EMAIL_DOMAINS.GMAIL}
                </option>
                <option value={REGISTER_CONSTANTS.EMAIL_DOMAINS.NAVER}>
                  {REGISTER_CONSTANTS.EMAIL_DOMAINS.NAVER}
                </option>
                <option value={REGISTER_CONSTANTS.EMAIL_DOMAINS.DAUM}>
                  {REGISTER_CONSTANTS.EMAIL_DOMAINS.DAUM}
                </option>
                <option value={REGISTER_CONSTANTS.EMAIL_DOMAINS.YAHOO}>
                  {REGISTER_CONSTANTS.EMAIL_DOMAINS.YAHOO}
                </option>
              </select>
              <div className="register-form__select-icon">
                <Icon name="arrowDown" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="register-form__group">
          <label className="register-form__label">
            {REGISTER_CONSTANTS.FORM.PASSWORD_LABEL}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="register-form__input"
            placeholder={REGISTER_CONSTANTS.FORM.PASSWORD_PLACEHOLDER}
            required
          />
        </div>

        <div className="register-form__group">
          <label className="register-form__label">
            {REGISTER_CONSTANTS.FORM.CONFIRM_PASSWORD_LABEL}
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="register-form__input"
            placeholder={REGISTER_CONSTANTS.FORM.CONFIRM_PASSWORD_PLACEHOLDER}
            required
          />
        </div>

        <div className="register-form__submit">
          <button
            type="submit"
            className="register-form__submit-button"
            disabled={!isVerificationVerified}
          >
            {REGISTER_CONSTANTS.FORM.SUBMIT_BUTTON}
          </button>
        </div>
      </form>

      <div className="register-form__login-link">
        <p>
          {REGISTER_CONSTANTS.FORM.ALREADY_ACCOUNT}{" "}
          <Link to="/login" className="register-form__login-link-text">
            {REGISTER_CONSTANTS.FORM.LOGIN_LINK}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterForm;
