import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { memberAPI } from '../../api/member';
import Header from '../../components/common/Header';
import { DropdownIcon } from '../../components/icons/SocialIcons';
import '../../styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [agreements, setAgreements] = useState({
    allAgree: false,
    ageAgree: false,
    termsAgree: false,
    privacyAgree: false,
  });

  const [formData, setFormData] = useState({
    email: '',
    emailDomain: 'gmail.com',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationVerified, setIsVerificationVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleAgreementChange = (type: string) => {
    if (type === 'allAgree') {
      const newValue = !agreements.allAgree;
      setAgreements({
        allAgree: newValue,
        ageAgree: newValue,
        termsAgree: newValue,
        privacyAgree: newValue,
      });
    } else {
      setAgreements(prev => ({
        ...prev,
        [type]: !prev[type as keyof typeof prev],
        allAgree: false,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendVerification = async () => {
    if (!formData.phone) {
      setError('휴대폰 번호를 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      setIsVerificationSent(true);
      setError('');
    } catch (error) {
      setError('인증번호 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      setIsVerificationVerified(true);
      setError('');
    } catch (error) {
      setError('인증번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password || !formData.name || !formData.phone) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isVerificationVerified) {
      setError('휴대폰 인증을 완료해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const fullEmail = `${formData.email}@${formData.emailDomain}`;
      await memberAPI.register({
        email: fullEmail,
        password: formData.password,
        name: formData.name,
      });
      
      navigate('/login', { state: { message: '회원가입이 완료되었습니다.' } });
    } catch (error: any) {
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAgreementStep = () => (
    <div className="auth-container">
      <Header />

      <div className="auth-layout">
        <div className="auth-side-panel"></div>
        
        <div className="agreement-container">
          <div className="p-6">
            <div className="text-left mb-6">
              <h1 className="agreement-title">
                환영합니다!<br />
                GREGORI에 가입하시려면<br />
                서비스 이용약관에 동의해 주세요.
              </h1>
            </div>

            <div className="agreement-list">
              <div className="agreement-item">
                <input
                  type="checkbox"
                  id="allAgree"
                  checked={agreements.allAgree}
                  onChange={() => handleAgreementChange('allAgree')}
                  className="agreement-checkbox-main"
                />
                <label htmlFor="allAgree" className="agreement-label-main">
                  약관 전체 동의하기(선택 동의 포함)
                </label>
              </div>

              <div className="agreement-item-nested">
                <div className="agreement-item">
                  <button
                    onClick={() => handleAgreementChange('ageAgree')}
                    className="agreement-checkbox-button"
                  >
                    <svg 
                      className={`agreement-checkbox-icon ${agreements.ageAgree ? 'agreement-checkbox-icon-checked' : 'agreement-checkbox-icon-unchecked'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <label 
                    htmlFor="ageAgree" 
                    className="agreement-label"
                    onClick={() => handleAgreementChange('ageAgree')}
                  >
                    [필수] 만 14세 이상입니다.
                  </label>
                </div>

                <div className="agreement-item">
                  <button
                    onClick={() => handleAgreementChange('termsAgree')}
                    className="agreement-checkbox-button"
                  >
                    <svg 
                      className={`agreement-checkbox-icon ${agreements.termsAgree ? 'agreement-checkbox-icon-checked' : 'agreement-checkbox-icon-unchecked'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <label 
                    htmlFor="termsAgree" 
                    className="agreement-label"
                    onClick={() => handleAgreementChange('termsAgree')}
                  >
                    [필수] 이용약관 동의 <span className="agreement-link">자세히</span>
                  </label>
                </div>

                <div className="agreement-item">
                  <button
                    onClick={() => handleAgreementChange('privacyAgree')}
                    className="agreement-checkbox-button"
                  >
                    <svg 
                      className={`agreement-checkbox-icon ${agreements.privacyAgree ? 'agreement-checkbox-icon-checked' : 'agreement-checkbox-icon-unchecked'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <label 
                    htmlFor="privacyAgree" 
                    className="agreement-label"
                    onClick={() => handleAgreementChange('privacyAgree')}
                  >
                    [필수] 개인정보처리방침 동의 <span className="agreement-link">자세히</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="button-section button-section-bottom">
            <button
              onClick={() => {
                if (agreements.ageAgree && agreements.termsAgree && agreements.privacyAgree) {
                  setCurrentStep(2);
                } else {
                  setError('필수 약관에 모두 동의해주세요.');
                }
              }}
              disabled={!agreements.ageAgree || !agreements.termsAgree || !agreements.privacyAgree}
              className="button-primary"
            >
              동의하고 가입하기
            </button>
          </div>
        </div>
        
        <div className="auth-side-panel"></div>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="auth-container">
      <Header />

      <div className="auth-layout">
        <div className="auth-side-panel"></div>
        
        <div className="auth-form-container">
          <div className="auth-form-content">
            <div className="form-title-section">
              <h1 className="form-title">회원가입</h1>
              <p className="form-subtitle">GREGORI에 오신 것을 환영합니다!</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-standard">이메일</label>
                <div className="email-input-group">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-flex"
                    placeholder="이메일"
                    required
                  />
                  <span className="email-separator">@</span>
                  <div className="select-wrapper">
                    <select
                      name="emailDomain"
                      value={formData.emailDomain}
                      onChange={handleInputChange}
                      className="select-standard"
                    >
                      <option value="gmail.com">gmail.com</option>
                      <option value="naver.com">naver.com</option>
                      <option value="daum.net">daum.net</option>
                      <option value="yahoo.com">yahoo.com</option>
                    </select>
                    <div className="select-icon-wrapper">
                      <DropdownIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="label-standard">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-standard"
                  placeholder="비밀번호"
                  required
                />
              </div>

              <div>
                <label className="label-standard">비밀번호 확인</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-standard"
                  placeholder="비밀번호 확인"
                  required
                />
              </div>

              <div>
                <label className="label-standard">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-standard"
                  placeholder="이름"
                  required
                />
              </div>

              <div>
                <label className="label-standard">휴대폰 번호</label>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-flex"
                    placeholder="휴대폰 번호"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={isVerificationSent}
                    className="button-secondary"
                  >
                    {isVerificationSent ? '전송완료' : '인증번호 전송'}
                  </button>
                </div>
              </div>

              <div>
                <label className="label-standard">인증번호</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input-flex disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="인증번호"
                    disabled={!isVerificationSent}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isVerificationVerified || !isVerificationSent}
                    className="button-secondary"
                  >
                    {isVerificationVerified ? '인증완료' : '인증번호 확인'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="button-section button-section-register">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isVerificationVerified}
              className="button-primary"
            >
              {isLoading ? '처리중...' : '회원가입'}
            </button>
            
            <div className="login-link-section">
              <p className="login-link-text">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="login-link">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="auth-side-panel"></div>
      </div>
    </div>
  );

  return (
    <div>
      {currentStep === 1 ? renderAgreementStep() : renderRegisterForm()}
    </div>
  );
};

export default Register;
