import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // Standard highly polished fallback UI in case of any crashes!
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans antialiased">
          <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500" />
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            
            <h1 className="text-xl font-bold text-white mb-2 tracking-tight">
              Oops! Something went wrong
            </h1>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              We encountered an unexpected error loading the interactive menu. Please refresh the page or try switching your browser language.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 active:scale-95"
            >
              Reload Menu
            </button>
            
            {this.state.error && (
              <details className="mt-6 text-left border-t border-slate-800 pt-4 cursor-pointer group">
                <summary className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hover:text-slate-300 select-none">
                  View Error Details
                </summary>
                <pre className="mt-2 p-3 bg-black/60 rounded-xl text-[10px] font-mono text-rose-400 overflow-auto max-h-32 leading-relaxed">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
