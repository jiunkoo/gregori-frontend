import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { memberAPI } from '../../api/member';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    if (password.length < 8 || password.length > 15) {
      return '비밀번호는 8자 이상 15자 이하여야 합니다.';
    }
    
    const englishCount = (password.match(/[a-zA-Z]/g) || []).length;
    if (englishCount < 2) {
      return '비밀번호는 영문자 2개 이상을 포함해야 합니다.';
    }
    
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount < 1) {
      return '비밀번호는 숫자 1개 이상을 포함해야 합니다.';
    }
    
    const specialCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
    if (specialCount < 1) {
      return '비밀번호는 특수문자 1개 이상을 포함해야 합니다.';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 유효성 검사
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // 이름 유효성 검사 (한글 2-10자)
    if (!/^[가-힣]{2,10}$/.test(formData.name)) {
      setError('이름은 한글 2자 이상 10자 이하여야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('회원가입 요청 데이터:', {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      
      await memberAPI.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      
      console.log('회원가입 성공!');
      navigate('/login');
    } catch (err: any) {
      console.error('회원가입 오류:', err);
      console.error('오류 응답:', err.response);
      
      let errorMessage = '회원가입에 실패했습니다.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              로그인
            </Link>
          </p>
        </div>
        
        {/* 비밀번호 요구사항 안내 */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">비밀번호 요구사항:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• 8자 이상 15자 이하</li>
            <li>• 영문자 2개 이상 포함</li>
            <li>• 숫자 1개 이상 포함</li>
            <li>• 특수문자 1개 이상 포함</li>
          </ul>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="이름 (한글 2-10자)"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호 확인"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 