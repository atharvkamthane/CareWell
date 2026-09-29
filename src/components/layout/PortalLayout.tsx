import { useMemo } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Activity, BarChart3, CalendarDays, ClipboardList, FilePlus2, FileText, HeartPulse, LayoutDashboard, LogOut, MapPinned, QrCode, ScanLine, ShieldCheck, Stethoscope, UserRound, Users, Clock3, Pill, ScrollText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role } from '../../data/demo';
import { useAuth } from '../../app/App';

const destinations: Record<Role, Array<{ label: string; path: string; icon: LucideIcon }>> = {
  patient: [
    { label: 'Overview', path: '/patient', icon: LayoutDashboard }, { label: 'Medical history', path: '/patient/history', icon: Activity },
    { label: 'Visits', path: '/patient/visits', icon: CalendarDays }, { label: 'Prescriptions', path: '/patient/prescriptions', icon: Pill },
    { label: 'Reports', path: '/patient/reports', icon: FileText }, { label: 'QR access', path: '/patient/qr', icon: QrCode },
    { label: 'Profile', path: '/patient/profile', icon: UserRound },
  ],
  clinician: [
    { label: 'Dashboard', path: '/clinician', icon: LayoutDashboard }, { label: 'Scan QR', path: '/clinician/scan', icon: ScanLine },
    { label: 'Patients', path: '/clinician/patients', icon: Users }, { label: 'Recent records', path: '/clinician/recent-records', icon: ClipboardList },
    { label: 'Add visit', path: '/clinician/visit/new', icon: FilePlus2 }, { label: 'Profile', path: '/clinician/profile', icon: UserRound },
  ],
  administrator: [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard }, { label: 'Disease trends', path: '/admin/trends', icon: Activity },
    { label: 'Regional analytics', path: '/admin/regional', icon: MapPinned }, { label: 'Time analysis', path: '/admin/time', icon: Clock3 },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 }, { label: 'Audit overview', path: '/admin/audit', icon: ScrollText },
    { label: 'Profile', path: '/admin/profile', icon: UserRound },
  ],
};

const roleDetails: Record<Role, { title: string; subtitle: string; user: string; icon: LucideIcon }> = {
  patient: { title: 'Patient portal', subtitle: 'Your health, organized.', user: 'Rahul Mehta', icon: HeartPulse },
  clinician: { title: 'Care workspace', subtitle: 'Clinician workspace', user: 'Dr. Kavita Sharma', icon: Stethoscope },
  administrator: { title: 'Public health', subtitle: 'Population insights', user: 'Public health team', icon: BarChart3 },
};

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link className={`brand ${compact ? 'brand-compact' : ''}`} to="/"><span className="brand-mark"><ShieldCheck size={19} strokeWidth={2.2} /></span>{!compact && <span className="brand-wordmark">carewell<span>health</span></span>}</Link>;
}

export function PortalLayout({ role }: { role: Role }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const links = destinations[role];
  const detail = roleDetails[role];
  const HeaderIcon = detail.icon;
  const mobileLinks = useMemo(() => role === 'clinician'
    ? [links[0], links[1], links[2], links[links.length - 1]]
    : role === 'patient'
      ? [links[0], links[1], links[5], links[links.length - 1]]
      : [links[0], links[1], links[2], links[links.length - 1]], [links, role]);
  const roleLabel = role === 'administrator' ? 'Administrator' : role[0].toUpperCase() + role.slice(1);

  return <div className={`portal portal-${role}`}>
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-workspace"><span className="workspace-icon"><HeaderIcon size={16} /></span><span><strong>{detail.title}</strong><small>{detail.subtitle}</small></span></div>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label={`${roleLabel} navigation`} className="sidebar-nav">
        {links.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} end={path === `/${role === 'administrator' ? 'admin' : role}`} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><Icon size={17} strokeWidth={1.85} /><span>{label}</span></NavLink>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="prototype-note"><ShieldCheck size={16} /><span><strong>Prototype mode</strong><small>Demo data · no live records</small></span></div>
        <div className="sidebar-user"><div className="avatar avatar-teal">{detail.user.split(' ').slice(-1)[0]?.[0] ?? 'U'}</div><div className="sidebar-user-copy"><strong>{detail.user}</strong><small>{roleLabel}</small></div><button className="icon-button logout-icon" aria-label="Sign out" title="Sign out" onClick={() => { signOut(); navigate('/'); }}><LogOut size={16} /></button></div>
      </div>
    </aside>
    <div className="portal-main">
      <header className="portal-topbar">
        <div className="mobile-brand"><Brand compact /><span className="mobile-brand-label">{detail.title}</span></div>
        <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-sep">/</span><strong>{links.find((item) => item.path === location.pathname)?.label ?? (role === 'clinician' && location.pathname.startsWith('/clinician/patient/') ? 'Patient record' : 'Overview')}</strong></div>
        <div className="topbar-right"><span className="demo-indicator"><span /> DEMO ENVIRONMENT</span><div className="avatar avatar-soft" aria-label={detail.user}>{detail.user.split(' ').slice(-1)[0]?.[0] ?? 'U'}</div></div>
      </header>
      <main className="portal-content"><Outlet /></main>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">{mobileLinks.map(({ label, path, icon: Icon }) => <NavLink key={path} to={path} end={path === `/${role === 'administrator' ? 'admin' : role}`} className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>
    </div>
  </div>;
}
