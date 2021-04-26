import * as React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromError(error) {
        console.warn(error);
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Error Occured');
        console.warn(error, errorInfo);
    }

    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
