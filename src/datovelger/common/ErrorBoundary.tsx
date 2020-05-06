import React, { ReactNode } from 'react';

class ErrorBoundary extends React.Component<{ children: ReactNode }> {
    componentDidCatch() {
        // Swallow errors
    }
    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
