import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../i18n/LanguageContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import './LoginPage.css';

export default function RegisterPage() {
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      navigate('/user/dashboard');
    } else {
      setError(res.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-wrap" style={{ maxWidth: '540px' }}>
        <Card className="login-card">
          <div className="login-header">
            <span className="material-symbols-outlined login-logo-icon">domain_add</span>
            <h2>{t('auth.registerTitle') || 'Entrepreneur Registration'}</h2>
            <p>{t('auth.registerSubtitle') || 'Create your Maharashtra Single-Window Compliance Account'}</p>
          </div>

          {error && <div className="login-error-alert">{error}</div>}

          <form onSubmit={handleRegister} className="login-form">
            <Input
              label="Full Name of Entrepreneur / Director"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sunil Patil"
              icon="person"
            />

            <Input
              label="Business / Enterprise Name"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Patil Agro Processors LLP"
              icon="storefront"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Official Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@patilagro.in"
                icon="mail"
              />

              <Input
                label="Mobile Number"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                placeholder="+91 98220 12345"
                icon="call"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon="lock"
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon="lock_reset"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="login-submit-btn"
              iconRight="check_circle"
            >
              Complete Registration & Access Portal
            </Button>
          </form>

          <div className="login-footer-links">
            <p>
              Already registered? <NavLink to="/login">Sign In here</NavLink>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
