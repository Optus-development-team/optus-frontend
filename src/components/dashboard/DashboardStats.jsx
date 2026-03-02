/**
 * DashboardStats
 * Quick-glance KPI row shown at the top of the dashboard.
 * All data is derived from props — no fetching here.
 */
export const DashboardStats = ({ products = [], runs = [], loading = false }) => {
  const totalProducts = products.length;
  const lowStockCount = products.filter(
    (p) => p.current_stock <= p.reorder_point
  ).length;
  const totalOrders = runs.length;

  // Derive latest order status from the most recent run's last step
  const latestRun = runs[0];
  const lastStep = latestRun?.steps?.at(-1);
  const latestStatus =
    lastStep?.status === 'OK' ? 'Completed' : 'In Progress';

  const stats = [
    {
      icon: 'fa-boxes',
      label: 'Total Products',
      value: loading ? '—' : totalProducts,
      color: 'var(--color-accent)',
      bg: 'rgba(6, 182, 212, 0.1)',
    },
    {
      icon: 'fa-exclamation-triangle',
      label: 'Low Stock',
      value: loading ? '—' : lowStockCount,
      color: lowStockCount > 0 ? 'var(--color-danger)' : 'var(--color-success)',
      bg:
        lowStockCount > 0
          ? 'rgba(239, 68, 68, 0.1)'
          : 'rgba(34, 197, 94, 0.1)',
    },
    {
      icon: 'fa-receipt',
      label: 'Tracked Orders',
      value: loading ? '—' : totalOrders,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.1)',
    },
    {
      icon: 'fa-circle-notch',
      label: 'Latest Order',
      value: loading ? '—' : latestRun ? latestStatus : 'N/A',
      color:
        !latestRun || loading
          ? 'var(--color-text-muted, #9CA3AF)'
          : lastStep?.status === 'OK'
          ? 'var(--color-success)'
          : '#F59E0B',
      bg:
        !latestRun || loading
          ? 'rgba(156, 163, 175, 0.1)'
          : lastStep?.status === 'OK'
          ? 'rgba(34, 197, 94, 0.1)'
          : 'rgba(245, 158, 11, 0.1)',
    },
  ];

  return (
    <div
      className="dashboard-stats-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="card-elevated"
          style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '0.5rem',
              background: s.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <i className={`fas ${s.icon}`} style={{ color: s.color }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: '0.75rem',
                opacity: 0.6,
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {s.label}
            </p>
            <p
              style={{
                fontSize: '1.375rem',
                fontWeight: 700,
                margin: 0,
                color: s.color,
                lineHeight: 1.2,
              }}
            >
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
