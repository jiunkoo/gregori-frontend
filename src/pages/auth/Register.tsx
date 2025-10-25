import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { memberAPI } from '@api/member';
import Header from '@components/common/Header';
import Icon from '@components/icons/SvgIcon';
import '@styles/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    emailDomain: 'gmail.com',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationVerified, setIsVerificationVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        name: formData.name
      });

      navigate('/login', { state: { message: '회원가입이 완료되었습니다.' } });
    } catch (error: any) {
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderAgreementStep = () => (
    <div className="register-page">
      <Header />

      {/* 좌우 회색 박스 */}
      <div className="register-side-boxes">
        <div className="register-side-box register-side-box-left"></div>
        <div className="register-side-box register-side-box-right"></div>
      </div>

      {/* 환영문구 섹션 */}
      <div className="register-welcome">
        <h1 className="register-welcome-title">
          환영합니다!<br/>
          GREGORI에 가입하시려면 서비스 이용약관에 동의해 주세요.
        </h1>
      </div>

      {/* 약관 전체 동의하기 */}
      <div className="register-agreement-all">
        <div className="register-agreement-checkbox">
          <Icon name="checkbox" size={20} />
        </div>
        <div className="register-agreement-text">
          약관 전체 동의하기(선택 동의 포함)
        </div>
      </div>

      {/* 약관 항목들 */}
      <div className="register-agreement-items">
        <div className="register-agreement-item">
          <div className="register-agreement-checkbox">
            <Icon name="check" size={16} color="#E8E8E8" />
          </div>
          <div className="register-agreement-text">
            [필수] 만 14세 이상입니다.
          </div>
        </div>

        <div className="register-agreement-item">
          <div className="register-agreement-checkbox">
            <Icon name="check" size={16} color="#E8E8E8" />
          </div>
          <div className="register-agreement-text">
            [필수] 이용약관 동의 <span className="register-agreement-link">자세히</span>
          </div>
        </div>

        <div className="register-agreement-item">
          <div className="register-agreement-checkbox">
            <Icon name="check" size={16} color="#0B87F0" />
          </div>
          <div className="register-agreement-text">
            약관 전체 동의하기(선택 동의 포함)
          </div>
        </div>
      </div>

      {/* 동의하고 가입하기 버튼 */}
      <div className="register-submit-section">
        <div className="register-submit-text">동의하고 가입하기</div>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="register-page">
      <Header />

      {/* 좌우 회색 박스 */}
      <div className="register-side-boxes">
        <div className="register-side-box register-side-box-left"></div>
        <div className="register-side-box register-side-box-right"></div>
      </div>

      {/* 회원가입 폼 영역 */}
      <div className="register-container">
        <div className="register-form-content">
          <div className="register-form-title">
            <h1>회원가입</h1>
            <p>GREGORI에 오신 것을 환영합니다!</p>
          </div>

          {error && <div className="register-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-form-group">
              <label className="register-form-label">이메일</label>
              <div className="register-email-group">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="register-form-input"
                  placeholder="이메일"
                  required
                />
                <span className="register-email-separator">@</span>
                <select
                  name="emailDomain"
                  value={formData.emailDomain}
                  onChange={handleInputChange}
                  className="register-form-select"
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="yahoo.com">yahoo.com</option>
                </select>
              </div>
            </div>

            <div className="register-form-group">
              <label className="register-form-label">비밀번호</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="register-form-input"
                placeholder="비밀번호"
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="register-form-input"
                placeholder="비밀번호 확인"
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="register-form-input"
                placeholder="이름"
                required
              />
            </div>

            <div className="register-form-group">
              <label className="register-form-label">휴대폰 번호</label>
              <div className="register-phone-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="register-form-input"
                  placeholder="휴대폰 번호"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={isVerificationSent}
                  className="register-verify-button"
                >
                  {isVerificationSent ? '전송완료' : '인증번호 전송'}
                </button>
              </div>
            </div>

            <div className="register-form-group">
              <label className="register-form-label">인증번호</label>
              <div className="register-phone-group">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="register-form-input"
                  placeholder="인증번호"
                  disabled={!isVerificationSent}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isVerificationVerified || !isVerificationSent}
                  className="register-verify-button"
                >
                  {isVerificationVerified ? '인증완료' : '인증번호 확인'}
                </button>
              </div>
            </div>
          </form>

          <div className="register-form-submit">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isVerificationVerified}
              className="register-submit-button"
            >
              {isLoading ? '처리중...' : '회원가입'}
            </button>

            <div className="register-login-link">
              <p>
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="register-login-link-text">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>
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
