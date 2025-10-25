import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authAPI } from '@/api/auth';
import { memberAPI } from '@/api/member';
import Icon from '@/components/icons/SvgIcon';
import '@/styles/login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  
  const navigate = useNavigate();
  const { setUser, setError: setAuthError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authAPI.signIn(formData);
      
      try {
        const userInfo = await memberAPI.getMember();
        setUser(userInfo);
      } catch (userErr: any) {
        console.error('사용자 정보 조회 실패:', userErr);
        setUser({
          id: 0,
          email: formData.email,
          name: '사용자',
          authority: 'GENERAL_MEMBER' as any,
        });
      }
      
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
      setAuthError(err.response?.data?.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* 좌우 회색 박스 */}
      <div className="login-side-box left"></div>
      <div className="login-side-box right"></div>

      <div className="login-container">
        {/* 1. 로그인 제목 섹션 */}
        <div className="login-title">
          <h1 className="login-title-text">로그인</h1>
        </div>

        {/* 2. 이메일/비밀번호 입력 섹션 */}
        <div className="login-input-section">
          <form onSubmit={handleSubmit}>
            <div className="login-input-container">
              <input
                type="email"
                className="login-input"
                placeholder="이메일"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div className="login-input-container">
              <input
                type="password"
                className="login-input"
                placeholder="비밀번호"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </form>
        </div>

        {/* 3. 로그인 버튼 섹션 */}
        <div className="login-button-section">
          <button 
            type="submit" 
            className="login-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <span className="login-button-text">
              {isLoading ? '로그인 중...' : '로그인'}
            </span>
          </button>
        </div>

        {/* 4. 자동로그인, 이메일/비밀번호 찾기 섹션 */}
        <div className="login-options-section">
          <div className="login-auto-login">
            <div 
              className={`login-checkbox ${autoLogin ? 'checked' : ''}`}
              onClick={() => setAutoLogin(!autoLogin)}
            ></div>
            <span className="login-auto-login-text">자동 로그인</span>
          </div>
          
          <div className="login-find-links">
            <button className="login-find-link">이메일 찾기</button>
            <div className="login-divider"></div>
            <button className="login-find-link">비밀번호 찾기</button>
          </div>
        </div>

        {/* 5. 소셜 로그인 섹션 */}
        <div className="login-social-section">
          <button className="login-social-button facebook">
            <Icon name="facebook" size={11} className="login-social-icon" color="white" />
            <span className="login-social-text">페이스북 로그인</span>
          </button>

          <button className="login-social-button kakao">
            <Icon name="kakao" size={28} className="login-social-icon" color="#3A1C1E" />
            <span className="login-social-text">카카오톡 로그인</span>
          </button>

          <button className="login-social-button google">
            <Icon name="googleSocial" size={25} className="login-social-icon" />
            <span className="login-social-text">구글 로그인</span>
          </button>
        </div>

        {/* 6. 가입하기 섹션 */}
        <div className="login-signup-section">
          <Link to="/register" className="login-signup-button">
            <span className="login-signup-text">가입하기</span>
          </Link>
        </div>

        {error && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
