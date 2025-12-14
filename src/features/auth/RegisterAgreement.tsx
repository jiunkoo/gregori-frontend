import { useState } from "react";

import { Icon } from "@components";

import { REGISTER_AGREEMENT_CONSTANTS } from "@/features/auth/RegisterAgreement.constants";
import "@/features/auth/RegisterAgreement.css";

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
      setError(REGISTER_AGREEMENT_CONSTANTS.ERROR.REQUIRED_AGREEMENT);
      return;
    }
    onProceed();
  };

  return (
    <main className="register-agreement">
      <h1 className="register-agreement__title">
        {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.TITLE_LINE1}
        <br />
        {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.TITLE_LINE2}
      </h1>

      <div
        className="register-agreement__all"
        onClick={() => handleAgreementChange("all")}
      >
        <button
          type="button"
          className={getCheckboxClassName(agreements.all)}
          aria-label={
            REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.ALL_AGREEMENT_ARIA_LABEL
          }
        >
          {agreements.all && <Icon name="check" size={12} color="white" />}
        </button>
        <span className="register-agreement__text">
          {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.ALL_AGREEMENT}
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
            aria-label={
              REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.AGE_REQUIREMENT_ARIA_LABEL
            }
          >
            {agreements.age && <Icon name="check" size={12} color="white" />}
          </button>
          <span className="register-agreement__text">
            {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.AGE_REQUIREMENT}
          </span>
        </div>

        <div
          className="register-agreement__item"
          onClick={() => handleAgreementChange("terms")}
        >
          <button
            type="button"
            className={getCheckboxClassName(agreements.terms)}
            aria-label={
              REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.TERMS_REQUIREMENT
            }
          >
            {agreements.terms && <Icon name="check" size={12} color="white" />}
          </button>
          <span className="register-agreement__text">
            {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.TERMS_REQUIREMENT}{" "}
            <button type="button" className="register-agreement__link">
              {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.TERMS_DETAIL}
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
            aria-label={
              REGISTER_AGREEMENT_CONSTANTS.AGREEMENT
                .MARKETING_OPTIONAL_ARIA_LABEL
            }
          >
            {agreements.optional && (
              <Icon name="check" size={12} color="white" />
            )}
          </button>
          <span className="register-agreement__text">
            {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.MARKETING_OPTIONAL}
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
          {REGISTER_AGREEMENT_CONSTANTS.AGREEMENT.PROCEED_BUTTON}
        </button>
      </div>
    </main>
  );
};

export default RegisterAgreement;
