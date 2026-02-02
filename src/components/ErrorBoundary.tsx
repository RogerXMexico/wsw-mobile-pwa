import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
          <div className="text-4xl mb-4">🙈</div>
          <h2 className="text-lg font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-zinc-400 text-sm mb-6">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
            className="px-5 py-2.5 bg-[#39ff14] text-black text-white font-medium rounded-xl active:scale-95 transition-transform"
          >
            Go Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
