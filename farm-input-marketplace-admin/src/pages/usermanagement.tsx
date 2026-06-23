// pages/UserManagement.tsx
import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  UserPlus, 
  AlertTriangle, 
  MoreVertical, 
  TrendingUp, 
  Loader2, 
  RefreshCw,
  Trash2,
  Ban,
  X,
  AlertCircle
} from 'lucide-react';
import userApi, { User, UserStats } from '../api/users';

const ROLES = ['All Roles', 'FARMER', 'DEALER', 'ADMIN'];
const STATUSES = ['All Status', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'];

const statusTone: Record<string, string> = {
  ACTIVE: 'success',
  INACTIVE: 'warning',
  SUSPENDED: 'danger',
  PENDING: 'warning'
};

const roleDisplay: Record<string, string> = {
  FARMER: 'Farmer',
  DEALER: 'Dealer',
  ADMIN: 'Admin'
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Separate state for input
  const [role, setRole] = useState('All Roles');
  const [status, setStatus] = useState('All Status');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Modal states
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string | null; userName: string }>({
    isOpen: false,
    userId: null,
    userName: ''
  });
  const [suspendModal, setSuspendModal] = useState<{ isOpen: boolean; userId: string | null; userName: string; reason: string }>({
    isOpen: false,
    userId: null,
    userName: '',
    reason: ''
  });

  // Fetch users with filters - using useCallback to prevent unnecessary re-renders
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userApi.getAll({
        page,
        limit: 10,
        search: search || undefined,
        role: role !== 'All Roles' ? role as any : undefined,
        status: status !== 'All Status' ? status as any : undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });

      setUsers(response.data);
      setTotalPages(response.meta.totalPages);
      setTotalUsers(response.meta.total);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, search, role, status]);

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const data = await userApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [fetchUsers]);

  // Handle search input change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      if (page !== 1) {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Handle role change
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchUsers();
    }
  }, [role, status]);

  // Handle delete
  const handleDelete = async () => {
    if (!deleteModal.userId) return;

    setActionLoading(deleteModal.userId);
    try {
      await userApi.delete(deleteModal.userId);
      await fetchUsers();
      await fetchStats();
      setDeleteModal({ isOpen: false, userId: null, userName: '' });
      setMenuOpen(null);
    } catch (err: any) {
      console.error('Error deleting user:', err);
      alert(err.message || 'Failed to delete user');
    } finally {
      setActionLoading(null);
    }
  };

  // Handle suspend
  const handleSuspend = async () => {
    if (!suspendModal.userId) return;

    setActionLoading(suspendModal.userId);
    try {
      await userApi.updateStatus(suspendModal.userId, 'SUSPENDED');
      await fetchUsers();
      await fetchStats();
      setSuspendModal({ isOpen: false, userId: null, userName: '', reason: '' });
      setMenuOpen(null);
    } catch (err: any) {
      console.error('Error suspending user:', err);
      alert(err.message || 'Failed to suspend user');
    } finally {
      setActionLoading(null);
    }
  };

  // Open delete modal
  const openDeleteModal = (userId: string, userName: string) => {
    setDeleteModal({
      isOpen: true,
      userId,
      userName
    });
    setMenuOpen(null);
  };

  // Open suspend modal
  const openSuspendModal = (userId: string, userName: string) => {
    setSuspendModal({
      isOpen: true,
      userId,
      userName,
      reason: ''
    });
    setMenuOpen(null);
  };

  // Get initials from name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && !users.length) {
    return (
      <div className="page-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={40} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Toolbar */}
      <div className="toolbar">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search by name, email or role..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </label>
        <select className="filter-select" value={role} onChange={e => setRole(e.target.value)}>
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
        <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="btn-primary icon-only" aria-label="Refresh" onClick={fetchUsers}>
          <RefreshCw size={20} />
        </button>
        <button className="btn-primary icon-only" aria-label="Add user">
          <UserPlus size={20} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="um-stats-grid">
        <div className="hero-card green-card compact">
          <div className="hero-card-text">
            <p className="hero-label">Total Active Users</p>
            <h2 className="hero-value">{stats?.activeUsers?.toLocaleString() || 0} Users</h2>
            <span className="hero-badge">
              <TrendingUp size={13} />
              {stats?.growth || 0}% vs last month
            </span>
          </div>
        </div>
        <div className="alert-stat-card">
          <p className="alert-stat-label">Suspended Accounts</p>
          <div className="alert-stat-number">
            <span>{stats?.suspendedUsers || 0}</span>
            <AlertTriangle size={44} />
          </div>
          <p className="alert-stat-sub">Requiring immediate review</p>
        </div>
      </div>

      {/* User Directory */}
      <div className="section-card">
        <div className="section-header">
          <h3 className="section-title">User Directory</h3>
          <span className="muted-text">{totalUsers} users</span>
        </div>

        {error && (
          <div className="error-message" style={{ marginBottom: '16px', padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        <div className="user-list">
          {users.length === 0 ? (
            <p className="empty-state" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No users match your filters.
            </p>
          ) : (
            users.map(user => (
              <div key={user.id} className="user-row">
                <div className="user-avatar">{getInitials(user.firstName, user.lastName)}</div>
                <div className="user-info">
                  <p className="user-name">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="user-email">{user.email}</p>
                  <small style={{ color: '#6b7280', fontSize: '11px' }}>Joined {formatDate(user.createdAt)}</small>
                </div>
                <span className="user-role">{roleDisplay[user.role] || user.role}</span>
                <span className={`pill ${statusTone[user.status] || 'warning'}`}>{user.status}</span>
                <div className="action-menu-wrap">
                  <button
                    className="icon-btn"
                    onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}
                    disabled={actionLoading === user.id}
                  >
                    {actionLoading === user.id ? <Loader2 size={18} className="spinner" /> : <MoreVertical size={18} />}
                  </button>
                  {menuOpen === user.id && (
                    <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => { /* View profile logic */ }}>
                        View Profile
                      </button>
                      <button className="dropdown-item" onClick={() => { /* Edit role logic */ }}>
                        Edit Role
                      </button>
                      {user.role !== 'ADMIN' && (
                        <>
                          {user.status !== 'SUSPENDED' ? (
                            <button
                              className="dropdown-item danger"
                              onClick={() => openSuspendModal(user.id, `${user.firstName} ${user.lastName}`)}
                            >
                              <Ban size={16} /> Suspend
                            </button>
                          ) : (
                            <button
                              className="dropdown-item success"
                              onClick={async () => {
                                try {
                                  await userApi.updateStatus(user.id, 'ACTIVE');
                                  await fetchUsers();
                                  await fetchStats();
                                  setMenuOpen(null);
                                } catch (err: any) {
                                  alert(err.message || 'Failed to activate user');
                                }
                              }}
                            >
                              Activate
                            </button>
                          )}
                          <button
                            className="dropdown-item danger"
                            onClick={() => openDeleteModal(user.id, `${user.firstName} ${user.lastName}`)}
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-controls">
              <button
                className="page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`page-btn ${page === pageNum ? 'active' : ''}`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="page-btn">...</span>}
              <button
                className="page-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
            <span className="muted-text">
              Page {page} of {totalPages}
            </span>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal.isOpen && (
        <div className="modal-overlay" onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '' })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '' })}
            >
              <X size={20} />
            </button>
            <div className="modal-icon danger-icon">
              <Trash2 size={40} />
            </div>
            <h3 className="modal-title">Delete User</h3>
            <p className="modal-description">
              Are you sure you want to delete <strong>{deleteModal.userName}</strong>? 
              This action <strong>cannot be undone</strong> and will permanently remove all user data.
            </p>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setDeleteModal({ isOpen: false, userId: null, userName: '' })}
              >
                Cancel
              </button>
              <button 
                className="modal-btn delete-btn" 
                onClick={handleDelete}
                disabled={actionLoading === deleteModal.userId}
              >
                {actionLoading === deleteModal.userId ? <Loader2 size={18} className="spinner" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Modal */}
      {suspendModal.isOpen && (
        <div className="modal-overlay" onClick={() => setSuspendModal({ isOpen: false, userId: null, userName: '', reason: '' })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSuspendModal({ isOpen: false, userId: null, userName: '', reason: '' })}
            >
              <X size={20} />
            </button>
            <div className="modal-icon warning-icon">
              <Ban size={40} />
            </div>
            <h3 className="modal-title">Suspend User</h3>
            <p className="modal-description">
              Are you sure you want to suspend <strong>{suspendModal.userName}</strong>? 
              The user will lose access to their account until reactivated.
            </p>
            <div className="modal-form-group">
              <label htmlFor="suspend-reason" className="modal-label">
                Reason for suspension <span className="required">*</span>
              </label>
              <textarea
                id="suspend-reason"
                className="modal-textarea"
                placeholder="Please provide a reason for suspending this user..."
                value={suspendModal.reason}
                onChange={(e) => setSuspendModal({ ...suspendModal, reason: e.target.value })}
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn cancel-btn" 
                onClick={() => setSuspendModal({ isOpen: false, userId: null, userName: '', reason: '' })}
              >
                Cancel
              </button>
              <button 
                className="modal-btn suspend-btn" 
                onClick={handleSuspend}
                disabled={!suspendModal.reason.trim() || actionLoading === suspendModal.userId}
              >
                {actionLoading === suspendModal.userId ? <Loader2 size={18} className="spinner" /> : 'Suspend'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 40px 36px 32px;
          max-width: 480px;
          width: 100%;
          position: relative;
          animation: slideUp 0.3s ease;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: #F3F4F6;
          color: #374151;
        }

        .modal-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          width: 72px;
          height: 72px;
          border-radius: 50%;
        }

        .modal-icon.danger-icon {
          background: #FEF2F2;
          color: #DC2626;
        }

        .modal-icon.warning-icon {
          background: #FFFBEB;
          color: #D97706;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin: 0 0 8px;
        }

        .modal-description {
          font-size: 15px;
          color: #6B7280;
          text-align: center;
          margin: 0 0 24px;
          line-height: 1.6;
        }

        .modal-description strong {
          color: #111827;
        }

        .modal-form-group {
          margin-bottom: 24px;
        }

        .modal-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }

        .modal-label .required {
          color: #DC2626;
        }

        .modal-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 14px;
          color: #111827;
          background: #FFFFFF;
          transition: all 0.2s;
          resize: vertical;
          font-family: inherit;
        }

        .modal-textarea:focus {
          outline: none;
          border-color: #2E7D32;
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .modal-textarea::placeholder {
          color: #9CA3AF;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .modal-btn {
          padding: 10px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          font-family: inherit;
          min-width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .modal-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .modal-btn.cancel-btn {
          background: #F3F4F6;
          color: #374151;
        }

        .modal-btn.cancel-btn:hover:not(:disabled) {
          background: #E5E7EB;
        }

        .modal-btn.delete-btn {
          background: #DC2626;
          color: #FFFFFF;
        }

        .modal-btn.delete-btn:hover:not(:disabled) {
          background: #B91C1C;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .modal-btn.suspend-btn {
          background: #D97706;
          color: #FFFFFF;
        }

        .modal-btn.suspend-btn:hover:not(:disabled) {
          background: #B45309;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 28px 20px 24px;
            max-width: 400px;
          }

          .modal-title {
            font-size: 19px;
          }

          .modal-description {
            font-size: 14px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-btn {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}