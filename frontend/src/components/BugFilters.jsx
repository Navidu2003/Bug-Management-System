import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export default function BugFilters({
  searchTerm,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  sortBy,
  onSortChange,
  counts,
}) {
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const hasActiveFilters = searchTerm.trim() !== '' || severityFilter !== 'All';

  const handleClearFilters = () => {
    onSearchChange('');
    onSeverityChange('All');
  };

  return (
    <div className="filters-root">
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by bug title or description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filters-right">
        {/* Severity Tabs */}
        <div className="severity-tabs">
          {severities.map((sev) => {
            const count =
              sev === 'All'
                ? counts.total
                : counts[sev.toLowerCase()] || 0;
            const isActive = severityFilter === sev;

            return (
              <button
                key={sev}
                type="button"
                className={`tab-btn ${isActive ? 'tab-btn-active' : ''}`}
                onClick={() => onSeverityChange(sev)}
              >
                <span>{sev}</span>
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="sort-wrapper">
          <ArrowUpDown size={15} className="sort-icon" />
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort bugs by"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="severity-desc">Highest Severity</option>
            <option value="severity-asc">Lowest Severity</option>
            <option value="name-asc">Bug Name (A-Z)</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            className="btn-link clear-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}

