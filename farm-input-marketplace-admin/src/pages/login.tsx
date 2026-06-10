import React, { useState } from 'react';

const styles: Record<string, React.CSSProperties> = {
  body: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a1a',
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    margin: 0,
    padding: '20px',
  },
  windowChrome: {
    width: 380,
    background: '#2a2a2a',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
  },
  chromeBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: '#333',
    borderBottom: '1px solid #444',
    fontSize: 13,
    color: '#ccc',
  },
  loginScreen: {
    background: '#2b2f23',
    padding: '32px 28px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appIcon: {
    width: 56,
    height: 56,
    background: '#2E7D32',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  appName: {
    fontSize: 24,
    fontWeight: 800,
    color: '#fff',
    letterSpacing: '-0.3px',
    marginBottom: 4,
    margin: '0 0 4px',
  },
  appSub: {
    fontSize: 13,
    color: '#8a9a84',
    marginBottom: 26,
    margin: '0 0 26px',
  },
  loginCard: {
    width: '100%',
    background: '#f5f7ef',
    borderRadius: 12,
    padding: '24px 22px 20px',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: '#101710',
    margin: '0 0 2px',
  },
  cardSub: {
    fontSize: 13,
    color: '#5a6455',
    margin: '0 0 20px',
  },
  fieldLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 800,
    color: '#344033',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 48,
    border: '1px solid #c8d5c3',
    borderRadius: 8,
    background: '#fff',
    padding: '0 12px',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: 14,
    color: '#344033',
    fontFamily: 'inherit',
  },
  pwRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: 700,
    color: '#2E7D32',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'inherit',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  checkbox: {
    width: 15,
    height: 15,
    accentColor: '#2E7D32',
    cursor: 'pointer',
  },
  checkLabel: {
    fontSize: 13,
    color: '#5a6455',
    cursor: 'pointer',
  },
  loginBtn: {
    width: '100%',
    height: 48,
    background: '#1B5E20',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'inherit',
    marginBottom: 20,
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  encryptedNote: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    color: '#7a8a75',
  },
  buildNote: {
    fontSize: 11,
    color: '#a0afa0',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
};

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@agroconnect.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [trustDevice, setTrustDevice] = useState(false);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Login submitted');
  };

  return (
    <div style={styles.body}>
      <div style={styles.windowChrome}>

        {/* Chrome bar */}
        <div style={styles.chromeBar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          Admin Login
        </div>

        {/* Screen */}
        <div style={styles.loginScreen}>

          {/* App icon */}
          <div style={styles.appIcon}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M3 12h1M20 12h1M12 3v1M12 20v1"/>
              <path d="M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7"/>
              <path d="M7 12a5 5 0 0 1 5-5"/>
            </svg>
          </div>

          <h1 style={styles.appName}>AgroConnect</h1>
          <p style={styles.appSub}>Administrative Control Panel</p>

          {/* Card */}
          <div style={styles.loginCard}>
            <h2 style={styles.cardTitle}>Secure Login</h2>
            <p style={styles.cardSub}>Access the Harvesters Co. dashboard</p>

            {/* Email */}
            <label style={styles.fieldLabel}>Admin Email</label>
            <div style={styles.inputWrap}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a9a84" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              <input
                style={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@agroconnect.com"
              />
            </div>

            {/* Password label row */}
            <div style={styles.pwRow}>
              <label style={styles.fieldLabel}>Password</label>
              <button style={styles.forgotLink} onClick={() => {}}>Forgot Password?</button>
            </div>

            {/* Password input */}
            <div style={styles.inputWrap}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a9a84" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                style={{
                  ...styles.input,
                  letterSpacing: showPassword ? 'normal' : '3px',
                }}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', color: '#8a9a84' }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Trust device */}
            <div style={styles.checkboxRow}>
              <input
                style={styles.checkbox}
                type="checkbox"
                id="trust"
                checked={trustDevice}
                onChange={e => setTrustDevice(e.target.checked)}
              />
              <label style={styles.checkLabel} htmlFor="trust">
                Trust this device for 30 days
              </label>
            </div>

            {/* Login button */}
            <button style={styles.loginBtn} onClick={handleLogin}>
              Login
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </button>

            {/* Footer */}
            <div style={styles.cardFooter}>
              <div style={styles.encryptedNote}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                End-to-End Encrypted Session
              </div>
              <span style={styles.buildNote}>System Build v4.2.0 · Stable</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
