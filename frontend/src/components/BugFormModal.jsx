import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader2, Save, Plus } from 'lucide-react';

const SEVERITY_OPTIONS = [
  { value: 'Low', label: 'Low', desc: 'Minor cosmetic or low priority issue' },
  { value: 'Medium', label: 'Medium', desc: 'Normal issue affecting non-critical workflow' },
  { value: 'High', label: 'High', desc: 'Major malfunction with available workaround' },
  { value: 'Critical', label: 'Critical', desc: 'Severe blocker, crash, or data loss risk' },
];

export default function BugFormModal({ isOpen, mode = 'create', initialBug = null, onClose, onSubmit }) {
  const [bugName, setBugName] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [level, setLevel] = useState('Medium');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Populate or reset form whenever modal opens or initialBug changes
  useEffect(() => {
    if (mode === 'edit' && initialBug) {
      setBugName(initialBug.bugName || '');
      setBugDescription(initialBug.bugDescription || '');
      setLevel(initialBug.level || 'Medium');
    } else {
      setBugName('');
      setBugDescription('');
      setLevel('Medium');
    }
    setErrors({});
    setServerError('');
    setIsSubmitting(false);
  }, [mode, initialBug, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};

    const trimmedName = bugName.trim();
    if (!trimmedName) {
      errs.bugName = 'Bug name is required.';
    } else if (trimmedName.length < 3) {
      errs.bugName = 'Bug name must be at least 3 characters.';
    } else if (trimmedName.length > 150) {
      errs.bugName = 'Bug name cannot exceed 150 characters.';
    }

    const trimmedDesc = bugDescription.trim();
    if (!trimmedDesc) {
      errs.bugDescription = 'Bug description is required.';
    } else if (trimmedDesc.length < 5) {
      errs.bugDescription = 'Bug description must be at least 5 characters.';
    } else if (trimmedDesc.length > 2000) {
      errs.bugDescription = 'Bug description cannot exceed 2000 characters.';
    }

    if (!level) {
      errs.level = 'Please select a severity level.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSubmit({
        bugName: bugName.trim(),
        bugDescription: bugDescription.trim(),
        level,
      });
      onClose();
    } catch (err) {
      setServerError(err.message || 'An error occurred while saving the bug.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEdit = mode === 'edit';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card modal-md" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">
              {isEdit ? `Edit Bug #${initialBug?.id}` : 'Report New Bug'}
            </h3>
            <p className="modal-subtitle">
              {isEdit
                ? 'Update bug details, severity level, and descriptions.'
                : 'Fill in the information below to file a new bug report.'}
            </p>
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

        {/* Server Error Alert */}
        {serverError && (
          <div className="alert alert-danger">
            <AlertCircle size={18} className="alert-icon" />
            <div className="alert-content">{serverError}</div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body form-body">
            {/* Bug Name */}
            <div className="form-group">
              <label htmlFor="bugName" className="form-label">
                Bug Name / Title <span className="text-danger">*</span>
              </label>
              <input
                id="bugName"
                type="text"
                className={`form-input ${errors.bugName ? 'is-invalid' : ''}`}
                placeholder="e.g. Authentication token expiration causes 500 error"
                value={bugName}
                onChange={(e) => {
                  setBugName(e.target.value);
                  if (errors.bugName) setErrors((prev) => ({ ...prev, bugName: null }));
                }}
                maxLength={150}
                disabled={isSubmitting}
                autoFocus
              />
              <div className="form-helper-row">
                {errors.bugName ? (
                  <span className="form-error">{errors.bugName}</span>
                ) : (
                  <span className="form-hint">Brief and clear summary of the bug</span>
                )}
                <span className="char-counter">{bugName.length}/150</span>
              </div>
            </div>

            {/* Severity Level */}
            <div className="form-group">
              <label className="form-label">
                Severity Level <span className="text-danger">*</span>
              </label>
              <div className="severity-selector-grid">
                {SEVERITY_OPTIONS.map((opt) => {
                  const isSelected = level === opt.value;
                  return (
                    <label
                      key={opt.value}
                      className={`severity-option-card opt-${opt.value.toLowerCase()} ${
                        isSelected ? 'is-selected' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="severityLevel"
                        value={opt.value}
                        checked={isSelected}
                        onChange={() => {
                          setLevel(opt.value);
                          if (errors.level) setErrors((prev) => ({ ...prev, level: null }));
                        }}
                        className="sr-only"
                        disabled={isSubmitting}
                      />
                      <div className="opt-indicator" />
                      <div className="opt-text">
                        <span className="opt-title">{opt.label}</span>
                        <span className="opt-desc">{opt.desc}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.level && <span className="form-error">{errors.level}</span>}
            </div>

            {/* Bug Description */}
            <div className="form-group">
              <label htmlFor="bugDescription" className="form-label">
                Detailed Description <span className="text-danger">*</span>
              </label>
              <textarea
                id="bugDescription"
                rows={5}
                className={`form-textarea ${errors.bugDescription ? 'is-invalid' : ''}`}
                placeholder="Provide steps to reproduce, expected vs actual behavior, environment details, or error traces..."
                value={bugDescription}
                onChange={(e) => {
                  setBugDescription(e.target.value);
                  if (errors.bugDescription)
                    setErrors((prev) => ({ ...prev, bugDescription: null }));
                }}
                maxLength={2000}
                disabled={isSubmitting}
              />
              <div className="form-helper-row">
                {errors.bugDescription ? (
                  <span className="form-error">{errors.bugDescription}</span>
                ) : (
                  <span className="form-hint">Detailed steps to help reproduce the issue</span>
                )}
                <span className="char-counter">{bugDescription.length}/2000</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinner" />
                  <span>{isEdit ? 'Saving Changes...' : 'Creating Bug...'}</span>
                </>
              ) : (
                <>
                  {isEdit ? <Save size={16} /> : <Plus size={16} />}
                  <span>{isEdit ? 'Save Changes' : 'Create Bug'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

