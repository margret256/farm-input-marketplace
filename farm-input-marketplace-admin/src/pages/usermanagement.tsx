import { useState } from 'react';
import { Search, UserPlus, AlertTriangle, MoreVertical, TrendingUp } from 'lucide-react';

const ALL_USERS = [
  { id: 1, name: 'Samuel Okoro',  email: 'samuel.o@farmgate.com',   role: 'Farmer',      region: 'Central Valley',  status: 'Active',    initials: 'SO' },
  { id: 2, name: 'Amina Bello',   email: 'amina.b@agrisupplies.io', role: 'Dealer Admin', region: 'North Uplands',   status: 'Active',    initials: 'AB' },
  { id: 3, name: 'John Mensah',   email: 'john.mensah@gmail.com',   role: 'Buyer',        region: 'South Delta',     status: 'Suspended', initials: 'JM' },
  { id: 4, name: 'Tunde Adeyemi', email: 'tunde.ade@growplus.net',  role: 'Dealer',       region: 'Eastern Plains',  status: 'Review',    initials: 'TA' },
  { id: 5, name: 'Grace Achebe',  email: 'grace.a@agrovest.ng',     role: 'Dealer Admin', region: 'Central Valley',  status: 'Active',    initials: 'GA' },
  { id: 6, name: 'Emeka Nwosu',   email: 'emeka.n@farmlink.io',     role: 'Farmer',       region: 'North Uplands',   status: 'Active',    initials: 'EN' },
];

const ROLES    = ['All Roles', 'Farmer', 'Dealer', 'Dealer Admin', 'Buyer'];
const STATUSES = ['All Status', 'Active', 'Suspended', 'Review'];
type UserStatus = 'Active' | 'Suspended' | 'Review';
const statusTone: Record<UserStatus, string> = { Active: 'success', Suspended: 'danger', Review: 'warning' };

export default function UserManagement() {
  const [search,   setSearch]   = useState('');
  const [role,     setRole]     = useState('All Roles');
  const [status,   setStatus]   = useState('All Status');
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const filtered = ALL_USERS.filter(u => {
    const q = search.toLowerCase();
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
    const matchR = role   === 'All Roles'  || u.role   === role;
    const matchS = status === 'All Status' || u.status === status;
    return matchQ && matchR && matchS;
  });

  return (
    <div className="page-content">
      <div className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input type="search" placeholder="Search by name, email or role..." value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <select className="filter-select" value={role} onChange={e => setRole(e.target.value)}>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn-primary icon-only" aria-label="Add user"><UserPlus size={20} /></button>
      </div>

      <div className="um-stats-grid">
        <div className="hero-card green-card compact">
          <div className="hero-card-text">
            <p className="hero-label">Total active users this month</p>
            <h2 className="hero-value">1,284 Users</h2>
            <span className="hero-badge"><TrendingUp size={13} /> +12% vs last month</span>
          </div>
        </div>
        <div className="alert-stat-card">
          <p className="alert-stat-label">Suspended Accounts</p>
          <div className="alert-stat-number">
            <span>24</span>
            <AlertTriangle size={44} />
          </div>
          <p className="alert-stat-sub">Requiring immediate review</p>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">User Directory</h3>
          <span className="muted-text">{filtered.length} users</span>
        </div>
        <div className="user-list">
          {filtered.length === 0 && <p className="empty-state">No users match your filters.</p>}
          {filtered.map(user => (
            <div key={user.id} className="user-row">
              <div className="user-avatar">{user.initials}</div>
              <div className="user-info">
                <p className="user-name">{user.name}</p>
                <p className="user-email">{user.email}</p>
              </div>
              <span className="user-role">{user.role}</span>
              <span className="user-region">{user.region}</span>
              <span className={`pill ${statusTone[user.status as UserStatus] || 'warning'}`}>{user.status}</span>
              <div className="action-menu-wrap">
                <button className="icon-btn" onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}>
                  <MoreVertical size={18} />
                </button>
                {menuOpen === user.id && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item">View Profile</button>
                    <button className="dropdown-item">Edit Role</button>
                    {user.status !== 'Suspended'
                      ? <button className="dropdown-item danger">Suspend</button>
                      : <button className="dropdown-item success">Activate</button>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
