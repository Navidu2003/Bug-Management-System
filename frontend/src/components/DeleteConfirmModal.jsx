import React, { useState } from 'react';
import { AlertTriangle, Trash2, Loader2, X } from 'lucide-react';

export default function DeleteConfirmModal({ bug, onClose, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  if (!bug) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      await onConfirm(bug.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete the bug.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="delete-modal-icon-badge">
            <AlertTriangle size={24} className="text-danger" />
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body delete-modal-body">
          <h3 className="delete-modal-title">Delete Bug Report?</h3>
          <p className="delete-modal-text">
            Are you sure you want to permanently delete bug{' '}
            <strong className="delete-highlight">#{bug.id}: "{bug.bugName}"</strong>?
          </p>
          <p className="delete-subtext">
            This action cannot be undone. All recorded information for this bug will be permanently removed.
          </p>

          {error && (
            <div className="alert alert-danger mt-3">
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isDeleting}
            id="confirm-delete-button"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="spinner" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={16} />
                <span>Yes, Delete Bug</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

