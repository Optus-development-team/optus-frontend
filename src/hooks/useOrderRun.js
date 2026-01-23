import { useState, useEffect, useCallback, useRef } from 'react';
import { eventsSupabase, DEMO_COMPANY_ID } from '../utils/eventsSupabase';
import { STEP_CONFIG } from '../types/runHistory';

export const useOrderRun = () => {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const channelRef = useRef(null);

  const buildRunFromOrder = useCallback(async (orderId) => {
    try {
      // Fetch order with items
      const { data: order, error: orderError } = await eventsSupabase
        .from('orders')
        .select(`
          id, status, total_amount, created_at,
          order_items(quantity, products(sku, name))
        `)
        .eq('id', orderId)
        .eq('company_id', DEMO_COMPANY_ID)
        .maybeSingle();

      if (orderError || !order) return null;

      // Fetch payment
      const { data: payment } = await eventsSupabase
        .from('payments')
        .select('order_id, status, verified_at, provider_ref')
        .eq('order_id', orderId)
        .maybeSingle();

      // Fetch procurement request triggered by stock movement for this order
      const { data: stockMovementOut } = await eventsSupabase
        .from('stock_movements')
        .select('id, created_at')
        .eq('ref_order_id', orderId)
        .eq('movement_type', 'OUT')
        .maybeSingle();

      // Fetch purchase order (linked through procurement_request)
      let purchaseOrder = null;
      let supplierPayment = null;
      let stockMovementIn = null;

      if (stockMovementOut) {
        // Get latest procurement request
        const { data: procReq } = await eventsSupabase
          .from('procurement_requests')
          .select('id')
          .eq('company_id', DEMO_COMPANY_ID)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (procReq) {
          // Get PO for this procurement request
          const { data: po } = await eventsSupabase
            .from('purchase_orders')
            .select('id, po_number, total_amount, status, created_at, procurement_request_id')
            .eq('procurement_request_id', procReq.id)
            .maybeSingle();

          if (po) {
            purchaseOrder = po;

            // Get supplier payment for this PO
            const { data: sp } = await eventsSupabase
              .from('supplier_payments')
              .select('id, status, amount, currency, tx_hash, created_at')
              .eq('purchase_order_id', po.id)
              .maybeSingle();

            supplierPayment = sp;

            // Get stock movement IN for this PO
            const { data: smIn } = await eventsSupabase
              .from('stock_movements')
              .select('id, movement_type, quantity, ref_order_id, ref_purchase_order_id, created_at')
              .eq('ref_purchase_order_id', po.id)
              .eq('movement_type', 'IN')
              .maybeSingle();

            stockMovementIn = smIn;
          }
        }
      }

      // Build steps
      const steps = [];
      const orderItems = order.order_items || [];
      const firstItem = orderItems[0];
      const firstItemProduct = firstItem?.products?.[0];

      // 1. Product Requested
      steps.push({
        key: 'product.requested',
        title: STEP_CONFIG['product.requested'].title,
        status: orderItems.length > 0 ? 'OK' : 'PENDING',
        timestamp: order.created_at,
        fields: {
          sku: firstItemProduct?.sku || '-',
          qty: firstItem?.quantity || 0,
        },
      });

      // 2. Order Created
      steps.push({
        key: 'order.created',
        title: STEP_CONFIG['order.created'].title,
        status: order.status ? 'OK' : 'PENDING',
        timestamp: order.created_at,
        fields: {
          order_id: order.id.slice(0, 8),
          status: order.status,
          total_amount: order.total_amount,
        },
      });

      // 3. Payment Verified
      const paymentVerified = payment?.status === 'verified';
      steps.push({
        key: 'payment.verified',
        title: STEP_CONFIG['payment.verified'].title,
        status: paymentVerified ? 'OK' : (payment ? 'PENDING' : 'PENDING'),
        timestamp: payment?.verified_at || undefined,
        fields: {
          verified_by: paymentVerified ? 'system' : '-',
          metadata: payment?.provider_ref || '-',
        },
      });

      // 4. Purchase Order Sent
      const poSent = purchaseOrder?.status === 'SENT' || purchaseOrder?.status === 'DELIVERED';
      steps.push({
        key: 'po.sent',
        title: STEP_CONFIG['po.sent'].title,
        status: poSent ? 'OK' : (purchaseOrder ? 'PENDING' : 'PENDING'),
        timestamp: purchaseOrder?.created_at || undefined,
        fields: {
          po_number: purchaseOrder?.po_number || '-',
          total_amount: purchaseOrder?.total_amount || 0,
          status: purchaseOrder?.status || 'PENDING',
        },
      });

      // 5. Supplier Payment Initiated
      const paymentInitiated = supplierPayment && ['pending', 'confirmed', 'CONFIRMED'].includes(supplierPayment.status);
      steps.push({
        key: 'supplier_payment.initiated',
        title: STEP_CONFIG['supplier_payment.initiated'].title,
        status: paymentInitiated ? 'OK' : 'PENDING',
        timestamp: supplierPayment?.created_at || undefined,
        fields: {
          asset: supplierPayment?.currency || 'USDC',
          amount: supplierPayment?.amount || 0,
          network: 'Stellar',
        },
      });

      // 6. Blockchain Tx Confirmed
      const txConfirmed = supplierPayment?.tx_hash && supplierPayment.status === 'CONFIRMED';
      steps.push({
        key: 'blockchain.tx_confirmed',
        title: STEP_CONFIG['blockchain.tx_confirmed'].title,
        status: txConfirmed ? 'OK' : 'PENDING',
        timestamp: txConfirmed ? supplierPayment?.created_at : undefined,
        fields: {
          tx_hash: supplierPayment?.tx_hash ? `${supplierPayment.tx_hash.slice(0, 12)}...` : '-',
          confirmations: txConfirmed ? 1 : 0,
        },
      });

      // 7. Flow Completed
      const flowCompleted = stockMovementIn !== null;
      steps.push({
        key: 'flow.completed',
        title: STEP_CONFIG['flow.completed'].title,
        status: flowCompleted ? 'OK' : 'PENDING',
        timestamp: stockMovementIn?.created_at || undefined,
        fields: {
          message: flowCompleted ? 'Stock replenished successfully' : 'Awaiting stock replenishment',
        },
      });

      return {
        correlation_id: orderId,
        steps,
      };
    } catch (error) {
      console.error('Error building run:', error);
      return null;
    }
  }, []);

  const fetchRuns = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get recent orders
      const { data: orders, error } = await eventsSupabase
        .from('orders')
        .select('id')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const runPromises = (orders || []).map(o => buildRunFromOrder(o.id));
      const builtRuns = await Promise.all(runPromises);
      
      setRuns(builtRuns.filter(r => r !== null));
      
      // Auto-select first order if none selected
      if (!selectedOrderId && orders && orders.length > 0) {
        setSelectedOrderId(orders[0].id);
      }
    } catch (error) {
      console.error('Error fetching runs:', error);
    } finally {
      setLoading(false);
    }
  }, [buildRunFromOrder, selectedOrderId]);

  const refreshSelectedRun = useCallback(async () => {
    if (!selectedOrderId) return;
    
    const updatedRun = await buildRunFromOrder(selectedOrderId);
    if (updatedRun) {
      setRuns(prev => prev.map(r => 
        r.correlation_id === selectedOrderId ? updatedRun : r
      ));
    }
  }, [selectedOrderId, buildRunFromOrder]);

  // Setup realtime subscriptions
  useEffect(() => {
    const channel = eventsSupabase
      .channel('order-run-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'orders', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => { fetchRuns(); }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'payments' },
        () => { refreshSelectedRun(); }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'purchase_orders', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => { refreshSelectedRun(); }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'supplier_payments', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => { refreshSelectedRun(); }
      )
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'stock_movements', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => { refreshSelectedRun(); }
      )
      .subscribe();

    channelRef.current = channel;
    fetchRuns();

    return () => {
      if (channelRef.current) {
        eventsSupabase.removeChannel(channelRef.current);
      }
    };
  }, [fetchRuns, refreshSelectedRun]);

  const selectedRun = runs.find(r => r.correlation_id === selectedOrderId) || null;

  return {
    runs,
    selectedRun,
    selectedOrderId,
    setSelectedOrderId,
    loading,
    refresh: fetchRuns,
  };
};
