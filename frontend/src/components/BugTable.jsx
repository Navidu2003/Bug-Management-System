import React from 'react';
import { Eye, Edit3, Trash2, Calendar, FileText } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import { formatDateTime, getRelativeTime } from '../utils/formatters';

export default function BugTable({ bugs, onView, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="bug-table">
        <thead>
          <tr>
            <th className="th-id">ID</th>
            <th className="th-title">Bug Name & Description</th>
            <th className="th-severity">Severity</th>
            <th className="th-date">Report Date</th>
            <th className="th-actions text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id} className="bug-row">
              <td className="td-id">
                <span className="bug-id-badge" title={`Bug ID: #${bug.id}`}>
                  #{bug.id}
                </span>
              </td>
              <td className="td-title">
                <div className="bug-title-container">
                  <button
                    type="button"
                    className="bug-title-link"
                    onClick={() => onView(bug)}
                    title="Click to view details"
                  >
                    {bug.bugName}
                  </button>
                  <p className="bug-desc-snippet" title={bug.bugDescription}>
                    {bug.bugDescription}
                  </p>
                </div>
              </td>
              <td className="td-severity">
                <SeverityBadge level={bug.level} />
              </td>
              <td className="td-date">
                <div className="date-stack">
                  <span className="date-main">{formatDateTime(bug.reportDate)}</span>
                  <span className="date-relative">{getRelativeTime(bug.reportDate)}</span>
                </div>
              </td>
              <td className="td-actions text-right">
                <div className="action-buttons-group">
                  <button
                    type="button"
                    className="action-btn action-view"
                    onClick={() => onView(bug)}
                    title="View Bug Details"
                    aria-label={`View bug #${bug.id}`}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    className="action-btn action-edit"
                    onClick={() => onEdit(bug)}
                    title="Edit Bug"
                    aria-label={`Edit bug #${bug.id}`}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    type="button"
                    className="action-btn action-delete"
                    onClick={() => onDelete(bug)}
                    title="Delete Bug"
                    aria-label={`Delete bug #${bug.id}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card View for responsive screen sizes */}
      <div className="bug-mobile-list">
        {bugs.map((bug) => (
          <div key={bug.id} className="bug-mobile-card">
            <div className="mobile-card-header">
              <span className="bug-id-badge">#{bug.id}</span>
              <SeverityBadge level={bug.level} />
            </div>

            <button
              type="button"
              className="bug-title-link"
              onClick={() => onView(bug)}
            >
              {bug.bugName}
            </button>

            <p className="bug-desc-snippet">{bug.bugDescription}</p>

            <div className="mobile-card-footer">
              <span className="mobile-date">
                <Calendar size={13} className="inline-icon" />
                {formatDateTime(bug.reportDate)}
              </span>

              <div className="action-buttons-group">
                <button
                  type="button"
                  className="action-btn action-view"
                  onClick={() => onView(bug)}
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  type="button"
                  className="action-btn action-edit"
                  onClick={() => onEdit(bug)}
                  title="Edit"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  type="button"
                  className="action-btn action-delete"
                  onClick={() => onDelete(bug)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

