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
} from 'lucide-react';

import Dashboard from './pages/dashboard';
import UserManagement from './pages/usermanagement';
import DealerVerification from './pages/dealerverification';
import Transactions from './pages/transcations';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import About from './pages/About';

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

function App() {
  const [activePage,  setActivePage]  = useState<PageId>(getInitialPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => setActivePage(getInitialPage());
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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
    <div className="app-shell">
      <Sidebar activePage={activePage} isOpen={sidebarOpen} onNavigate={navigate} />
      {sidebarOpen ? (
        <button className="scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      ) : null}
      <main className="main-area">
        <TopBar title={pageTitles[activePage]} onMenu={() => setSidebarOpen(true)} />
        <div className="content-wrap">
          <Page onNavigate={navigate} />
        </div>
      </main>
      <MobileNav activePage={activePage} onNavigate={navigate} />
    </div>
  );
}

function Sidebar({
  activePage,
  isOpen,
  onNavigate,
}: {
  activePage: PageId;
  isOpen: boolean;
  onNavigate: NavigateHandler;
}) {
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
      </nav>
      <div className="sidebar-footer">
        <div className="mini-avatar">HC</div>
        <div>
          <strong>Harvester Co.</strong>
          <span>Verified Admin</span>
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

function TopBar({ title, onMenu }: { title: string; onMenu: () => void }) {
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
        <div className="top-avatar">H</div>
      </div>
    </header>
  );
}

export default App;
