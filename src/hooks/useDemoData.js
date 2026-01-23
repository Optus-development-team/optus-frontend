import { useState, useEffect, useCallback, useRef } from 'react';
import { eventsSupabase, DEMO_COMPANY_ID, DEMO_USER_ID } from '../utils/eventsSupabase';
import { useToast } from './use-toast';

export const useDemoData = () => {
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [procurement, setProcurement] = useState({
    procurement_request: null,
    purchase_order: null,
    supplier_payment: null,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const channelRef = useRef(null);

  // Fetch products with inventory policies for reorder_point
  const fetchProducts = useCallback(async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await eventsSupabase
        .from('products')
        .select('id, company_id, sku, name, price, stock_quantity, is_available')
        .eq('company_id', DEMO_COMPANY_ID);

      if (productsError) throw productsError;

      // Fetch supply items to map product_id -> supply_item_id
      const { data: supplyItems, error: supplyError } = await eventsSupabase
        .from('supply_items')
        .select('id, product_id')
        .eq('company_id', DEMO_COMPANY_ID);

      if (supplyError) throw supplyError;

      // Fetch inventory policies for reorder points
      const supplyItemIds = supplyItems?.map(si => si.id) || [];
      let policiesMap = {};
      
      if (supplyItemIds.length > 0) {
        const { data: policies, error: policiesError } = await eventsSupabase
          .from('inventory_policies')
          .select('supply_item_id, reorder_point')
          .in('supply_item_id', supplyItemIds);

        if (!policiesError && policies) {
          // Map supply_item_id -> reorder_point
          const supplyToProduct = {};
          supplyItems?.forEach(si => {
            supplyToProduct[si.id] = si.product_id;
          });
          
          policies.forEach(p => {
            const productId = supplyToProduct[p.supply_item_id];
            if (productId) {
              policiesMap[productId] = p.reorder_point;
            }
          });
        }
      }

      // Map to display format
      const displayProducts = (productsData || []).map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        current_stock: p.stock_quantity,
        reorder_point: policiesMap[p.id] || 10, // Default reorder point
        price: p.price,
        is_available: p.is_available
      }));

      setProducts(displayProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products from database',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Build events from multiple tables
  const fetchEvents = useCallback(async () => {
    try {
      const events = [];

      // Fetch orders
      const { data: orders } = await eventsSupabase
        .from('orders')
        .select('id, status, total_amount, created_at')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      orders?.forEach(o => {
        events.push({
          id: `order_${o.id}`,
          type: 'ORDER_CREATED',
          timestamp: o.created_at,
          entity: 'order',
          entity_id: o.id,
          meta: { status: o.status, amount: o.total_amount }
        });
      });

      // Fetch payments
      const { data: payments } = await eventsSupabase
        .from('payments')
        .select('order_id, status, amount, currency, verified_at')
        .eq('status', 'verified')
        .limit(10);

      payments?.forEach(p => {
        if (p.verified_at) {
          events.push({
            id: `payment_${p.order_id}`,
            type: 'PAYMENT_VERIFIED',
            timestamp: p.verified_at,
            entity: 'payment',
            entity_id: p.order_id,
            meta: { amount: p.amount, currency: p.currency }
          });
        }
      });

      // Fetch stock movements
      const { data: movements } = await eventsSupabase
        .from('stock_movements')
        .select('id, movement_type, quantity, ref_order_id, ref_purchase_order_id, created_at')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      movements?.forEach(m => {
        const eventType = m.movement_type === 'OUT' ? 'STOCK_MOVEMENT_OUT' : 'STOCK_MOVEMENT_IN';
        events.push({
          id: `sm_${m.id}`,
          type: eventType,
          timestamp: m.created_at,
          entity: 'stock_movement',
          entity_id: m.id,
          meta: { 
            qty: m.quantity, 
            order_id: m.ref_order_id,
            po_id: m.ref_purchase_order_id
          }
        });
      });

      // Fetch procurement requests
      const { data: procReqs } = await eventsSupabase
        .from('procurement_requests')
        .select('id, status, requested_qty, created_at')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      procReqs?.forEach(pr => {
        events.push({
          id: `pr_${pr.id}`,
          type: 'PROCUREMENT_REQUEST_CREATED',
          timestamp: pr.created_at,
          entity: 'procurement_request',
          entity_id: pr.id,
          meta: { status: pr.status, qty: pr.requested_qty }
        });
      });

      // Fetch purchase orders
      const { data: pos } = await eventsSupabase
        .from('purchase_orders')
        .select('id, status, po_number, total_amount, created_at')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      pos?.forEach(po => {
        events.push({
          id: `po_${po.id}`,
          type: 'PURCHASE_ORDER_CREATED',
          timestamp: po.created_at,
          entity: 'purchase_order',
          entity_id: po.po_number || po.id,
          meta: { status: po.status, amount: po.total_amount }
        });
      });

      // Fetch supplier payments
      const { data: sPayments } = await eventsSupabase
        .from('supplier_payments')
        .select('id, status, amount, currency, tx_hash, created_at')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(10);

      sPayments?.forEach(sp => {
        events.push({
          id: `sp_${sp.id}`,
          type: 'SUPPLIER_PAYMENT_CREATED',
          timestamp: sp.created_at,
          entity: 'supplier_payment',
          entity_id: sp.id,
          meta: { amount: sp.amount, currency: sp.currency, tx_hash: sp.tx_hash }
        });
      });

      // Sort all events by timestamp descending
      events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setEvents(events.slice(0, 20));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  // Fetch procurement bundle
  const fetchProcurement = useCallback(async () => {
    try {
      // Fetch latest procurement request
      const { data: prData } = await eventsSupabase
        .from('procurement_requests')
        .select('*')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Fetch latest purchase order with supplier info
      const { data: poData } = await eventsSupabase
        .from('purchase_orders')
        .select('*, suppliers(name)')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      // Fetch latest supplier payment
      const { data: spData } = await eventsSupabase
        .from('supplier_payments')
        .select('*')
        .eq('company_id', DEMO_COMPANY_ID)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      setProcurement({
        procurement_request: prData,
        purchase_order: poData ? {
          ...poData,
          supplier_name: poData.suppliers?.name || 'Unknown Supplier'
        } : null,
        supplier_payment: spData,
      });
    } catch (error) {
      console.error('Error fetching procurement:', error);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchProducts(), fetchEvents(), fetchProcurement()]);
    setLoading(false);
  }, [fetchProducts, fetchEvents, fetchProcurement]);

  // Simulate sale - calls the backend API
  const simulateSale = async (productId, quantity) => {
    try {
      const response = await fetch('/api/demo/simulate-sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: DEMO_COMPANY_ID,
          user_id: DEMO_USER_ID,
          product_id: productId,
          qty: quantity,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'API call failed');
      }
      
      const result = await response.json();
      toast({
        title: 'Order Created',
        description: `Order ${result.order_id} created successfully${result.triggered_reorder ? ' – Reorder triggered!' : ''}`,
      });
      
      // Refetch all data after sale
      await fetchAll();
      return result;
    } catch (error) {
      console.error('Error simulating sale:', error);
      toast({
        title: 'API Error',
        description: error instanceof Error ? error.message : 'Failed to simulate sale',
        variant: 'destructive',
      });
      return null;
    }
  };

  // Setup real-time subscriptions
  useEffect(() => {
    // Create a single channel for all subscriptions
    const channel = eventsSupabase
      .channel('demo-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Orders changed, refreshing...');
          fetchEvents();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'payments' },
        () => {
          console.log('Payments changed, refreshing...');
          fetchEvents();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stock_movements', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Stock movements changed, refreshing...');
          fetchProducts();
          fetchEvents();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'procurement_requests', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Procurement requests changed, refreshing...');
          fetchEvents();
          fetchProcurement();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'purchase_orders', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Purchase orders changed, refreshing...');
          fetchEvents();
          fetchProcurement();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'supplier_payments', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Supplier payments changed, refreshing...');
          fetchEvents();
          fetchProcurement();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products', filter: `company_id=eq.${DEMO_COMPANY_ID}` },
        () => {
          console.log('Products changed, refreshing...');
          fetchProducts();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    channelRef.current = channel;

    // Initial fetch
    fetchAll();

    return () => {
      if (channelRef.current) {
        eventsSupabase.removeChannel(channelRef.current);
      }
    };
  }, [fetchAll, fetchProducts, fetchEvents, fetchProcurement]);

  return {
    products,
    events,
    procurement,
    loading,
    simulateSale,
    refresh: fetchAll,
    refreshProducts: fetchProducts,
  };
};
