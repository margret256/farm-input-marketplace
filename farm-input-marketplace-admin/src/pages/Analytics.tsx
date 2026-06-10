import {
  Tractor,
  BadgeCheck,
  Wallet,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';

const anomalyItems = [
  {
    title: 'Unusual volume spike in Fertilizer sales',
    meta: 'Central Valley Depot - 2 hours ago',
    tone: 'danger',
    icon: AlertTriangle,
  },
  {
    title: 'Inventory low: John Deere Parts',
    meta: 'North Uplands Depot - 5 hours ago',
    tone: 'warning',
    icon: SlidersHorizontal,
  },
  {
    title: 'System backup successful',
    meta: 'Automated - 12 hours ago',
    tone: 'success',
    icon: CheckCircle,
  },
];

function PanelHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="panel-heading">
      <h3>{title}</h3>
      {action ? <button type="button">{action}</button> : null}
    </div>
  );
}

function Progress({ label, value, width, tone }: { label: string; value: string; width: string; tone: string }) {
  return (
    <div className="progress-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="progress-track">
        <span className={tone} style={{ width }} />
      </div>
    </div>
  );
}

function CategoryBar({ icon: Icon, label, value, width, tone }: { icon: any; label: string; value: string; width: string; tone: string }) {
  return (
    <div className="category-row">
      <div className={`metric-icon ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="category-content">
        <div>
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
        <div className="progress-track">
          <span className={tone} style={{ width }} />
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, body, tone }: { title: string; value: string; body: string; tone: string }) {
  return (
    <section className={`insight-card ${tone}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{body}</p>
    </section>
  );
}

function ActivityRow({ item }: { item: any }) {
  const Icon = item.icon;
  return (
    <div className="activity-row">
      <div className={`activity-icon ${item.tone}`}>
        <Icon size={20} />
      </div>
      <div>
        <strong>{item.name || item.title}</strong>
        <span>{item.meta}</span>
      </div>
      {item.status ? <span className={`status-pill ${item.tone}`}>{item.status}</span> : null}
    </div>
  );
}

function LineChart() {
  return (
    <div className="chart-frame" aria-label="Revenue trend chart">
      <svg viewBox="0 0 560 240" role="img">
        <title>Revenue rises from January through June with a brief dip in May.</title>
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2E7D32" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M24 210 C80 190 112 150 168 132 C234 110 260 98 318 82 C376 64 396 18 452 70 C504 118 512 124 536 34 L536 220 L24 220 Z"
          fill="url(#lineFill)"
        />
        <path
          d="M24 210 C80 190 112 150 168 132 C234 110 260 98 318 82 C376 64 396 18 452 70 C504 118 512 124 536 34"
          fill="none"
          stroke="#1B5E20"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'].map((month, index) => (
          <text key={month} x={44 + index * 94} y="232" fontSize="16" fill="#747970">
            {month}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="analytics-grid">
      <section className="panel chart-panel">
        <div className="chart-heading">
          <div>
            <h3>Revenue Trends</h3>
            <p>Monthly growth and projections</p>
          </div>
          <div className="chart-total">
            <strong>$142,850</strong>
            <span>+12.4% vs last mo.</span>
          </div>
        </div>
        <LineChart />
      </section>

      <section className="panel region-panel">
        <PanelHeading title="Regional Sales" />
        <Progress label="Central Valley" value="42%" width="42%" tone="green" />
        <Progress label="North Uplands"  value="28%" width="28%" tone="green" />
        <Progress label="South Delta"    value="18%" width="18%" tone="orange" />
        <Progress label="Eastern Plains" value="12%" width="12%" tone="yellow" />
        <img src="/images/farm.png" alt="Farm landscape" className="regional-image" />
      </section>

      <section className="panel top-categories">
        <PanelHeading title="Top Categories" />
        <CategoryBar icon={Tractor}    label="Tractors"   value="$45.2k" width="86%" tone="green" />
        <CategoryBar icon={BadgeCheck} label="Seeds"      value="$32.1k" width="66%" tone="orange" />
        <CategoryBar icon={Wallet}     label="Fertilizer" value="$18.4k" width="42%" tone="yellow" />
      </section>

      <div className="insight-stack">
        <InsightCard title="Active Users" value="1,284" body="+5.2% Daily"    tone="success" />
        <InsightCard title="Order Volume" value="432"   body="Avg $330/order" tone="orange" />
        <InsightCard title="Lead Conv."   value="18.4%" body="Optimized"      tone="yellow" />
      </div>

      <section className="panel anomaly-panel">
        <PanelHeading title="Anomalous Activity" action="View All Alerts" />
        <div className="activity-list">
          {anomalyItems.map((item) => (
            <ActivityRow key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}