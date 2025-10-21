import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authAPI } from '../../api/auth';
import { memberAPI } from '../../api/member';
import Header from '../../components/common/Header';
import { FacebookIcon, KakaoIcon, GoogleIcon } from '../../components/icons/SocialIcons';
import '../../styles/login.css';

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
    <div className="auth-container">
      <Header />

      <div className="auth-layout">
        <div className="auth-side-panel"></div>
        
        <div className="auth-form-container">
          <div className="auth-form-content">
            <h1 className="auth-title">로그인</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="이메일"
                  className="input-standard"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-input-group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="비밀번호"
                  className="input-standard"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button type="submit" disabled={isLoading} className="button-primary mt-8">
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            <div className="form-actions">
              <div className="form-actions-left">
                <input
                  type="checkbox"
                  id="autoLogin"
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                  className="checkbox-standard"
                />
                <label htmlFor="autoLogin" className="checkbox-label">
                  자동 로그인
                </label>
              </div>
              <div className="form-actions-right">
                <button className="link-button">이메일 찾기</button>
                <span className="divider">|</span>
                <button className="link-button">비밀번호 찾기</button>
              </div>
            </div>

            <div className="social-login-section">
              <button type="button" className="button-facebook">
                <FacebookIcon />
                페이스북 로그인
              </button>

              <button type="button" className="button-kakao">
                <KakaoIcon />
                카카오톡 로그인
              </button>

              <button type="button" className="button-google">
                <GoogleIcon />
                구글 로그인
              </button>
            </div>

            <div className="register-link-section">
              <Link to="/register" className="button-link">
                가입하기
              </Link>
            </div>
          </div>
        </div>

        <div className="auth-side-panel"></div>
      </div>
    </div>
  );
};

export default Login;
