import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertCircle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-background">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={32} className="text-destructive" />
            </div>
            <h2 className="mb-4">Something Went Wrong</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We're sorry, but something unexpected happened. Please try refreshing the page or return to the homepage.
            </p>
            {this.state.error && (
              <div className="mb-8 p-4 bg-accent rounded-lg text-left">
                <p className="text-muted-foreground font-mono overflow-x-auto">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <Home size={18} />
                  Go Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
