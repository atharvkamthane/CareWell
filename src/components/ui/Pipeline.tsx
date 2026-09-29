import { ArrowRight, Database, Fingerprint, Layers3, LayoutDashboard, MapPinned, ShieldCheck, SlidersHorizontal } from 'lucide-react';

const stages = [
  { title: 'Raw patient\nrecords', icon: Database, detail: 'Individual care' },
  { title: 'Remove\nidentifiers', icon: Fingerprint, detail: 'De-identify' },
  { title: 'Aggregate\ndata', icon: Layers3, detail: 'Group insights' },
  { title: 'Group by\nlocation / time /\ndisease', icon: MapPinned, detail: 'Broad categories' },
  { title: 'Apply minimum\ngroup-size\nthreshold', icon: SlidersHorizontal, detail: 'Minimum n = 10' },
  { title: 'Anonymized\nanalytics', icon: ShieldCheck, detail: 'Privacy checked' },
  { title: 'Administrator\ndashboard', icon: LayoutDashboard, detail: 'Aggregate view' },
];

export function Pipeline({ compact = false }: { compact?: boolean }) {
  return <div className={`pipeline ${compact ? 'pipeline-compact' : ''}`} role="img" aria-label="Privacy pipeline: Raw Patient Records, Remove Identifiers, Aggregate Data, Group by Location / Time / Disease, Apply Minimum Group-Size Threshold, Anonymized Analytics, Administrator Dashboard">
    {stages.map(({ title, icon: Icon, detail }, index) => <div className="pipeline-stage-wrap" key={title}><div className={`pipeline-stage ${index === stages.length - 1 ? 'pipeline-stage-final' : ''}`}><span className="pipeline-stage-icon"><Icon size={18} /></span><strong>{title.split('\n').map((line) => <span key={line}>{line}</span>)}</strong><small>{detail}</small></div>{index < stages.length - 1 && <span className="pipeline-arrow"><ArrowRight size={16} /></span>}</div>)}
  </div>;
}
