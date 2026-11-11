import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-row header-skeleton" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="skeleton-row card-skeleton">
          <div className="skeleton-box skeleton-id" />
          <div className="skeleton-box skeleton-text" />
          <div className="skeleton-box skeleton-badge" />
          <div className="skeleton-box skeleton-date" />
          <div className="skeleton-box skeleton-actions" />
        </div>
      ))}
    </div>
  );
}

