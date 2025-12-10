import { useState } from "react";
import { Layout } from "@components";
import RegisterAgreement from "./RegisterAgreement";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleProceed = () => {
    setCurrentStep(2);
  };

  return (
    <Layout showNav={false}>
      {currentStep === 1 ? (
        <RegisterAgreement onProceed={handleProceed} />
      ) : (
        <RegisterForm />
      )}
    </Layout>
  );
};

export default Register;
