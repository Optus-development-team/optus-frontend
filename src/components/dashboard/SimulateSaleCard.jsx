import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SimulateSaleCard = ({ products = [], onSimulateSale }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || quantity < 1) return;

    setSubmitting(true);
    try {
      await onSimulateSale(selectedProduct, quantity);
      // Reset form
      setSelectedProduct('');
      setQuantity(1);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card-elevated">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2">
          <div style={{
            width: '2rem',
            height: '2rem',
            borderRadius: '0.5rem',
            background: 'rgba(37, 211, 102, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
          </div>
          <h3>Simulate WhatsApp Sale</h3>
        </div>
      </div>
      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="product" className="dashboard-label">Product</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger id="product" className="dashboard-select">
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity" className="dashboard-label">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              placeholder="Enter quantity"
              className="dashboard-input"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedProduct || quantity < 1 || submitting}
            className="btn btn-whatsapp btn-icon"
            style={{ width: '100%' }}
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fab fa-whatsapp" style={{ marginRight: '0.5rem' }}></i>
                Simulate WhatsApp Order
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
