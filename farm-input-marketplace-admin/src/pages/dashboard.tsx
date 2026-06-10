import {
  Users,
  Store,
  Truck,
  Wallet,
  ReceiptText,
  UserCog,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const recentActivity = [
  { id: 1, name: 'Bukalasa Seed Dist.', meta: 'Joined 2 hours ago · Central Region', status: 'Active', tone: 'success', icon: CheckCircle2 },
  { id: 2, name: 'Mbarara Agro-Vet', meta: 'Updated Inventory · 4 hours ago', status: 'Pending Stock', tone: 'warning', icon: Clock },
  { id: 3, name: 'Soroti Farm Hub', meta: 'Flagged Transaction · 6 hours ago', status: 'Review Needed', tone: 'danger', icon: AlertTriangle },
];

type PageId = 'dashboard' | 'users' | 'dealers' | 'transactions' | 'analytics' | 'profile' | 'about';

const managementTools = [
  { icon: UserCog,     title: 'User Management',  desc: 'Control access and user tiers.',  page: 'users' },
  { icon: ShieldCheck, title: 'Dealer Approvals', desc: '12 pending applications.',        page: 'dealers' },
  { icon: BarChart3,   title: 'Reports',          desc: 'Export quarterly metrics.',       page: 'analytics' },
  { icon: Wallet,      title: 'Commission',       desc: 'Adjust platform fee rates.',      page: 'transactions' },
] as const;

export default function Dashboard({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="page-content">
      <div className="hero-grid">
        <div className="hero-card green-card">
          <div className="hero-card-text">
            <p className="hero-label">Total Revenue</p>
            <h2 className="hero-value">UGX 6.2M</h2>
            <span className="hero-badge"><TrendingUp size={13} /> +12.5% vs last month</span>
          </div>
          <Wallet size={100} className="hero-icon" />
        </div>
        <div className="hero-card orange-card">
          <div className="hero-card-text">
            <p className="hero-label">Transactions</p>
            <h2 className="hero-value">UGX 45M</h2>
            <span className="hero-sub">Processed through AgroWallet</span>
          </div>
          <ReceiptText size={100} className="hero-icon" />
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-icon-wrap success"><Users size={20} /></div>
            <span className="pill success">Growth</span>
          </div>
          <p className="metric-value">12.4k</p>
          <p className="metric-label">Total Active Users</p>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-icon-wrap warning"><Store size={20} /></div>
            <span className="pill warning">Verified</span>
          </div>
          <p className="metric-value">850</p>
          <p className="metric-label">Registered Dealers</p>
        </div>
        <div className="metric-card">
          <div className="metric-top">
            <div className="metric-icon-wrap danger"><Truck size={20} /></div>
            <span className="pill danger">Live</span>
          </div>
          <p className="metric-value">142</p>
          <p className="metric-label">Active Orders</p>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Management Tools</h3>
        </div>
        <div className="tools-grid">
          {managementTools.map(({ icon: Icon, title, desc, page }) => (
            <button key={title} className="tool-card" onClick={() => onNavigate(page)}>
              <div className="tool-icon"><Icon size={26} /></div>
              <p className="tool-title">{title}</p>
              <p className="tool-desc">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">Recent Dealer Activity</h3>
          <button className="link-btn" onClick={() => onNavigate('dealers')}>View All <ChevronRight size={14} /></button>
        </div>
        <div className="activity-list">
          {recentActivity.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="activity-row">
                <div className={`activity-icon ${item.tone}`}><Icon size={18} /></div>
                <div className="activity-text">
                  <p className="activity-name">{item.name}</p>
                  <p className="activity-meta">{item.meta}</p>
                </div>
                <span className={`pill ${item.tone}`}>{item.status}</span>
                <ChevronRight size={16} className="chevron-muted" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
