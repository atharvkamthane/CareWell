import { useEffect, useState, type ReactNode } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Info, ShieldAlert, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Visit } from '../../data/demo';

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function Button({ children, variant = 'primary', size = 'md', className, icon, type = 'button', disabled, onClick, ...props }: {
  children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'light'; size?: 'sm' | 'md' | 'lg'; className?: string; icon?: ReactNode; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cx('button', `button-${variant}`, `button-${size}`, className)} disabled={disabled} onClick={onClick} {...props}>{icon}{children}</button>;
}

export function Card({ children, className, as: Tag = 'div', ...props }: { children: ReactNode; className?: string; as?: 'div' | 'section' } & React.HTMLAttributes<HTMLElement>) {
  return <Tag className={cx('card', className)} {...props}>{children}</Tag>;
}

export function PageHeading({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{actions && <div className="page-heading-actions">{actions}</div>}</div>;
}

function AnimatedNumber({ value }: { value: number | string }) {
  const target = typeof value === 'number' ? value : Number(value.replaceAll(',', ''));
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!Number.isFinite(target)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(target); return; }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 780);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target]);
  return <span aria-live="off">{Number.isFinite(target) ? display.toLocaleString('en-IN') : value}</span>;
}

export function StatCard({ label, value, note, icon: Icon, tone = 'teal', animated = false }: { label: string; value: string | number; note?: string; icon: LucideIcon; tone?: 'teal' | 'blue' | 'amber' | 'rose'; animated?: boolean }) {
  return <Card className="stat-card"><div className={`stat-icon tone-${tone}`}><Icon size={19} strokeWidth={1.8} /></div><div className="stat-label">{label}</div><div className="stat-value">{animated ? <AnimatedNumber value={value} /> : value}</div>{note && <div className="stat-note">{note}</div>}</Card>;
}

export function StatusBadge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot" />{children}</span>;
}

export function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

export function EmptyState({ title, description, icon: Icon = Info, action }: { title: string; description: string; icon?: LucideIcon; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon size={21} /></div><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function Timeline({ items }: { items: Visit[] }) {
  return <div className="timeline">{items.map((item, index) => <div className="timeline-item" key={item.id} style={{ animationDelay: `${index * 70}ms` }}><div className="timeline-marker"><span /></div><div className="timeline-content"><div className="timeline-top"><strong>{item.reason}</strong><span>{item.date}</span></div><p>{item.diagnosis}</p><div className="timeline-meta">{item.doctor} <span>·</span> {item.clinic}</div></div></div>)}</div>;
}

export function DataSuppressedCard({ explanation }: { explanation: string }) {
  return <div className="suppressed-card" role="status" aria-live="polite"><div className="suppressed-icon"><ShieldAlert size={20} /></div><div><strong>Data suppressed to protect patient privacy.</strong><p>{explanation}</p></div><span className="suppressed-info" title={explanation} aria-label={explanation}><Info size={16} /></span></div>;
}

export function Dialog({ open, title, description, children, onClose, footer }: { open: boolean; title: string; description?: string; children: ReactNode; onClose: () => void; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.classList.add('modal-open');
    return () => { document.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('modal-open'); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><header className="dialog-header"><div><h2 id="dialog-title">{title}</h2>{description && <p>{description}</p>}</div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></header><div className="dialog-body">{children}</div>{footer && <footer className="dialog-footer">{footer}</footer>}</section></div>;
}

export function MessagePanel({ tone = 'info', title, children }: { tone?: 'info' | 'warning' | 'success'; title: string; children: ReactNode }) {
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'warning' ? AlertCircle : Info;
  return <div className={`message-panel message-${tone}`}><Icon size={19} /><div><strong>{title}</strong><p>{children}</p></div></div>;
}

export function TableAction({ label, onClick }: { label: string; onClick?: () => void }) {
  return <button className="table-link" onClick={onClick}>{label}<ArrowUpRight size={14} /></button>;
}
