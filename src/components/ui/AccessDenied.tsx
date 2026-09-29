import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole, ShieldAlert } from 'lucide-react';
import type { Role } from '../../data/demo';
import { Button, Card } from './Shared';

const labels: Record<Role | 'visitor', string> = { patient: 'Patient', clinician: 'Clinician', administrator: 'Administrator', visitor: 'Visitor' };

export function AccessDeniedPage({ currentRole, requestedResource, requiredPermission }: { currentRole: Role | 'visitor'; requestedResource: string; requiredPermission: string }) {
  return <main className="denied-page"><header className="public-header"><Link className="brand" to="/"><span className="brand-mark"><ShieldAlert size={19} /></span><span className="brand-wordmark">carewell<span>health</span></span></Link><span className="demo-indicator"><span /> PROTOTYPE</span></header><div className="denied-wrap"><div className="denied-symbol"><LockKeyhole size={26} /></div><div className="eyebrow">ACCESS CONTROL · PROTOTYPE</div><h1>Access Restricted</h1><p className="denied-lede">You do not have permission to view this resource.</p><Card className="denied-details"><div><span>Requested resource</span><strong>{requestedResource}</strong></div><div><span>Current role</span><strong>{labels[currentRole]}</strong></div><div><span>Required permission</span><strong>{requiredPermission}</strong></div><div><span>Result</span><strong className="denied-result">Access denied</strong></div></Card><p className="fine-print">No patient information is shown on this screen. In a production system, role permissions must be verified by a backend service.</p><div className="denied-actions"><Link to="/"><Button variant="secondary" icon={<ArrowLeft size={16} />}>Return home</Button></Link><Link to="/login"><Button>Choose another role</Button></Link></div></div></main>;
}
