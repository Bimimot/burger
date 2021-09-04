import React from "react";
import { ErrorMessage } from '../error-message/error-message';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('Cath error', error, info);
    }

    render() {
        return (
            this.state.hasError
                ? <ErrorMessage />
                : this.props.children
        )
    }
}