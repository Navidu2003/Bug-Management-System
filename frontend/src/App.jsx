import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import BugFilters from './components/BugFilters';
import BugTable from './components/BugTable';
import BugFormModal from './components/BugFormModal';
import BugDetailModal from './components/BugDetailModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import { ToastContainer } from './components/Toast';
import { bugService } from './services/bugService';
import { RefreshCw, AlertCircle, WifiOff } from 'lucide-react';

const SEVERITY_WEIGHT = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [detailBug, setDetailBug] = useState(null);
  const [editingBug, setEditingBug] = useState(null);
  const [deletingBug, setDeletingBug] = useState(null);

  // Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch bugs from API
  const loadBugs = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);
    setError(null);
    try {
      const data = await bugService.getAllBugs();
      setBugs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load bugs:', err);
      setError(
        err.message ||
          'Unable to connect to the ASP.NET Core backend. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBugs(true);
  }, [loadBugs]);

  // View Bug by ID (demonstrating GET /api/bugs/{id})
  const handleViewBug = async (bug) => {
    try {
      // Fetch fresh bug details by ID from backend to fulfill section 4 & 5.5
      const freshBug = await bugService.getBugById(bug.id);
      setDetailBug(freshBug);
    } catch (err) {
      // Fallback to local copy if network error
      setDetailBug(bug);
    }
  };

  // Create Bug handler (POST /api/bugs)
  const handleCreateBug = async (formData) => {
    const newBug = await bugService.createBug(formData);
    addToast(`Bug #${newBug.id} "${newBug.bugName}" created successfully!`, 'success');
    await loadBugs();
  };

  // Update Bug handler (PUT /api/bugs/{id})
  const handleUpdateBug = async (formData) => {
    if (!editingBug) return;
    const updated = await bugService.updateBug(editingBug.id, formData);
    addToast(`Bug #${updated.id} updated successfully!`, 'success');
    await loadBugs();
  };

  // Delete Bug handler (DELETE /api/bugs/{id})
  const handleDeleteBug = async (id) => {
    await bugService.deleteBug(id);
    addToast(`Bug #${id} deleted successfully.`, 'info');
    await loadBugs();
  };

  // Compute severity statistics for badges & navbar
  const counts = useMemo(() => {
    const result = {
      total: bugs.length,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    };
    bugs.forEach((b) => {
      const lvl = (b.level || '').toLowerCase();
      if (result[lvl] !== undefined) {
        result[lvl]++;
      }
    });
    return result;
  }, [bugs]);

  // Filtered & Sorted bugs list
  const filteredBugs = useMemo(() => {
    return bugs
      .filter((bug) => {
        // Severity filter
        if (severityFilter !== 'All' && bug.level !== severityFilter) {
          return false;
        }

        // Search term filter
        if (searchTerm.trim() !== '') {
          const query = searchTerm.toLowerCase();
          const nameMatch = (bug.bugName || '').toLowerCase().includes(query);
          const descMatch = (bug.bugDescription || '').toLowerCase().includes(query);
          const idMatch = String(bug.id).includes(query);
          return nameMatch || descMatch || idMatch;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date-asc':
            return new Date(a.reportDate) - new Date(b.reportDate);
          case 'date-desc':
            return new Date(b.reportDate) - new Date(a.reportDate);
          case 'severity-desc':
            return (SEVERITY_WEIGHT[b.level] || 0) - (SEVERITY_WEIGHT[a.level] || 0);
          case 'severity-asc':
            return (SEVERITY_WEIGHT[a.level] || 0) - (SEVERITY_WEIGHT[b.level] || 0);
          case 'name-asc':
            return (a.bugName || '').localeCompare(b.bugName || '');
          default:
            return 0;
        }
      });
  }, [bugs, severityFilter, searchTerm, sortBy]);

  const isFiltered = searchTerm.trim() !== '' || severityFilter !== 'All';

  return (
    <div className="app-shell">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navigation */}
      <Navbar
        counts={counts}
        onOpenCreate={() => setIsCreateOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-container">
        {/* Connection / Server Error Banner */}
        {error && (
          <div className="connection-error-banner">
            <div className="banner-left">
              <WifiOff size={22} className="banner-icon" />
              <div>
                <h4 className="banner-title">Backend Connection Notice</h4>
                <p className="banner-desc">{error}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => loadBugs(true)}
            >
              <RefreshCw size={14} className="inline-icon" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Filters and Controls */}
        <section className="section-controls">
          <BugFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            severityFilter={severityFilter}
            onSeverityChange={setSeverityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            counts={counts}
          />
        </section>

        {/* Content State: Loading, Empty, or Table */}
        <section className="section-content">
          {loading ? (
            <LoadingSkeleton />
          ) : filteredBugs.length === 0 ? (
            <EmptyState
              isFiltered={isFiltered}
              onResetFilters={() => {
                setSearchTerm('');
                setSeverityFilter('All');
              }}
              onOpenCreate={() => setIsCreateOpen(true)}
            />
          ) : (
            <BugTable
              bugs={filteredBugs}
              onView={(bug) => handleViewBug(bug)}
              onEdit={(bug) => setEditingBug(bug)}
              onDelete={(bug) => setDeletingBug(bug)}
            />
          )}
        </section>
      </main>

      {/* Create Bug Modal (POST) */}
      <BugFormModal
        isOpen={isCreateOpen}
        mode="create"
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateBug}
      />

      {/* Edit Bug Modal (PUT) */}
      <BugFormModal
        isOpen={Boolean(editingBug)}
        mode="edit"
        initialBug={editingBug}
        onClose={() => setEditingBug(null)}
        onSubmit={handleUpdateBug}
      />

      {/* Bug Details Modal (GET single) */}
      <BugDetailModal
        bug={detailBug}
        onClose={() => setDetailBug(null)}
        onEdit={(bug) => setEditingBug(bug)}
        onDelete={(bug) => setDeletingBug(bug)}
      />

      {/* Delete Confirmation Modal (DELETE) */}
      <DeleteConfirmModal
        bug={deletingBug}
        onClose={() => setDeletingBug(null)}
        onConfirm={handleDeleteBug}
      />

      {/* Footer */}
      <footer className="footer-root">
        <div className="footer-container">
          <p className="footer-text">
            <strong>Bug Management System</strong> &bull; ASP.NET Core Web API + EF Core &bull; React.js
          </p>
          <p className="footer-subtext">Intern Technical Assignment Submission</p>
        </div>
      </footer>
    </div>
  );
}

