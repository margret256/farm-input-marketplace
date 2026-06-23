// App.tsx
import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Bell,
  Globe,
  Home,
  Menu,
  ReceiptText,
  ShieldCheck,
  UserCircle,
  Users,
  LogOut,
  X,
} from 'lucide-react';

import Dashboard from './pages/dashboard';
import UserManagement from './pages/usermanagement';
import DealerVerification from './pages/dealerverification';
import Transactions from './pages/transcations';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import About from './pages/About';
import AdminLogin from './pages/login';
import { auth } from './api/client';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',    icon: Home        },
  { id: 'users',        label: 'Users',        icon: Users       },
  { id: 'dealers',      label: 'Dealers',      icon: ShieldCheck },
  { id: 'transactions', label: 'Transactions', icon: ReceiptText },
  { id: 'analytics',    label: 'Analytics',    icon: BarChart3   },
  { id: 'profile',      label: 'Profile',      icon: UserCircle  },
  { id: 'about',        label: 'About',        icon: Globe       },
] as const;

type PageId = typeof navItems[number]['id'];
type NavigateHandler = (page: PageId) => void;

const pageTitles: Record<PageId, string> = {
  dashboard:    'Admin Dashboard',
  users:        'User Management',
  dealers:      'Dealer Verification',
  transactions: 'Transaction Management',
  analytics:    'Market Analytics',
  profile:      'Admin Profile',
  about:        'About AgroConnect',
};

function getInitialPage(): PageId {
  const fromHash = window.location.hash.replace('#', '');
  return navItems.some((item) => item.id === fromHash) ? (fromHash as PageId) : 'dashboard';
}

// Check if user is authenticated
function isAuthenticated(): boolean {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');
  
  if (!token || !userStr) return false;
  
  try {
    const user = JSON.parse(userStr);
    return user.role === 'ADMIN';
  } catch {
    return false;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleHash = () => setActivePage(getInitialPage());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Handle login
  const handleLogin = (token: string, user: any) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    window.location.hash = 'dashboard';
    setActivePage('dashboard');
  };

  // Handle logout - clears session and redirects to login
  const handleLogout = () => {
    // Clear all session data
    auth.logout();
    
    // Update state
    setIsLoggedIn(false);
    setActivePage('dashboard');
    
    // Clear hash to prevent redirect issues
    window.location.hash = '';
    
    // Close modal
    setShowLogoutModal(false);
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const Page = useMemo(() => {
    const pages: Record<PageId, React.ComponentType<any>> = {
      dashboard:    Dashboard,
      users:        UserManagement,
      dealers:      DealerVerification,
      transactions: Transactions,
      analytics:    Analytics,
      profile:      Profile,
      about:        About,
    };
    return pages[activePage] || Dashboard;
  }, [activePage]);

  function navigate(page: PageId) {
    window.location.hash = page;
    setActivePage(page);
    setSidebarOpen(false);
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar 
          activePage={activePage} 
          isOpen={sidebarOpen} 
          onNavigate={navigate} 
          onLogoutClick={() => setShowLogoutModal(true)}
        />
        {sidebarOpen ? (
          <button className="scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
        ) : null}
        <main className="main-area">
          <TopBar 
            title={pageTitles[activePage]} 
            onMenu={() => setSidebarOpen(true)} 
            onLogoutClick={() => setShowLogoutModal(true)}
          />
          <div className="content-wrap">
            <Page onNavigate={navigate} />
          </div>
        </main>
        <MobileNav activePage={activePage} onNavigate={navigate} />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <LogoutModal 
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}

// Logout Modal Component
function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onCancel}>
          <X size={20} />
        </button>
        
        <div className="modal-icon">
          <LogOut size={48} />
        </div>
        
        <h3 className="modal-title">Logout?</h3>
        <p className="modal-description">
          Are you sure you want to log out of your account?
        </p>
        
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn logout-btn" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  activePage,
  isOpen,
  onNavigate,
  onLogoutClick,
}: {
  activePage: PageId;
  isOpen: boolean;
  onNavigate: NavigateHandler;
  onLogoutClick: () => void;
}) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="brand-block">
        <img src="/images/logo.png" alt="" className="brand-logo" />
        <div>
          <h1>AgroConnect</h1>
          <span>Admin Web</span>
        </div>
      </div>
      <nav className="sidebar-nav" aria-label="Admin pages">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              className={`nav-button ${isActive ? 'active' : ''}`}
              type="button"
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
        {/* Logout button in sidebar */}
        <button
          className="nav-button logout-btn"
          type="button"
          onClick={onLogoutClick}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
      <div className="sidebar-footer">
        <div className="mini-avatar">{user.firstName?.[0] || 'A'}</div>
        <div>
          <strong>{user.firstName || 'Admin'}</strong>
          <span>{user.role || 'Administrator'}</span>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({
  activePage,
  onNavigate,
}: {
  activePage: PageId;
  onNavigate: NavigateHandler;
}) {
  const mobileItems = navItems.slice(0, 5);
  return (
    <nav className="mobile-nav" aria-label="Mobile admin pages">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            className={`mobile-nav-button ${isActive ? 'active' : ''}`}
            type="button"
            onClick={() => onNavigate(item.id)}
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function TopBar({ title, onMenu, onLogoutClick }: { title: string; onMenu: () => void; onLogoutClick: () => void }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className="topbar">
      <button className="icon-button menu-button" type="button" aria-label="Open navigation" onClick={onMenu}>
        <Menu size={22} />
      </button>
      <div>
        <p className="eyebrow">Farm Input Marketplace</p>
        <h2>{title}</h2>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={21} />
          <span className="notification-dot" />
        </button>
        <button 
          className="icon-button logout-topbar" 
          type="button" 
          aria-label="Logout"
          onClick={onLogoutClick}
          title="Logout"
        >
          <LogOut size={21} />
        </button>
        <div className="top-avatar">{user.firstName?.[0] || 'A'}</div>
      </div>
    </header>
  );
}

export default App;