import {
  UserCircle,
  Wallet,
  Building2,
  Lock,
  Eye,
  Globe,
  CalendarDays,
  Bell,
  Mail,
  LogOut,
  ChevronRight,
} from 'lucide-react';

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="settings-group">
      <h3>{title}</h3>
      <div className="settings-list">{children}</div>
    </section>
  );
}

function SettingRow({
  icon: Icon,
  label,
  sublabel,
  value,
  toggle,
  checked,
}: {
  icon: any;
  label: string;
  sublabel?: string;
  value?: string;
  toggle?: boolean;
  checked?: boolean;
}) {
  return (
    <div className="setting-row">
      <Icon size={26} />
      <div>
        <strong>{label}</strong>
        {sublabel ? <span>{sublabel}</span> : null}
      </div>
      {value ? <em>{value}</em> : null}
      {toggle ? (
        <span className={`toggle ${checked ? 'checked' : ''}`} />
      ) : (
        <ChevronRight size={22} />
      )}
    </div>
  );
}

export default function Profile() {
  return (
    <div className="settings-page">
      <section className="profile-hero">
        <div className="profile-photo">HC</div>
        <div>
          <h3>Harvesters Co.</h3>
          <p>Verified Dealer - Premium Account</p>
        </div>
      </section>

      <SettingsGroup title="Account">
        <SettingRow icon={UserCircle} label="Personal Information" />
        <SettingRow icon={Wallet}     label="Payment Methods" />
        <SettingRow icon={Building2}  label="Switch Role" />
      </SettingsGroup>

      <SettingsGroup title="Security">
        <SettingRow icon={Lock} label="Two-Factor Authentication" sublabel="Enhanced account protection" toggle checked />
        <SettingRow icon={Eye}  label="Biometric Login" toggle />
      </SettingsGroup>

      <SettingsGroup title="Preferences">
        <SettingRow icon={Globe}        label="Language" sublabel="English" value="English, Luganda, Swahili" />
        <SettingRow icon={CalendarDays} label="Theme" value="Light Mode" />
      </SettingsGroup>

      <SettingsGroup title="Notifications">
        <SettingRow icon={Bell} label="Push Notifications" toggle checked />
        <SettingRow icon={Mail} label="Email Updates"      toggle checked />
      </SettingsGroup>

      <button className="signout-button" type="button">
        <LogOut size={22} />
        Sign Out
      </button>
    </div>
  );
}