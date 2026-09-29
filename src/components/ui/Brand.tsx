import { Link } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';
export function Brand({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return <Link className={`brand ${compact ? 'brand-compact' : ''} ${light ? 'brand-light' : ''}`} to="/"><span className="brand-mark"><ShieldPlus size={19} strokeWidth={2.2} /></span>{!compact && <span className="brand-wordmark">carewell<span>health</span></span>}</Link>;
}
