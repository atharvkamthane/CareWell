import { createContext, lazy, Suspense, useCallback, useEffect, useContext, useMemo, useState, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import type { Role } from '../data/demo';
import { PortalLayout } from '../components/layout/PortalLayout';
import { DemoRecordSessionProvider } from './DemoRecordSession';
import { RouteErrorBoundary } from '../components/ui/ErrorBoundary';

const HomePage = lazy(() => import('../pages/Public').then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('../pages/Public').then((module) => ({ default: module.LoginPage })));
const PatientHome = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientHome })));
const PatientHistory = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientHistory })));
const PatientVisits = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientVisits })));
const PatientPrescriptions = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientPrescriptions })));
const PatientReports = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientReports })));
const PatientQR = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientQR })));
const PatientProfile = lazy(() => import('../pages/Patient').then((module) => ({ default: module.PatientProfile })));
const ClinicianHome = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.ClinicianHome })));
const QRScannerPage = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.QRScannerPage })));
const ClinicianPatients = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.ClinicianPatients })));
const RecentRecords = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.RecentRecords })));
const PatientRecord = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.PatientRecord })));
const AddVisitPage = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.AddVisitPage })));
const ClinicianProfile = lazy(() => import('../pages/Clinician').then((module) => ({ default: module.ClinicianProfile })));
const AdminOverview = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminOverview })));
const AdminTrends = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminTrends })));
const AdminRegional = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminRegional })));
const AdminTime = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminTime })));
const AdminReports = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminReports })));
const AdminAudit = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminAudit })));
const AdminProfile = lazy(() => import('../pages/Admin').then((module) => ({ default: module.AdminProfile })));
const SecurityPage = lazy(() => import('../pages/Security').then((module) => ({ default: module.SecurityPage })));
const AccessDeniedPage = lazy(() => import('../components/ui/AccessDenied').then((module) => ({ default: module.AccessDeniedPage })));

interface AuthContextValue { role: Role | null; enterDemo: (role: Role) => void; signOut: () => void }
const AuthContext = createContext<AuthContextValue | null>(null);
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside the application.'); return value; }

export type ToastKind = 'success' | 'info' | 'error';
export type ToastItem = { id: number; title: string; message?: string; kind: ToastKind };
interface ToastContextValue { showToast: (title: string, message?: string, kind?: ToastKind) => void; dismissToast: (id: number) => void }
const ToastContext = createContext<ToastContextValue | null>(null);
export function useToast() { const value = useContext(ToastContext); if (!value) throw new Error('useToast must be used inside the application.'); return value; }

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismissToast = useCallback((id: number) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const showToast = useCallback((title: string, message?: string, kind: ToastKind = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((items) => [...items.slice(-2), { id, title, message, kind }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 4200);
  }, []);
  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast]);
  return <ToastContext.Provider value={value}>{children}<div className="toast-stack" aria-live="polite" aria-relevant="additions">{toasts.map((toast) => <div className={`toast toast-${toast.kind}`} key={toast.id} role="status"><span className="toast-icon">{toast.kind === 'success' ? <CheckCircle2 size={18} /> : toast.kind === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}</span><span className="toast-copy"><strong>{toast.title}</strong>{toast.message && <small>{toast.message}</small>}</span><button className="icon-button" aria-label="Dismiss notification" onClick={() => dismissToast(toast.id)}><X size={15} /></button></div>)}</div></ToastContext.Provider>;
}

function RouteLoading() {
  return <main className="route-loading" role="status" aria-live="polite"><span className="loading-label">Loading secure workspace…</span><div className="loading-skeleton-row"><i /><i /><i /></div><div className="loading-skeleton-block" /><div className="loading-skeleton-block short" /></main>;
}

function RoleGate({ required, children }: { required: Role; children: ReactNode }) {
  const { role } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const denied = role !== null && role !== required;
  useEffect(() => {
    if (denied) showToast('Access denied', 'You do not have permission to view this resource.', 'error');
  }, [denied, location.pathname, required, showToast]);
  if (!role) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (denied) return <AccessDeniedPage currentRole={role} requestedResource={location.pathname} requiredPermission={required === 'administrator' ? 'Aggregated public-health analytics' : required === 'clinician' ? 'Authorized individual patient records' : 'Personal patient records'} />;
  return children;
}

function DeniedRoute() {
  const { role } = useAuth();
  const location = useLocation();
  return <AccessDeniedPage currentRole={role ?? 'visitor'} requestedResource={String(new URLSearchParams(location.search).get('resource') ?? 'Restricted health record')} requiredPermission="Role-authorized access" />;
}

function ApplicationRoutes() {
  const location = useLocation();
  return <RouteErrorBoundary key={location.pathname}><Suspense fallback={<RouteLoading />}><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/security" element={<SecurityPage />} />
    <Route path="/access-denied" element={<DeniedRoute />} />
    <Route path="/patient" element={<RoleGate required="patient"><PortalLayout role="patient" /></RoleGate>}>
      <Route index element={<PatientHome />} /><Route path="history" element={<PatientHistory />} /><Route path="visits" element={<PatientVisits />} /><Route path="prescriptions" element={<PatientPrescriptions />} /><Route path="reports" element={<PatientReports />} /><Route path="qr" element={<PatientQR />} /><Route path="profile" element={<PatientProfile />} />
    </Route>
    <Route path="/clinician" element={<RoleGate required="clinician"><PortalLayout role="clinician" /></RoleGate>}>
      <Route index element={<ClinicianHome />} /><Route path="scan" element={<QRScannerPage />} /><Route path="patients" element={<ClinicianPatients />} /><Route path="recent-records" element={<RecentRecords />} /><Route path="patient/:id" element={<PatientRecord />} /><Route path="visit/new" element={<AddVisitPage />} /><Route path="profile" element={<ClinicianProfile />} />
    </Route>
    <Route path="/admin" element={<RoleGate required="administrator"><PortalLayout role="administrator" /></RoleGate>}>
      <Route index element={<AdminOverview />} /><Route path="trends" element={<AdminTrends />} /><Route path="regional" element={<AdminRegional />} /><Route path="time" element={<AdminTime />} /><Route path="reports" element={<AdminReports />} /><Route path="audit" element={<AdminAudit />} /><Route path="profile" element={<AdminProfile />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Suspense></RouteErrorBoundary>;
}

function RouterApplication() {
  const [role, setRole] = useState<Role | null>(null);
  const authValue = useMemo(() => ({ role, enterDemo: (nextRole: Role) => setRole(nextRole), signOut: () => setRole(null) }), [role]);
  const navigate = useNavigate();
  return <DemoRecordSessionProvider><AuthContext.Provider value={authValue}><ToastProvider><ApplicationRoutes /><button className="help-shortcut" onClick={() => navigate('/security')} aria-label="Open security and privacy information"><Info size={17} /><span>Privacy &amp; security</span></button></ToastProvider></AuthContext.Provider></DemoRecordSessionProvider>;
}

export function App() { return <BrowserRouter><RouterApplication /></BrowserRouter>; }
