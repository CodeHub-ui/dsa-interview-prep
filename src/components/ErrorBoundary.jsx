import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error("App error:", error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="card empty">
          <p>We couldn't load the problems right now.</p>
          <button className="btn primary" onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}>Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
