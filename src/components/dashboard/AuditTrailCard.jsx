import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'OK':
      return (
        <i
          className="fas fa-check-circle"
          style={{ color: '#16a34a', fontSize: '1.1rem' }}
        />
      );
    case 'ERROR':
      return (
        <i
          className="fas fa-times-circle"
          style={{ color: '#dc2626', fontSize: '1.1rem' }}
        />
      );
    default:
      return (
        <i
          className="fas fa-circle"
          style={{ color: '#94a3b8', fontSize: '1.1rem' }}
        />
      );
  }
};

/**
 * AuditTrailCard
 *
 * Props (all lifted from Dashboard.jsx via useOrderRun):
 *   runs            – array of built OrderRun objects
 *   selectedRun     – the currently displayed run (or null)
 *   selectedOrderId – the UUID of the selected order
 *   setSelectedOrderId – setter to change the active order
 *   loading         – true while fetching
 *   onRefresh       – callback to re-fetch all runs
 */
export const AuditTrailCard = ({
  runs = [],
  selectedRun = null,
  selectedOrderId = null,
  setSelectedOrderId = () => {},
  loading = false,
  onRefresh = () => {},
}) => {
  // Compute how many steps are OK for the selected run
  const doneSteps = selectedRun?.steps?.filter((s) => s.status === 'OK').length ?? 0;
  const totalSteps = selectedRun?.steps?.length ?? 0;

  return (
    <div className="card-elevated card-audit-trail">
      {/* ── Header ── */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '0.5rem',
                background: 'rgba(139, 92, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <i className="fas fa-history" style={{ color: '#8B5CF6' }}></i>
            </div>
            <h3>Order Run Audit Trail</h3>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn btn-secondary"
            style={{ height: '2rem', width: '2rem', padding: 0 }}
            title="Refresh"
          >
            <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
          </button>
        </div>

        {/* ── Order selector ── */}
        {runs.length > 0 && (
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label
              htmlFor="order-select"
              style={{ fontSize: '0.75rem', opacity: 0.6, whiteSpace: 'nowrap' }}
            >
              Order:
            </label>
            <select
              id="order-select"
              value={selectedOrderId || ''}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              style={{
                flex: 1,
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid rgba(255,255,255,0.3)',
                background: '#ffffff',
                color: '#1E293B',
                fontFamily: 'monospace',
                cursor: 'pointer',
              }}
            >
              {runs.map((r) => {
                const firstStep = r.steps?.[0];
                const label = firstStep?.timestamp
                  ? format(new Date(firstStep.timestamp), 'MMM d HH:mm')
                  : 'Unknown date';
                return (
                  <option key={r.correlation_id} value={r.correlation_id}>
                    {r.correlation_id.slice(0, 8)}… — {label}
                  </option>
                );
              })}
            </select>

            {/* Step progress badge */}
            {selectedRun && (
              <span
                className={doneSteps === totalSteps ? 'badge badge-success' : 'badge badge-info'}
                style={{ fontSize: '0.7rem', whiteSpace: 'nowrap' }}
              >
                {doneSteps}/{totalSteps} steps
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="px-6 pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading-spinner"></div>
          </div>
        ) : !selectedRun ? (
          <div className="text-center py-8" style={{ opacity: 0.6 }}>
            <i
              className="fas fa-clock"
              style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '0.5rem', display: 'block' }}
            ></i>
            <p>No order run found</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {selectedRun.steps.map((step, index) => (
                <div key={step.key} className="relative pl-8">
                  {index !== selectedRun.steps.length - 1 && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '0.5rem',
                        top: '1.5rem',
                        bottom: 0,
                        width: '1px',
                        background: 'var(--color-border)',
                      }}
                    />
                  )}
                  <div className="absolute left-0 top-1">
                    <StatusIcon status={step.status} />
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 500 }}>{step.title}</h4>
                      <span
                        className={`badge ${
                          step.status === 'OK'
                            ? 'badge-success'
                            : step.status === 'ERROR'
                            ? 'badge-danger'
                            : 'badge-info'
                        }`}
                        style={{ fontSize: '0.75rem' }}
                      >
                        {step.status}
                      </span>
                    </div>
                    {step.timestamp && (
                      <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.5rem' }}>
                        {format(new Date(step.timestamp), 'MMM d, HH:mm:ss')}
                      </p>
                    )}
                    <div style={{ fontSize: '0.75rem' }} className="space-y-1">
                      {Object.entries(step.fields).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span style={{ opacity: 0.6 }}>{key}:</span>
                          <span style={{ fontFamily: 'monospace' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};
