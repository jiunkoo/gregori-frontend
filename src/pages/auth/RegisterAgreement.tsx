import React, { useState } from "react";
import { REGISTER_CONSTANTS } from "@constants";
import { Icon } from "@components";
import "@styles/register-agreement.css";

interface RegisterAgreementProps {
  onProceed: () => void;
}

const RegisterAgreement: React.FC<RegisterAgreementProps> = ({ onProceed }) => {
  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    optional: false,
  });
  const [error, setError] = useState("");

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
    <div className="register-agreement-container">
      <div className="register-agreement-title">
        <h1 className="register-agreement-title-text">
          {REGISTER_CONSTANTS.AGREEMENT.TITLE_LINE1}
          <br />
          {REGISTER_CONSTANTS.AGREEMENT.TITLE_LINE2}
        </h1>
      </div>

      <div
        className="register-agreement-all"
        onClick={() => handleAgreementChange("all")}
      >
        <div
          className={`register-agreement-checkbox ${
            agreements.all ? "checked" : ""
          }`}
        >
          {agreements.all && <Icon name="check" size={12} color="white" />}
        </div>
        <div className="register-agreement-text">
          {REGISTER_CONSTANTS.AGREEMENT.ALL_AGREEMENT}
        </div>
      </div>

      <div className="register-agreement-items">
        <div
          className="register-agreement-item"
          onClick={() => handleAgreementChange("age")}
        >
          <div
            className={`register-agreement-checkbox ${
              agreements.age ? "checked" : ""
            }`}
          >
            {agreements.age && <Icon name="check" size={12} color="white" />}
          </div>
          <div className="register-agreement-text">
            {REGISTER_CONSTANTS.AGREEMENT.AGE_REQUIREMENT}
          </div>
        </div>

        <div
          className="register-agreement-item"
          onClick={() => handleAgreementChange("terms")}
        >
          <div
            className={`register-agreement-checkbox ${
              agreements.terms ? "checked" : ""
            }`}
          >
            {agreements.terms && <Icon name="check" size={12} color="white" />}
          </div>
          <div className="register-agreement-text">
            {REGISTER_CONSTANTS.AGREEMENT.TERMS_REQUIREMENT}{" "}
            <span className="register-agreement-link">
              {REGISTER_CONSTANTS.AGREEMENT.TERMS_DETAIL}
            </span>
          </div>
        </div>

        <div
          className="register-agreement-item"
          onClick={() => handleAgreementChange("optional")}
        >
          <div
            className={`register-agreement-checkbox ${
              agreements.optional ? "checked" : ""
            }`}
          >
            {agreements.optional && (
              <Icon name="check" size={12} color="white" />
            )}
          </div>
          <div className="register-agreement-text">
            {REGISTER_CONSTANTS.AGREEMENT.MARKETING_OPTIONAL}
          </div>
        </div>
      </div>

      {error && <div className="register-agreement-error-message">{error}</div>}

      <div className="register-agreement-submit-section">
        <button
          className="register-agreement-submit-button"
          onClick={handleProceedToRegister}
          disabled={!agreements.age || !agreements.terms}
        >
          <span className="register-agreement-submit-text">
            {REGISTER_CONSTANTS.AGREEMENT.PROCEED_BUTTON}
          </span>
        </button>
      </div>
    </div>
  );
};

export default RegisterAgreement;
