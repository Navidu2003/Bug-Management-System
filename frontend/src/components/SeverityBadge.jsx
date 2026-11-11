import React from 'react';
import { AlertOctagon, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const SEVERITY_CONFIG = {
  Critical: {
    label: 'Critical',
    className: 'badge-critical',
    icon: AlertOctagon,
  },
  High: {
    label: 'High',
    className: 'badge-high',
    icon: AlertTriangle,
  },
  Medium: {
    label: 'Medium',
    className: 'badge-medium',
    icon: AlertCircle,
  },
  Low: {
    label: 'Low',
    className: 'badge-low',
    icon: Info,
  },
};

export default function SeverityBadge({ level, showIcon = true, size = 'sm' }) {
  const config = SEVERITY_CONFIG[level] || {
    label: level || 'Unknown',
    className: 'badge-unknown',
    icon: Info,
  };

  const IconComponent = config.icon;

  return (
    <span className={`badge ${config.className} badge-${size}`}>
      {showIcon && <IconComponent className="badge-icon" size={size === 'lg' ? 16 : 13} />}
      <span className="badge-text">{config.label}</span>
    </span>
  );
}

