import React from 'react';
import { Bug, Plus, ShieldAlert, Layers } from 'lucide-react';

export default function Navbar({ onOpenCreate, counts }) {
  return (
    <header className="navbar-root">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <Bug className="brand-icon" size={24} />
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">BugFlow</h1>
              <span className="brand-tag">v1.0</span>
            </div>
            <p className="brand-subtitle">Bug Management System</p>
          </div>
        </div>

        <div className="navbar-stats">
          <div className="stat-pill" title="Total Reported Bugs">
            <Layers size={14} className="stat-icon" />
            <span className="stat-label">Total</span>
            <span className="stat-value">{counts.total}</span>
          </div>
          {counts.critical > 0 && (
            <div className="stat-pill stat-critical" title="Critical Severity Bugs">
              <span className="stat-dot dot-critical" />
              <span className="stat-label">Critical</span>
              <span className="stat-value">{counts.critical}</span>
            </div>
          )}
          {counts.high > 0 && (
            <div className="stat-pill stat-high" title="High Severity Bugs">
              <span className="stat-dot dot-high" />
              <span className="stat-label">High</span>
              <span className="stat-value">{counts.high}</span>
            </div>
          )}
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenCreate}
            id="create-bug-button"
          >
            <Plus size={18} />
            <span>Report Bug</span>
          </button>
        </div>
      </div>
    </header>
  );
}

