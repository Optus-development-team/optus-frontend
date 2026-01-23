export const StepStatus = {
  PENDING: 'PENDING',
  OK: 'OK',
  ERROR: 'ERROR',
};

export const RunStep = {};

export const OrderRun = {};

export const RUN_STEP_KEYS = [
  'product.requested',
  'order.created',
  'payment.verified',
  'po.sent',
  'supplier_payment.initiated',
  'blockchain.tx_confirmed',
  'flow.completed',
];

export const STEP_CONFIG = {
  'product.requested': {
    title: 'Product Requested',
    fields: ['sku', 'qty'],
  },
  'order.created': {
    title: 'Order Created',
    fields: ['order_id', 'status', 'total_amount'],
  },
  'payment.verified': {
    title: 'Payment Verified',
    fields: ['verified_by', 'metadata'],
  },
  'po.sent': {
    title: 'Purchase Order Sent',
    fields: ['po_number', 'total_amount', 'status'],
  },
  'supplier_payment.initiated': {
    title: 'Supplier Payment Initiated',
    fields: ['asset', 'amount', 'network'],
  },
  'blockchain.tx_confirmed': {
    title: 'Blockchain Tx Confirmed',
    fields: ['tx_hash', 'confirmations'],
  },
  'flow.completed': {
    title: 'Flow Completed (Reorder Done)',
    fields: ['message'],
  },
};
