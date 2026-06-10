import {
  Tractor,
  ShieldCheck,
  Lock,
  ClipboardCheck,
  CheckCircle,
  Globe,
} from 'lucide-react';
import { ChevronRight } from 'lucide-react';

function SettingRow({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  return (
    <div className="setting-row">
      <Icon size={26} />
      <div>
        <strong>{label}</strong>
      </div>
      {value ? <em>{value}</em> : null}
      <ChevronRight size={22} />
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      <div className="about-mark">
        <Tractor size={58} />
      </div>

      <h3>AgroConnect</h3>
      <p>Version v4.2.0</p>

      <section className="panel mission-panel">
        <h3>Our Mission</h3>
        <p>
          Empowering farmers and dealers through a high-utility digital ecosystem.
          We bridge rural agriculture and modern commerce so every harvest finds
          its market and every farm has the supplies it needs to thrive.
        </p>
      </section>

      <section className="panel link-list">
        <SettingRow icon={ShieldCheck}    label="Terms & Conditions" />
        <SettingRow icon={Lock}           label="Privacy Policy" />
        <SettingRow icon={ClipboardCheck} label="Open Source Licenses" />
        <SettingRow icon={CheckCircle}    label="What's New" value="v4.2" />
      </section>

      <img
        src="/images/smart-farming.png"
        alt="Young crop leaves in morning light"
        className="about-image"
      />
    </div>
  );
}