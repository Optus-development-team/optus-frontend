import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toUpperCase() || 'UNKNOWN';
  const badgeClass = {
    CREATED: 'badge-info',
    PENDING: 'badge-info',
    APPROVED: 'badge-success',
    FULFILLED: 'badge-success',
    CONFIRMED: 'badge-success',
    PAID: 'badge-success',
    DRAFT: 'badge-info',
    SENT: 'badge-success',
    FAILED: 'badge-danger',
    CANCELLED: 'badge-danger',
  };

  return <span className={`badge ${badgeClass[normalizedStatus] || 'badge-info'}`}>{status}</span>;
};

const EmptyState = ({ iconClass, text }) => (
  <div className="flex items-center gap-3 p-4" style={{
    background: 'rgba(var(--color-secondary-rgb), 0.3)',
    borderRadius: '0.5rem'
  }}>
    <div style={{
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '50%',
      background: 'var(--color-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <i className={iconClass} style={{ opacity: 0.5 }}></i>
    </div>
    <div>
      <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>{text}</p>
      <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Waiting for trigger...</p>
    </div>
  </div>
);

export const ProcurementPaymentsCard = ({ procurement = {} }) => {
  const { procurement_request, purchase_order, supplier_payment } = procurement;

  return (
    <div className="card-elevated" style={{ height: '100%' }}>
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.5rem',
              background: 'rgba(249, 115, 22, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-file-invoice-dollar" style={{ color: '#F97316' }}></i>
            </div>
            <h3>Procurement & Payments</h3>
          </div>
          <div className="live-indicator">
            <span className="live-indicator-dot"></span>
            Live
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 space-y-4">
        {/* Procurement Request */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.7, marginBottom: '0.5rem' }} className="flex items-center gap-2">
            <i className="fas fa-clipboard-list"></i>
            Procurement Request
          </h4>
          {procurement_request ? (
            <div className="p-4" style={{
              background: 'rgba(var(--color-secondary-rgb), 0.3)',
              borderRadius: '0.5rem',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 500 }}>{procurement_request.id}</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }} className="flex items-center gap-1">
                    <i className="fas fa-clock" style={{ fontSize: '0.75rem' }}></i>
                    {format(new Date(procurement_request.created_at), 'MMM d, HH:mm')}
                  </p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }}>
                    Qty: {procurement_request.requested_qty} | Reorder: {procurement_request.reorder_point}
                  </p>
                </div>
                <StatusBadge status={procurement_request.status} />
              </div>
            </div>
          ) : (
            <EmptyState iconClass="fas fa-clipboard-list" text="No active procurement request" />
          )}
        </div>

        <Separator />

        {/* Purchase Order */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.7, marginBottom: '0.5rem' }} className="flex items-center gap-2">
            <i className="fas fa-truck"></i>
            Purchase Order
          </h4>
          {purchase_order ? (
            <div className="p-4" style={{
              background: 'rgba(var(--color-secondary-rgb), 0.3)',
              borderRadius: '0.5rem',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 500 }}>{purchase_order.po_number || purchase_order.id}</p>
                <StatusBadge status={purchase_order.status} />
              </div>
              <div className="grid grid-cols-2 gap-2" style={{ fontSize: '0.875rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Supplier</p>
                  <p style={{ fontWeight: 500 }}>{purchase_order.supplier_name || 'Unknown'}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Total</p>
                  <p style={{ fontWeight: 500, color: 'var(--color-primary)' }}>
                    ${purchase_order.total_amount?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState iconClass="fas fa-truck" text="No active purchase order" />
          )}
        </div>

        <Separator />

        {/* Supplier Payment */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.7, marginBottom: '0.5rem' }} className="flex items-center gap-2">
            <i className="fas fa-wallet"></i>
            Supplier Payment
          </h4>
          {supplier_payment ? (
            <div className="p-4" style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '0.5rem',
              animation: 'fadeIn 0.3s ease-in'
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    ${supplier_payment.amount?.toFixed(2) || '0.00'}
                  </span>
                  <span className="badge badge-info" style={{ borderColor: 'var(--color-accent)' }}>
                    {supplier_payment.currency || 'USDC'}
                  </span>
                </div>
                <StatusBadge status={supplier_payment.status} />
              </div>
              {supplier_payment.tx_hash && (
                <div className="flex items-center gap-2 p-2" style={{
                  background: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.25rem'
                }}>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>TX:</span>
                  <code style={{ fontSize: '0.75rem', fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {supplier_payment.tx_hash}
                  </code>
                  <a
                    href={`https://etherscan.io/tx/${supplier_payment.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-primary)', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <EmptyState iconClass="fas fa-wallet" text="No supplier payment recorded" />
          )}
        </div>
      </div>
    </div>
  );
};
