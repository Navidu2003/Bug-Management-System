import React from 'react';
import { X, Calendar, Edit3, Trash2, ShieldAlert, FileText, Hash } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import { formatDateTime, getRelativeTime } from '../utils/formatters';

export default function BugDetailModal({ bug, onClose, onEdit, onDelete }) {
  if (!bug) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <span className="bug-id-badge-lg">
              <Hash size={14} />
              {bug.id}
            </span>
            <SeverityBadge level={bug.level} size="lg" />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <h2 className="bug-detail-title">{bug.bugName}</h2>

          <div className="bug-detail-meta">
            <div className="meta-item">
              <Calendar size={15} className="meta-icon" />
              <span className="meta-label">Reported On:</span>
              <span className="meta-value">{formatDateTime(bug.reportDate)}</span>
              <span className="meta-relative">({getRelativeTime(bug.reportDate)})</span>
            </div>
            <div className="meta-item">
              <ShieldAlert size={15} className="meta-icon" />
              <span className="meta-label">Severity Level:</span>
              <span className="meta-value font-semibold">{bug.level}</span>
            </div>
          </div>

          <div className="bug-detail-section">
            <h4 className="section-label">
              <FileText size={15} className="inline-icon" />
              Detailed Description
            </h4>
            <div className="description-box">
              <p className="description-text">{bug.bugDescription}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger-outline"
            onClick={() => {
              onClose();
              onDelete(bug);
            }}
          >
            <Trash2 size={16} />
            <span>Delete Bug</span>
          </button>

          <div className="modal-footer-right">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                onEdit(bug);
              }}
            >
              <Edit3 size={16} />
              <span>Edit Bug</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

