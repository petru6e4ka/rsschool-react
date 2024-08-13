import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // need to turn off the linter to fulfill task requirements
    // eslint-disable-next-line no-console
    console.error(error, errorInfo.componentStack);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
