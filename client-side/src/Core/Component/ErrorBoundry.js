/* eslint-disable */
import React from 'react';
import HandleErrorBoundary from './HandelErrorBoundry';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('Error',error);
    this.state = { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <HandleErrorBoundary/>

    } else {
      return this.props.children;
    }
  }
}