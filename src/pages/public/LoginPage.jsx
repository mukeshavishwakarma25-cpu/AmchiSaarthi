import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import './LoginPage.css';

export default function LoginPage() {
  const { login, switchRole } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('rajesh.kumar@greentech.in');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'OFFICER') navigate('/officer/dashboard');
      else if (res.user.role === 'ADMIN' || res.user.role === 'SUPER_ADMIN') navigate('/admin/dashboard');
      else navigate('/user/dashboard');
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleDemoLogin = (role) => {
    switchRole(role);
    if (role === 'USER') navigate('/user/dashboard');
    else if (role === 'OFFICER') navigate('/officer/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card-wrap">
        <Card className="login-card">
          <div className="login-header">
            <span className="material-symbols-outlined login-logo-icon">assured_workload</span>
            <h2>{t('auth.loginTitle') || 'Sign In to AmchiSaarthi'}</h2>
            <p>{t('auth.loginSubtitle') || 'Access your single-window compliance dashboard'}</p>
          </div>

          {error && <div className="login-error-alert">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            <Input
              label={t('auth.email') || 'Email Address'}
              type="email"
              icon="mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@business.in"
            />

            <Input
              label={t('auth.password') || 'Password'}
              type="password"
              icon="lock"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="login-submit-btn"
              iconRight="arrow_forward"
            >
              {t('auth.signInBtn') || 'Sign In to Dashboard'}
            </Button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="demo-login-box">
            <p className="demo-login-title">⚡ Instant Demo Roles (One-Click):</p>
            <div className="demo-login-grid">
              <button
                type="button"
                className="demo-role-chip user-chip"
                onClick={() => handleDemoLogin('USER')}
              >
                👤 <strong>Entrepreneur</strong>
                <span>(Rajesh Kumar)</span>
              </button>
              <button
                type="button"
                className="demo-role-chip officer-chip"
                onClick={() => handleDemoLogin('OFFICER')}
              >
                🏛️ <strong>Officer</strong>
                <span>(Vikram Deshmukh)</span>
              </button>
              <button
                type="button"
                className="demo-role-chip admin-chip"
                onClick={() => handleDemoLogin('ADMIN')}
              >
                ⚙️ <strong>Administrator</strong>
                <span>(Amit Joshi)</span>
              </button>
            </div>
          </div>

          <div className="login-footer-links">
            <p>
              {t('auth.noAccount') || "Don't have an enterprise account?"}{' '}
              <NavLink to="/register">{t('auth.registerLink') || 'Register Now'}</NavLink>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
