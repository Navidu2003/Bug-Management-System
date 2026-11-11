import React from 'react';
import { Bug, Plus, SearchX, CheckCircle2 } from 'lucide-react';

export default function EmptyState({ isFiltered, onResetFilters, onOpenCreate }) {
  if (isFiltered) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrapper is-search">
          <SearchX size={36} className="empty-icon" />
        </div>
        <h3 className="empty-title">No matching bugs found</h3>
        <p className="empty-desc">
          We couldn't find any bugs matching your current search or severity filter.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onResetFilters}
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state-card">
      <div className="empty-icon-wrapper">
        <CheckCircle2 size={40} className="empty-icon success-accent" />
      </div>
      <h3 className="empty-title">No Bugs Reported Yet!</h3>
      <p className="empty-desc">
        All systems are running smoothly. Click the button below to report the first bug.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onOpenCreate}
      >
        <Plus size={18} />
        <span>Create First Bug</span>
      </button>
    </div>
  );
}

