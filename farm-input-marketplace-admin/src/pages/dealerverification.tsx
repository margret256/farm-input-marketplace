import { useEffect, useMemo, useState } from 'react';
import {
  MapPin,
  FileText,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Building2,
  Phone,
  Mail,
} from 'lucide-react';

import {
  approveDealer,
  fetchDealersForReview,
  rejectDealer,
  type DealerApplication,
} from '../api/dealers';

type DealerAction = 'Approved' | 'Rejected' | 'Info Requested';
type ActionDone = Partial<Record<string, DealerAction | null>>;
type FilterStatus = 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function formatStatus(status: DealerApplication['verificationStatus']) {
  if (status === 'APPROVED') return 'Approved';
  if (status === 'REJECTED') return 'Rejected';
  return 'Pending Review';
}

function formatYear(value: string) {
  const year = new Date(value).getFullYear();
  return Number.isNaN(year) ? 'New' : String(year);
}

export default function DealerVerification() {
  const [dealers, setDealers] = useState<DealerApplication[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [actionDone, setActionDone] = useState<ActionDone>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<DealerAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');

  useEffect(() => {
    let isMounted = true;

    async function loadDealers() {
      try {
        setLoading(true);
        setError(null);

        const status = filterStatus === 'ALL' ? 'ALL' : filterStatus;
        const fetchedDealers = await fetchDealersForReview(status as 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED');

        if (!isMounted) return;

        setDealers(fetchedDealers);
        setSelectedId((current) =>
          current && fetchedDealers.some((dealer) => dealer.id === current)
            ? current
            : fetchedDealers[0]?.id ?? null,
        );
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load dealers');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDealers();

    return () => {
      isMounted = false;
    };
  }, [filterStatus]);

  const selected = useMemo(
    () => dealers.find((dealer) => dealer.id === selectedId) ?? null,
    [dealers, selectedId],
  );

  const currentIndex = selected
    ? dealers.findIndex((dealer) => dealer.id === selected.id)
    : -1;

  const go = (dir: number) => {
    const next = dealers[currentIndex + dir];
    if (next) setSelectedId(next.id);
  };

  const moveAfterReview = () => {
    if (!selected) return;

    const next =
      dealers[currentIndex + 1] ?? dealers[currentIndex - 1] ?? null;

    setDealers((current) =>
      current.filter((dealer) => dealer.id !== selected.id),
    );
    setSelectedId(next?.id ?? null);
    setNote('');
  };

  const handleAction = async (action: DealerAction) => {
    if (!selected || actionLoading) return;

    try {
      setActionLoading(action);
      setError(null);

      if (action === 'Approved') {
        await approveDealer(selected.id, note.trim() || undefined);
        moveAfterReview();
        return;
      }

      if (action === 'Rejected') {
        await rejectDealer(selected.id, note.trim() || undefined);
        moveAfterReview();
        return;
      }

      setActionDone((prev) => ({ ...prev, [selected.id]: action }));
      const next = dealers[currentIndex + 1];
      if (next) setSelectedId(next.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to review dealer');
    } finally {
      setActionLoading(null);
    }
  };

  const doneBg = (action?: DealerAction | null) => {
    if (action === 'Approved') return 'var(--green-100)';
    if (action === 'Rejected') return 'var(--danger-bg)';
    return 'var(--orange-bg)';
  };

  const doneColor = (action?: DealerAction | null) => {
    if (action === 'Approved') return 'var(--green-900)';
    if (action === 'Rejected') return 'var(--danger)';
    return 'var(--orange)';
  };

  if (loading) {
    return (
      <div className="page-content">
        <div className="section-card">
          <p className="muted-text">Loading dealer applications...</p>
        </div>
      </div>
    );
  }

  if (!dealers || dealers.length === 0) {
    return (
      <div className="page-content">
        <div className="section-card">
          <h3 className="section-title">Dealer Verification</h3>
          <p className="empty-state">
            {error || `No dealer applications found for status: ${filterStatus}`}
          </p>
        </div>
      </div>
    );
  }

  const currentSelected = selected;
  if (!currentSelected) {
    return (
      <div className="page-content">
        <div className="section-card">
          <h3 className="section-title">Dealer Verification</h3>
          <p className="empty-state">Select a dealer to review</p>
        </div>
      </div>
    );
  }

  const documents = currentSelected.documents ?? [];
  const statusLabel = formatStatus(currentSelected.verificationStatus);

  return (
    <div className="page-content">
      <div className="dealer-nav">
        <span className="breadcrumb">Admin &rsaquo; Verification</span>
        <div className="dealer-nav-arrows">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as FilterStatus)}
          >
            <option value="ALL">All Dealers</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <button
            className="icon-btn"
            onClick={() => go(-1)}
            disabled={currentIndex <= 0}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="dealer-nav-count">
            {currentIndex + 1} / {dealers.length}
          </span>
          <button
            className="icon-btn"
            onClick={() => go(1)}
            disabled={currentIndex === dealers.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {error ? <p className="empty-state">{error}</p> : null}

      <div className="verification-grid">
        <div className="section-card dealer-profile-card">
          <div className="dealer-avatar">{getInitials(currentSelected.businessName)}</div>
          <h3 className="dealer-name">{currentSelected.businessName}</h3>
          <p className="dealer-since">
            Registered Dealer since {formatYear(currentSelected.createdAt)}
          </p>
          <span className="pill warning">{statusLabel}</span>

          <div className="dealer-details">
            <div className="dealer-detail-row">
              <Building2 size={15} />
              <div>
                <p className="detail-label">Business Owner</p>
                <p className="detail-value">{currentSelected.ownerName}</p>
              </div>
            </div>
            <div className="dealer-detail-row">
              <Mail size={15} />
              <div>
                <p className="detail-label">Business Email</p>
                <p className="detail-value">{currentSelected.email}</p>
              </div>
            </div>
            <div className="dealer-detail-row">
              <Phone size={15} />
              <div>
                <p className="detail-label">Phone Number</p>
                <p className="detail-value">{currentSelected.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dealer-middle-col">
          <div className="section-card">
            <h3 className="section-title" style={{ marginBottom: 14 }}>
              Primary Branch
            </h3>
            <div className="map-preview">
              <MapPin size={36} color="#fff" />
            </div>
            <p className="branch-address">{currentSelected.location}</p>
          </div>

          <div className="section-card">
            <div className="section-header">
              <h3 className="section-title">Submitted Documents</h3>
              <span className="muted-text">
                {documents.length} Files Uploaded
              </span>
            </div>
            <div className="docs-list">
              {documents.length === 0 ? (
                <p className="empty-state">No documents submitted.</p>
              ) : null}
              {documents.map((doc) => (
                <a
                  key={doc.id}
                  className="doc-card"
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <div className="doc-icon">
                    <FileText size={22} />
                  </div>
                  <div className="doc-info">
                    <p className="doc-name">{doc.type}</p>
                    <p className="doc-file">{doc.name}</p>
                  </div>
                  <ShieldCheck size={18} className="doc-shield" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="section-card actions-card">
          <h3 className="section-title" style={{ marginBottom: 18 }}>
            Verification Actions
          </h3>

{actionDone[currentSelected.id] ? (
            <div
              style={{
                background: doneBg(actionDone[currentSelected.id]),
                color: doneColor(actionDone[currentSelected.id]),
                borderRadius: 9,
                padding: '24px 12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              <CheckCircle2 size={32} />
              <p>
                Dealer <strong>{actionDone[currentSelected.id]}</strong>
              </p>
              <button
                className="btn-ghost"
                onClick={() =>
                  setActionDone((p) => ({ ...p, [currentSelected.id]: null }))
                }
              >
                Undo
              </button>
            </div>
          ) : (
            <>
              <button
                className="action-btn approve"
                onClick={() => handleAction('Approved')}
                disabled={Boolean(actionLoading)}
              >
                <CheckCircle2 size={18} /> Approve Dealer
              </button>
              <button
                className="action-btn request"
                onClick={() => handleAction('Info Requested')}
                disabled={Boolean(actionLoading)}
              >
                <HelpCircle size={18} /> Request Info
              </button>
              <button
                className="action-btn reject"
                onClick={() => handleAction('Rejected')}
                disabled={Boolean(actionLoading)}
              >
                <XCircle size={18} /> Reject
              </button>
            </>
          )}

          <div className="note-field">
            <label>Internal Review Note (Optional)</label>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note for the internal team regarding this dealer application..."
            />
          </div>

          <div className="dealer-sidebar-list">
            <p className="sidebar-list-heading">
            {filterStatus === 'ALL' ? 'All Dealers' : `${filterStatus.charAt(0) + filterStatus.slice(1).toLowerCase()} Dealers`}
            </p>
            {dealers.map((dealer) => (
              <button
                key={dealer.id}
                className={`sidebar-dealer-btn ${currentSelected.id === dealer.id ? 'active' : ''}`}
                onClick={() => setSelectedId(dealer.id)}
              >
                <span className="sidebar-dealer-avatar">
                  {getInitials(dealer.businessName)}
                </span>
                <span className="sidebar-dealer-name">{dealer.businessName}</span>
                {actionDone[dealer.id] && (
                  <span
                    className={`pill ${
                      actionDone[dealer.id] === 'Approved' ? 'success' : 'danger'
                    }`}
                    style={{ fontSize: 10 }}
                  >
                    {actionDone[dealer.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
