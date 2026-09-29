import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Shared';

interface Props { children: ReactNode }
interface State { failed: boolean }

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // A production implementation would send a privacy-reviewed diagnostic to its backend.
  }

  render() {
    if (this.state.failed) return <main className="page-error" role="alert"><span className="page-error-icon"><AlertCircle size={23} /></span><h1>This view couldn’t be loaded.</h1><p>No patient details are shown here. Try reloading this demo workspace.</p><Button variant="secondary" onClick={() => window.location.reload()}>Reload workspace</Button></main>;
    return this.props.children;
  }
}
