import { useState } from "react";

import { REGISTER_CONSTANTS } from "@constants";
import { Icon } from "@components";
import "@styles/register-agreement.css";

interface RegisterAgreementProps {
  onProceed: () => void;
}

const RegisterAgreement = ({ onProceed }: RegisterAgreementProps) => {
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    optional: false,
  });
  const [error, setError] = useState("");

  const getCheckboxClassName = (checked: boolean) => {
    const classes = ["register-agreement__checkbox"];
    if (checked) classes.push("register-agreement__checkbox--checked");
    return classes.join(" ");
  };

  const handleAgreementChange = (type: string) => {
    if (type === "all") {
      const newValue = !agreements.all;
      setAgreements({
        all: newValue,
        age: newValue,
        terms: newValue,
        optional: newValue,
      });
    } else {
      setAgreements((prev) => {
        const updated = {
          ...prev,
          [type]: !prev[type as keyof typeof prev],
        };
        updated.all = updated.age && updated.terms && updated.optional;

        return updated;
      });
    }
  };

  const handleProceedToRegister = () => {
    if (!agreements.age || !agreements.terms) {
      setError(REGISTER_CONSTANTS.ERROR.REQUIRED_AGREEMENT);
      return;
    }
    onProceed();
  };

  return (
    <main className="register-agreement">
      <h1 className="register-agreement__title">
        {REGISTER_CONSTANTS.AGREEMENT.TITLE_LINE1}
        <br />
        {REGISTER_CONSTANTS.AGREEMENT.TITLE_LINE2}
      </h1>

      <div
        className="register-agreement__all"
        onClick={() => handleAgreementChange("all")}
      >
        <button
          type="button"
          className={getCheckboxClassName(agreements.all)}
          aria-label="전체 동의"
        >
          {agreements.all && <Icon name="check" size={12} color="white" />}
        </button>
        <span className="register-agreement__text">
          {REGISTER_CONSTANTS.AGREEMENT.ALL_AGREEMENT}
        </span>
      </div>

      <div className="register-agreement__items">
        <div
          className="register-agreement__item"
          onClick={() => handleAgreementChange("age")}
        >
          <button
            type="button"
            className={getCheckboxClassName(agreements.age)}
            aria-label="만 14세 이상"
          >
            {agreements.age && <Icon name="check" size={12} color="white" />}
          </button>
          <span className="register-agreement__text">
            {REGISTER_CONSTANTS.AGREEMENT.AGE_REQUIREMENT}
          </span>
        </div>

        <div
          className="register-agreement__item"
          onClick={() => handleAgreementChange("terms")}
        >
          <button
            type="button"
            className={getCheckboxClassName(agreements.terms)}
            aria-label="이용약관 동의"
          >
            {agreements.terms && <Icon name="check" size={12} color="white" />}
          </button>
          <span className="register-agreement__text">
            {REGISTER_CONSTANTS.AGREEMENT.TERMS_REQUIREMENT}{" "}
            <button type="button" className="register-agreement__link">
              {REGISTER_CONSTANTS.AGREEMENT.TERMS_DETAIL}
            </button>
          </span>
        </div>

        <div
          className="register-agreement__item"
          onClick={() => handleAgreementChange("optional")}
        >
          <button
            type="button"
            className={getCheckboxClassName(agreements.optional)}
            aria-label="마케팅 수신 동의"
          >
            {agreements.optional && (
              <Icon name="check" size={12} color="white" />
            )}
          </button>
          <span className="register-agreement__text">
            {REGISTER_CONSTANTS.AGREEMENT.MARKETING_OPTIONAL}
          </span>
        </div>
      </div>

      {error && (
        <div className="register-agreement__error" role="alert">
          {error}
        </div>
      )}

      <div className="register-agreement__submit">
        <button
          type="button"
          className="register-agreement__submit-button"
          onClick={handleProceedToRegister}
          disabled={!agreements.age || !agreements.terms}
        >
          {REGISTER_CONSTANTS.AGREEMENT.PROCEED_BUTTON}
        </button>
      </div>
    </main>
  );
};

export default RegisterAgreement;
