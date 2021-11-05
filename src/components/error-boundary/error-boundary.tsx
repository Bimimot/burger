import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorMessage } from '../error-message/error-message';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Cath error', error, errorInfo);
    }

    render() {
        return (
            this.state.hasError
                ? <ErrorMessage />
                : this.props.children
        )
    }
}