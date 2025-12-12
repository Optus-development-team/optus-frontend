import { supabase } from './supabaseClient';

/**
 * Get order by code
 * @param {string} orderCode - Unique order code
 * @returns {object} Order data with payment requirements
 */
export const getOrderByCode = async (orderCode) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_code', orderCode)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Create new order
 * @param {object} orderData - Order information
 * @returns {object} Created order
 */
export const createOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_code: orderData.order_code,
        user_email: orderData.user_email,
        user_name: orderData.user_name,
        product_name: orderData.product_name,
        product_description: orderData.product_description,
        product_image_url: orderData.product_image_url,
        product_glosa: orderData.product_glosa,
        
        // Crypto payment info
        crypto_network: orderData.crypto_network,
        crypto_amount: orderData.crypto_amount,
        crypto_payto_address: orderData.crypto_payto_address,
        crypto_asset_address: orderData.crypto_asset_address,
        crypto_max_timeout: orderData.crypto_max_timeout || 300,
        
        // Fiat payment info
        fiat_currency: orderData.fiat_currency,
        fiat_symbol: orderData.fiat_symbol,
        fiat_amount: orderData.fiat_amount,
        qr_metadata: orderData.qr_metadata, // Base64 QR data
        
        // Order status
        status: 'pending',
        payment_type: null, // Will be 'crypto' or 'fiat'
        transaction_hash: null,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating order:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update order with payment info
 * @param {string} orderCode - Order code
 * @param {object} paymentData - Payment information
 * @returns {object} Updated order
 */
export const updateOrderPayment = async (orderCode, paymentData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        payment_type: paymentData.payment_type, // 'crypto' or 'fiat'
        transaction_hash: paymentData.transaction_hash,
        payment_network: paymentData.payment_network,
        payer_address: paymentData.payer_address,
        status: paymentData.status || 'processing',
        payment_response: paymentData.payment_response, // X-PAYMENT-RESPONSE data
        paid_at: new Date().toISOString()
      })
      .eq('order_code', orderCode)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating order payment:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Update order status
 * @param {string} orderCode - Order code
 * @param {string} status - New status (pending, processing, completed, failed)
 * @returns {object} Updated order
 */
export const updateOrderStatus = async (orderCode, status) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('order_code', orderCode)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get orders by user email
 * @param {string} email - User email
 * @returns {array} List of orders
 */
export const getOrdersByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Verify payment on blockchain (placeholder - implement with actual blockchain query)
 * @param {string} transactionHash - Transaction hash
 * @param {string} network - Blockchain network
 * @returns {object} Verification result
 */
export const verifyPaymentOnChain = async (transactionHash, network) => {
  // TODO: Implement actual blockchain verification
  // This would query the blockchain to verify the transaction
  console.log(`Verifying transaction ${transactionHash} on ${network}`);
  
  return {
    verified: true,
    transactionHash: transactionHash,
    network: network,
    timestamp: new Date().toISOString()
  };
};

export default {
  getOrderByCode,
  createOrder,
  updateOrderPayment,
  updateOrderStatus,
  getOrdersByEmail,
  verifyPaymentOnChain
};
