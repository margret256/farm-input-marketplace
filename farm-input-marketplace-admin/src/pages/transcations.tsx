import { useState } from 'react';
import { Download, Search, Filter, Wallet, BarChart3, ClipboardList, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const ALL_ORDERS = [
  { id: '#AC-88921', date: 'Oct 24, 2023', amount: '2,400,000', commission: '120,000', status: 'Cleared' },
  { id: '#AC-88918', date: 'Oct 23, 2023', amount: '850,000',   commission: '42,500',  status: 'Pending' },
  { id: '#AC-88915', date: 'Oct 23, 2023', amount: '1,200,000', commission: '60,000',  status: 'Cleared' },
  { id: '#AC-88910', date: 'Oct 22, 2023', amount: '4,150,000', commission: '207,500', status: 'Review'  },
  { id: '#AC-88907', date: 'Oct 22, 2023', amount: '670,000',   commission: '33,500',  status: 'Cleared' },
  { id: '#AC-88902', date: 'Oct 21, 2023', amount: '3,100,000', commission: '155,000', status: 'Pending' },
  { id: '#AC-88899', date: 'Oct 21, 2023', amount: '980,000',   commission: '49,000',  status: 'Cleared' },
  { id: '#AC-88895', date: 'Oct 20, 2023', amount: '2,750,000', commission: '137,500', status: 'Review'  },
] as const;

const PAGE_SIZE  = 4;
const statusTone = { Cleared: 'success', Pending: 'warning', Review: 'danger' } as const;

export default function Transactions() {
  const [search,    setSearch]    = useState('');
  const [page,      setPage]      = useState(1);
  const [exporting, setExporting] = useState(false);

  const filtered   = ALL_ORDERS.filter(o => { const q = search.toLowerCase(); return !q || o.id.toLowerCase().includes(q) || o.status.toLowerCase().includes(q); });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => { setExporting(true); setTimeout(() => setExporting(false), 1500); };

  return (
    <div className="page-content">
      <div className="tx-title-strip">
        <div>
          <h2 className="tx-title">Transaction Management</h2>
          <p className="tx-subtitle">Overview of your agricultural dealership's financial flow.</p>
        </div>
        <button className="btn-primary" onClick={handleExport} disabled={exporting}>
          <Download size={16} />{exporting ? 'Exporting…' : 'Export Report'}
        </button>
      </div>

      <div className="tx-stats-grid">
        <div className="tx-stat-card">
          <div className="tx-stat-left"><p className="tx-stat-label">Total Revenue</p><p className="tx-stat-value green">UGX 12,450,000</p></div>
          <div className="tx-stat-icon green-bg"><Wallet size={22} /></div>
        </div>
        <div className="tx-stat-card">
          <div className="tx-stat-left"><p className="tx-stat-label">Commission Earned</p><p className="tx-stat-value orange">UGX 622,500</p></div>
          <div className="tx-stat-icon orange-bg"><BarChart3 size={22} /></div>
        </div>
        <div className="tx-stat-card">
          <div className="tx-stat-left"><p className="tx-stat-label">Active Orders</p><p className="tx-stat-value orange">48</p></div>
          <div className="tx-stat-icon yellow-bg"><ClipboardList size={22} /></div>
        </div>
      </div>

      <div className="section-card">
        <div className="toolbar" style={{ marginBottom: 16 }}>
          <label className="search-box" style={{ flex: 1 }}>
            <Search size={16} />
            <input type="search" placeholder="Search Order ID or Status..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </label>
          <button className="filter-btn"><Filter size={15} /> Filter</button>
        </div>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr><th>Order ID</th><th>Date</th><th>Amount (UGX)</th><th>Commission</th><th>Status</th></tr>
            </thead>
            <tbody>
              {paginated.length === 0 && <tr><td colSpan={5} className="empty-state">No orders found.</td></tr>}
              {paginated.map(order => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td className="muted-text">{order.date}</td>
                  <td><strong>{order.amount}</strong></td>
                  <td>{order.commission}</td>
                  <td><span className={`pill ${statusTone[order.status]}`}>{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span className="muted-text">Showing {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length} entries</span>
          <div className="pagination-controls">
            <button className="icon-btn" onClick={() => setPage(p => p-1)} disabled={page===1}><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
              <button key={p} className={`page-btn ${p===page?'active':''}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="icon-btn" onClick={() => setPage(p => p+1)} disabled={page===totalPages}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <div className="upgrade-band">
        <div className="upgrade-text">
          <div className="upgrade-icon"><TrendingUp size={28} /></div>
          <div>
            <h3 className="upgrade-title">Premium Dealer Analytics</h3>
            <p className="upgrade-desc">Unlock deeper insights into your transaction history. Track seasonal trends and optimize your inventory replenishment based on historical demand data.</p>
            <button className="btn-primary">Upgrade to Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
}
