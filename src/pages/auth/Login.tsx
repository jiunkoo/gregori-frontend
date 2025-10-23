import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authAPI } from '../../api/auth';
import { memberAPI } from '../../api/member';
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
            <svg className="login-social-icon" viewBox="0 0 11 25" fill="none">
              <path d="M7.07583 24.1504V13.442H10.3017L10.7812 9.24931H7.07583V6.57873C7.07583 5.36888 7.37683 4.54053 8.92733 4.54053H10.892V0.802505C9.93608 0.687778 8.97522 0.632383 8.01383 0.636574C5.1625 0.636574 3.20483 2.58594 3.20483 6.16456V9.24147H0V13.4342H3.21183V24.1504H7.07583Z" fill="white"/>
            </svg>
            <span className="login-social-text">페이스북 로그인</span>
          </button>

          <button className="login-social-button kakao">
            <svg className="login-social-icon" viewBox="0 0 28 32" fill="none">
              <path d="M6.36642 24.1089C3.91759 22.1096 2.33325 19.0909 2.33325 15.7871C2.33325 9.7085 7.55409 4.77271 13.9999 4.77271C20.4458 4.77271 25.6666 9.7085 25.6666 15.7871C25.6666 21.8644 20.4458 26.8002 13.9999 26.8002C12.7081 26.809 11.422 26.6031 10.1826 26.189C10.0753 26.1492 9.93059 26.1492 9.82325 26.1492C9.60742 26.1492 9.39159 26.2288 9.21075 26.3521L6.65459 28.0238C6.58896 28.0693 6.5152 28.0973 6.43875 28.106C6.33414 28.1054 6.23395 28.058 6.15976 27.9742C6.08556 27.8904 6.04331 27.7768 6.04209 27.6579C6.04209 27.5346 6.07709 27.4538 6.11442 27.3305C6.14942 27.2907 6.47375 25.9437 6.65459 25.1284C6.65459 25.0462 6.68959 24.9242 6.68959 24.842C6.68959 24.5159 6.58225 24.2719 6.36642 24.1089ZM10.1114 13.935C10.9479 13.935 11.6106 13.182 11.6106 12.2314C11.6106 11.2795 10.9479 10.5265 10.1114 10.5265C9.27375 10.5265 8.61225 11.2795 8.61225 12.2314C8.61225 13.182 9.27375 13.935 10.1114 13.935ZM17.8884 13.935C18.7261 13.935 19.3876 13.182 19.3876 12.2314C19.3876 11.2795 18.7261 10.5265 17.8884 10.5265C17.0519 10.5265 16.3893 11.2795 16.3893 12.2314C16.3893 13.182 17.0519 13.935 17.8884 13.935Z" fill="#3A1C1E"/>
            </svg>
            <span className="login-social-text">카카오톡 로그인</span>
          </button>

          <button className="login-social-button google">
            <svg className="login-social-icon" viewBox="0 0 25 28" fill="none">
              <path d="M24.9868 14.2619C24.9868 13.1148 24.9018 12.2777 24.7177 11.4095H12.749V16.5872H19.7744C19.6328 17.8739 18.8679 19.8117 17.1682 21.1138L17.1444 21.2871L20.9286 24.4957L21.1908 24.5243C23.5987 22.0905 24.9868 18.5095 24.9868 14.2619" fill="#4285F4"/>
              <path d="M12.7491 27.9038C16.191 27.9038 19.0805 26.6636 21.191 24.5244L17.1683 21.1138C16.0919 21.9354 14.6471 22.509 12.7491 22.509C9.37808 22.509 6.51693 20.0753 5.49701 16.7113L5.34751 16.7252L1.41254 20.0582L1.36108 20.2147C3.45737 24.7723 7.7633 27.9038 12.7491 27.9038Z" fill="#34A853"/>
              <path d="M5.49685 16.7113C5.22773 15.8432 5.07199 14.913 5.07199 13.9519C5.07199 12.9907 5.22773 12.0606 5.48269 11.1925L5.47556 11.0076L1.4913 7.62109L1.36094 7.68896C0.49697 9.58024 0.0012207 11.7041 0.0012207 13.9519C0.0012207 16.1997 0.49697 18.3234 1.36094 20.2147L5.49685 16.7113" fill="#FBBC05"/>
              <path d="M12.7491 5.3947C15.1428 5.3947 16.7574 6.52635 17.6781 7.47205L21.2758 3.6275C19.0663 1.37969 16.1909 0 12.7491 0C7.76325 0 3.45735 3.1314 1.36108 7.68899L5.48283 11.1925C6.5169 7.82857 9.37803 5.3947 12.7491 5.3947" fill="#EB4335"/>
            </svg>
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
