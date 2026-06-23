// pages/Login.tsx
import React, { useState } from 'react';
import { auth } from '../api/client';

interface LoginProps {
  onLogin: (token: string, user: any) => void;
}

export default function AdminLogin({ onLogin }: LoginProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!identifier.trim() || !password.trim()) {
      setError('Please enter both email/phone and password');
      setLoading(false);
      return;
    }

    try {
      const response = await auth.login(identifier.trim(), password.trim());

      if (response.user.role !== 'ADMIN') {
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }

      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        onLogin(response.accessToken, response.user);
      }, 500);

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        {/* Background gradients */}
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
        <div className="bg-gradient-3"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-card">
          {/* Logo and Title */}
          <div className="login-header">
            <div className="logo-container">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4"/>
                <path d="M3 12h1M20 12h1M12 3v1M12 20v1"/>
                <path d="M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7"/>
                <path d="M7 12a5 5 0 0 1 5-5"/>
              </svg>
            </div>
            <h1 className="login-title">AgroConnect</h1>
            <p className="login-subtitle">Administrative Control Panel</p>
          </div>

          {/* Form */}
          <div className="login-form-container">
            <h2 className="form-title">Secure Login</h2>
            <p className="form-subtitle">Access the Farm Input Marketplace dashboard</p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">EMAIL OR PHONE</label>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 7 10-7"/>
                  </svg>
                  <input
                    type="text"
                    className="form-input"
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="admin@farmmarketplace.com"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label className="form-label">PASSWORD</label>
                  <button type="button" className="forgot-link" onClick={() => alert('Contact system administrator')}>
                    Forgot Password?
                  </button>
                </div>
                <div className="input-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="trust"
                  className="checkbox-input"
                  checked={trustDevice}
                  onChange={e => setTrustDevice(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="trust" className="checkbox-label">
                  Trust this device for 30 days
                </label>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? (
                  'Logging in...'
                ) : (
                  <>
                    Login
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                  </>
                )}
              </button>

              <div className="login-footer">
                <div className="encrypted-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  End-to-End Encrypted Session
                </div>
                <span className="build-version">System Build v4.2.0 · Stable</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* Reset and base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Login Container */
        .login-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0e0a;
          overflow: hidden;
          padding: 20px;
        }

        /* Animated Background */
        .login-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .bg-gradient-1 {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 70%;
          height: 70%;
          background: radial-gradient(circle, rgba(46, 125, 50, 0.3) 0%, transparent 70%);
          animation: float1 20s ease-in-out infinite;
        }

        .bg-gradient-2 {
          position: absolute;
          bottom: -30%;
          left: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(27, 94, 32, 0.2) 0%, transparent 70%);
          animation: float2 25s ease-in-out infinite;
        }

        .bg-gradient-3 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 80%;
          background: radial-gradient(circle, rgba(76, 175, 80, 0.05) 0%, transparent 70%);
          animation: pulse 15s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-5deg); }
          66% { transform: translate(20px, -20px) rotate(3deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }

        /* Login Wrapper */
        .login-wrapper {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 1;
        }

        /* Login Card */
        .login-card {
          background: rgba(43, 47, 35, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px 36px 32px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-container {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #2E7D32, #1B5E20);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(46, 125, 50, 0.3);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          color: white;
        }

        .login-title {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }

        .login-subtitle {
          font-size: 13px;
          color: #8a9a84;
          letter-spacing: 0.3px;
        }

        /* Form */
        .login-form-container {
          background: #f5f7ef;
          border-radius: 12px;
          padding: 28px 24px 24px;
        }

        .form-title {
          font-size: 20px;
          font-weight: 800;
          color: #101710;
          margin: 0 0 2px;
        }

        .form-subtitle {
          font-size: 13px;
          color: #5a6455;
          margin: 0 0 20px;
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #344033;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .password-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .forgot-link {
          font-size: 12px;
          font-weight: 700;
          color: #2E7D32;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .forgot-link:hover {
          color: #1B5E20;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          height: 48px;
          background: #ffffff;
          border: 1px solid #c8d5c3;
          border-radius: 8px;
          padding: 0 12px;
          gap: 10px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .input-icon {
          color: #8a9a84;
          flex-shrink: 0;
        }

        .form-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: #344033;
          font-family: inherit;
        }

        .form-input::placeholder {
          color: #b0bfb0;
        }

        .form-input:disabled {
          opacity: 0.6;
        }

        .toggle-password {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          color: #8a9a84;
          flex-shrink: 0;
        }

        .toggle-password:hover {
          color: #5a6455;
        }

        /* Checkbox */
        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 22px;
        }

        .checkbox-input {
          width: 16px;
          height: 16px;
          accent-color: #2E7D32;
          cursor: pointer;
          flex-shrink: 0;
        }

        .checkbox-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .checkbox-label {
          font-size: 13px;
          color: #5a6455;
          cursor: pointer;
        }

        .checkbox-label:hover {
          color: #344033;
        }

        /* Login Button */
        .login-button {
          width: 100%;
          height: 48px;
          background: linear-gradient(135deg, #1B5E20, #2E7D32);
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: inherit;
          transition: all 0.3s;
          margin-bottom: 20px;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(27, 94, 32, 0.3);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Footer */
        .login-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .encrypted-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #7a8a75;
        }

        .build-version {
          font-size: 11px;
          color: #a0afa0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* Messages */
        .error-message {
          background: #fee2e2;
          color: #991b1b;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
          text-align: center;
        }

        .success-message {
          background: #dcfce7;
          color: #166534;
          padding: 10px 12px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
          text-align: center;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 24px 20px 20px;
          }

          .login-form-container {
            padding: 20px 16px 16px;
          }

          .login-title {
            font-size: 22px;
          }

          .logo-container {
            width: 56px;
            height: 56px;
          }

          .logo-icon {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 360px) {
          .login-card {
            padding: 16px 12px 12px;
          }

          .login-form-container {
            padding: 16px 12px 12px;
          }

          .form-title {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}