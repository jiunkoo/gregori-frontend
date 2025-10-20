import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { memberAPI } from '../../api/member';
import Header from '../../components/common/Header';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 약관 동의 상태
  const [agreements, setAgreements] = useState({
    allAgree: false,
    ageAgree: false,
    termsAgree: false,
    privacyAgree: false,
  });

  // 폼 데이터
  const [formData, setFormData] = useState({
    email: '',
    emailDomain: 'gmail.com',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  // 인증 관련 상태
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationVerified, setIsVerificationVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  // 약관 동의 처리
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
        allAgree: false, // 개별 항목 변경 시 전체 동의 해제
      }));
    }
  };

  // 폼 데이터 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 인증번호 전송
  const handleSendVerification = async () => {
    if (!formData.phone) {
      setError('휴대폰 번호를 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      // TODO: 인증번호 전송 API 호출
      setIsVerificationSent(true);
      setError('');
    } catch (error) {
      setError('인증번호 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      // TODO: 인증번호 확인 API 호출
      setIsVerificationVerified(true);
      setError('');
    } catch (error) {
      setError('인증번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
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

  // 약관 동의 화면 (web_join1 기반)
  const renderAgreementStep = () => (
    <div className="h-screen bg-white">
      <Header />

      {/* 메인 콘텐츠 - 반응형 비율 */}
      <div className="flex" style={{height: 'calc(100vh - 96px)'}}>
        {/* 좌측 회색 영역 */}
        <div className="bg-gray-300 flex-1"></div>
        
        {/* 중앙 흰색 폼 영역 - Figma 비율에 맞춘 너비 */}
        <div className="bg-white w-full flex flex-col justify-between mx-auto" style={{maxWidth: '412px'}}>
          <div className="p-6">
            <div className="text-left mb-6">
              <h1 className="text-xl font-black text-black mb-4 leading-relaxed" style={{fontFamily: 'Nanum Gothic'}}>
                환영합니다!<br />
                GREGORI에 가입하시려면<br />
                서비스 이용약관에 동의해 주세요.
              </h1>
        </div>

            <div className="space-y-2">
              {/* 전체 동의 - 큰 체크박스 */}
              <div className="flex items-center space-x-3 py-1">
                <input
                  type="checkbox"
                  id="allAgree"
                  checked={agreements.allAgree}
                  onChange={() => handleAgreementChange('allAgree')}
                  className="w-5 h-5 text-blue-600 border-gray-400 rounded focus:ring-blue-500"
                />
                <label htmlFor="allAgree" className="text-base font-light text-black" style={{fontFamily: 'Nanum Gothic'}}>
                  약관 전체 동의하기(선택 동의 포함)
                </label>
              </div>

              {/* 개별 동의 항목들 - 체크 아이콘 */}
              <div className="space-y-1 pl-8">
                <div className="flex items-center space-x-3 py-0.5">
                  <button
                    onClick={() => handleAgreementChange('ageAgree')}
                    className="flex items-center justify-center w-8 h-8 p-1 hover:bg-gray-100 rounded"
                  >
                    {agreements.ageAgree ? (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <label 
                    htmlFor="ageAgree" 
                    className="text-sm font-light text-black cursor-pointer"
                    style={{fontFamily: 'Nanum Gothic'}}
                    onClick={() => handleAgreementChange('ageAgree')}
                  >
                    [필수] 만 14세 이상입니다.
                  </label>
                </div>

                <div className="flex items-center space-x-3 py-0.5">
                  <button
                    onClick={() => handleAgreementChange('termsAgree')}
                    className="flex items-center justify-center w-8 h-8 p-1 hover:bg-gray-100 rounded"
                  >
                    {agreements.termsAgree ? (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <label 
                    htmlFor="termsAgree" 
                    className="text-sm font-light text-black cursor-pointer"
                    style={{fontFamily: 'Nanum Gothic'}}
                    onClick={() => handleAgreementChange('termsAgree')}
                  >
                    [필수] 이용약관 동의 <span className="underline cursor-pointer hover:text-blue-600">자세히</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3 py-0.5">
                  <button
                    onClick={() => handleAgreementChange('privacyAgree')}
                    className="flex items-center justify-center w-8 h-8 p-1 hover:bg-gray-100 rounded"
                  >
                    {agreements.privacyAgree ? (
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                    )}
                  </button>
                  <label 
                    htmlFor="privacyAgree" 
                    className="text-sm font-light text-black cursor-pointer"
                    style={{fontFamily: 'Nanum Gothic'}}
                    onClick={() => handleAgreementChange('privacyAgree')}
                  >
                    [필수] 개인정보처리방침 동의 <span className="underline cursor-pointer hover:text-blue-600">자세히</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 동의하고 가입하기 버튼 - 28% 위치 */}
          <div className="p-6 pt-0" style={{paddingBottom: '28%'}}>
            <button
              onClick={() => {
                if (agreements.ageAgree && agreements.termsAgree && agreements.privacyAgree) {
                  setCurrentStep(2);
                } else {
                  setError('필수 약관에 모두 동의해주세요.');
                }
              }}
              disabled={!agreements.ageAgree || !agreements.termsAgree || !agreements.privacyAgree}
              className={`w-full py-3 px-4 text-base font-bold transition-colors duration-200 ${
                agreements.ageAgree && agreements.termsAgree && agreements.privacyAgree
                  ? 'bg-black hover:bg-gray-800 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              style={{fontFamily: 'Nanum Gothic'}}
            >
              동의하고 가입하기
            </button>
          </div>
        </div>
        
        {/* 우측 회색 영역 */}
        <div className="bg-gray-300 flex-1"></div>
      </div>
    </div>
  );

  // 회원가입 폼 화면 (web_join2 기반)
  const renderRegisterForm = () => (
    <div className="h-screen bg-white">
      <Header />

      {/* 메인 콘텐츠 - 반응형 비율 */}
      <div className="flex" style={{height: 'calc(100vh - 96px)'}}>
        {/* 좌측 회색 영역 */}
        <div className="bg-gray-300 flex-1"></div>
        
        {/* 중앙 흰색 폼 영역 - Figma 비율에 맞춘 너비 */}
        <div className="bg-white w-full flex flex-col mx-auto" style={{maxWidth: '412px'}}>
          <div className="p-6 flex-1">
            <div className="text-left mb-6">
              <h1 className="text-xl font-black text-black mb-4 leading-relaxed" style={{fontFamily: 'Nanum Gothic'}}>회원가입</h1>
              <p className="text-gray-600 mt-2" style={{fontFamily: 'Nanum Gothic'}}>GREGORI에 오신 것을 환영합니다!</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이메일 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="flex space-x-1">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                  placeholder="이메일"
                  required
                />
                <span className="flex items-center px-1 text-gray-500 text-sm">@</span>
                <div className="relative flex-1">
                  <select
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-8 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none bg-white cursor-pointer text-sm"
                  >
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="yahoo.com">yahoo.com</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                  placeholder="비밀번호"
                  required
                />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                  placeholder="비밀번호 확인"
                  required
                />
            </div>

            {/* 이름 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                  placeholder="이름"
                  required
                />
            </div>

            {/* 휴대폰 번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                휴대폰 번호
              </label>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                  placeholder="휴대폰 번호"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendVerification}
                  disabled={isVerificationSent}
                  className="px-3 py-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                >
                  {isVerificationSent ? '전송완료' : '인증번호 전송'}
                </button>
              </div>
            </div>

            {/* 인증번호 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                인증번호
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-black focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                  placeholder="인증번호"
                  disabled={!isVerificationSent}
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isVerificationVerified || !isVerificationSent}
                  className="px-3 py-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                >
                  {isVerificationVerified ? '인증완료' : '인증번호 확인'}
                </button>
              </div>
            </div>

          </form>
          </div>

          {/* 회원가입 버튼과 로그인 링크 - 동의하고 가입하기 버튼과 같은 위치 */}
          <div className="p-6 pt-0" style={{paddingBottom: '18.5%'}}>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !isVerificationVerified}
              className="w-full py-3 px-4 bg-black text-white text-base font-bold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? '처리중...' : '회원가입'}
            </button>
            
            {/* 로그인 링크 - 버튼 바로 아래 */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link to="/login" className="text-black hover:text-gray-800 font-bold">
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* 우측 회색 영역 */}
        <div className="bg-gray-300 flex-1"></div>
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