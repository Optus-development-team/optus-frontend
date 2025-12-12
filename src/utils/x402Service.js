// X402 Payment Service
// Handles crypto and fiat payment processing according to X402 protocol

/**
 * Parse X402 response from base64 or JSON
 * @param {string} response - Base64 encoded or JSON string
 * @returns {object} Parsed X402 payment data
 */
export const parseX402Response = (response) => {
  try {
    // Try to parse as base64
    const decoded = atob(response);
    return JSON.parse(decoded);
  } catch {
    // Already JSON
    return typeof response === 'string' ? JSON.parse(response) : response;
  }
};

/**
 * Create X-PAYMENT header for crypto payment
 * @param {object} authorization - EIP-3009 authorization
 * @param {string} signature - EIP-712 signature
 * @param {string} network - Blockchain network
 * @returns {string} Base64 encoded X-PAYMENT header
 */
export const createXPaymentHeader = (authorization, signature, network) => {
  const payload = {
    x402Version: 1,
    scheme: 'exact',
    network: network,
    payload: {
      signature: signature,
      authorization: authorization
    }
  };
  
  return btoa(JSON.stringify(payload));
};

/**
 * Parse X-PAYMENT-RESPONSE header
 * @param {string} responseHeader - Base64 encoded response
 * @returns {object} Payment settlement result
 */
export const parseXPaymentResponse = (responseHeader) => {
  const decoded = atob(responseHeader);
  return JSON.parse(decoded);
};

/**
 * Generate nonce for EIP-3009
 * @returns {string} 32-byte hex string
 */
export const generateNonce = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return '0x' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Get payment requirements from order
 * @param {object} order - Order data from Supabase
 * @returns {object} X402 formatted payment requirements
 */
export const getPaymentRequirements = (order) => {
  return {
    x402Version: 1,
    resource: order.product_name || 'Product',
    accepts: [
      // Crypto payment option
      {
        type: 'crypto',
        scheme: 'exact',
        network: order.crypto_network || 'avalanche-fuji',
        amountRequired: order.crypto_amount || '0',
        resource: order.product_name || 'Product',
        payTo: order.crypto_payto_address || '',
        asset: order.crypto_asset_address || '',
        maxTimeoutSeconds: 300
      },
      // Fiat payment option
      {
        type: 'fiat',
        currency: order.fiat_currency || 'BOB',
        symbol: order.fiat_symbol || 'Bs.',
        amountRequired: order.fiat_amount || '0',
        resource: order.product_name || 'Product',
        metadata: order.qr_metadata || '' // Base64 QR data
      }
    ]
  };
};

/**
 * Verify crypto payment signature (client-side validation)
 * @param {object} authorization - EIP-3009 authorization
 * @param {string} signature - EIP-712 signature
 * @returns {boolean} Is signature valid format
 */
export const verifyCryptoPaymentFormat = (authorization, signature) => {
  if (!authorization || !signature) return false;
  
  const required = ['from', 'to', 'value', 'validAfter', 'validBefore', 'nonce'];
  const hasAllFields = required.every(field => authorization[field]);
  
  const isValidSignature = signature.startsWith('0x') && signature.length === 132;
  
  return hasAllFields && isValidSignature;
};

/**
 * Format crypto amount for display
 * @param {string} amountInBaseUnits - Amount in token base units
 * @param {number} decimals - Token decimals (default 6 for USDC)
 * @returns {string} Formatted amount
 */
export const formatCryptoAmount = (amountInBaseUnits, decimals = 6) => {
  const amount = parseFloat(amountInBaseUnits) / Math.pow(10, decimals);
  return amount.toFixed(decimals);
};

/**
 * Calculate expiration time for payment
 * @param {number} maxTimeoutSeconds - Maximum timeout in seconds
 * @returns {object} validAfter and validBefore timestamps
 */
export const calculatePaymentExpiration = (maxTimeoutSeconds = 300) => {
  const now = Math.floor(Date.now() / 1000);
  return {
    validAfter: now.toString(),
    validBefore: (now + maxTimeoutSeconds).toString()
  };
};

export default {
  parseX402Response,
  createXPaymentHeader,
  parseXPaymentResponse,
  generateNonce,
  getPaymentRequirements,
  verifyCryptoPaymentFormat,
  formatCryptoAmount,
  calculatePaymentExpiration
};
