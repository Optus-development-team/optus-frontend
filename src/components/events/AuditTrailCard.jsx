import { History, Package, CreditCard, Truck, Wallet, CheckCircle2, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useOrderRun } from '../../hooks/useOrderRun';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import './AuditTrailCard.css';

const getStepIcon = (key) => {
  const icons = {
    'product.requested': Package,
    'order.created': CreditCard,
    'payment.verified': CreditCard,
    'po.sent': Truck,
    'supplier_payment.initiated': Wallet,
    'blockchain.tx_confirmed': ExternalLink,
    'flow.completed': CheckCircle2,
  };
  return icons[key] || Package;
};

const getStatusConfig = (status) => {
  const configs = {
    OK: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      label: 'Completed',
    },
    PENDING: {
      icon: Clock,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      label: 'Pending',
    },
    ERROR: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      label: 'Error',
    },
  };
  return configs[status];
};

const StepItem = ({ step, index, isLast }) => {
  const statusConfig = getStatusConfig(step.status);
  const StepIcon = getStepIcon(step.key);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className="step-item"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div 
          className={cn(
            "timeline-line",
            step.status === 'OK' ? 'timeline-line-success' : 'timeline-line-default'
          )} 
        />
      )}

      {/* Timeline dot */}
      <div className={cn("timeline-dot", statusConfig.bgColor)}>
        <StepIcon className={cn("w-4 h-4", statusConfig.color)} />
      </div>

      <div className={cn(
        "step-card",
        step.status === 'OK' ? 'step-card-success' : 'step-card-default'
      )}>
        <div className="step-header">
          <div className="step-title-group">
            <div className="step-title-wrapper">
              <p className={cn("step-title", statusConfig.color)}>
                {step.title}
              </p>
              <StatusIcon className={cn("w-3.5 h-3.5", statusConfig.color)} />
            </div>
            <p className="step-key">
              {step.key}
            </p>
          </div>
          {step.timestamp && (
            <time className="step-timestamp">
              {format(new Date(step.timestamp), 'HH:mm:ss')}
            </time>
          )}
        </div>

        {/* Step fields */}
        <div className="step-fields-container">
          <div className="step-fields">
            {Object.entries(step.fields).map(([key, value]) => (
              <span key={key} className="step-field">
                <span className="step-field-key">{key}:</span>{' '}
                <span className="step-field-value">{String(value)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuditTrailCard = () => {
  const { runs, selectedRun, selectedOrderId, setSelectedOrderId, loading } = useOrderRun();

  return (
    <Card className="audit-trail-card">
      <CardHeader className="pb-2" style={{ padding: '2rem', paddingBottom: '1.5rem' }}>
        <div className="audit-header" style={{ marginBottom: '0.5rem' }}>
          <div className="audit-title-group" style={{ gap: '1rem' }}>
            <div className="audit-icon">
              <History className="w-4 h-4 text-purple-600" style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <CardTitle className="text-lg" style={{ fontSize: '1.5rem', lineHeight: '1.75', marginBottom: 0, letterSpacing: '-0.02em' }}>Order Run History</CardTitle>
          </div>
          <span className="audit-live-indicator">
            <span className="audit-pulse" />
            Live
          </span>
        </div>

        {/* Order selector */}
        {runs.length > 0 && (
          <div className="audit-selector">
            <Select value={selectedOrderId || ''} onValueChange={setSelectedOrderId}>
              <SelectTrigger className="audit-select-trigger">
                <SelectValue placeholder="Select an order..." />
              </SelectTrigger>
              <SelectContent>
                {runs.map((run) => (
                  <SelectItem key={run.correlation_id} value={run.correlation_id}>
                    <span className="font-mono">Order: {run.correlation_id.slice(0, 8)}...</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent style={{ padding: '2rem', paddingTop: '1rem' }}>
        <ScrollArea className="audit-scroll">
          {loading ? (
            <div className="audit-loading">
              <div className="audit-spinner" />
              <p className="text-sm">Loading runs...</p>
            </div>
          ) : !selectedRun ? (
            <div className="audit-empty">
              <History className="w-12 h-12 mb-2 opacity-20" />
              <p className="text-sm">No orders yet</p>
              <p className="text-xs">Simulate a sale to see the run history</p>
            </div>
          ) : (
            <div className="audit-timeline">
              {selectedRun.steps.map((step, index) => (
                <StepItem
                  key={step.key}
                  step={step}
                  index={index}
                  isLast={index === selectedRun.steps.length - 1}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
