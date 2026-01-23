import { useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import './SimulateSaleCard.css';

export const SimulateSaleCard = ({ products, onSimulateSale }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    setLoading(true);
    try {
      await onSimulateSale(selectedProduct, parseInt(quantity, 10));
      setQuantity('1');
    } finally {
      setLoading(false);
    }
  };

  const availableProducts = products.filter(p => p.is_available);

  return (
    <Card className="simulate-sale-card">
      <CardHeader className="pb-2" style={{ padding: '2rem', paddingBottom: '1.5rem' }}>
        <div className="simulate-sale-header" style={{ gap: '1rem', marginBottom: '0.5rem' }}>
          <div className="simulate-sale-icon">
            <MessageCircle className="w-4 h-4 text-green-600" style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <CardTitle className="text-lg" style={{ fontSize: '1.5rem', lineHeight: '1.75', marginBottom: 0, letterSpacing: '-0.02em' }}>Simulate WhatsApp Sale</CardTitle>
        </div>
      </CardHeader>
      <CardContent style={{ padding: '2rem', paddingTop: '1rem' }}>
        <form onSubmit={handleSubmit} className="simulate-sale-form">
          <div className="form-group">
            <Label htmlFor="product">Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {availableProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="product-option">
                      <span>{product.name}</span>
                      <span className="product-stock">
                        Stock: {product.current_stock}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="form-group">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>

          <Button
            type="submit"
            className="submit-button"
            size="lg"
            disabled={!selectedProduct || !quantity || loading}
            style={{ color: 'white' }}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Send className="w-5 h-5 mr-2" />
            )}
            Send WhatsApp Order
          </Button>
        </form>

        <div className="simulate-sale-info">
          <p className="info-text">
            This simulates a customer placing an order via WhatsApp. 
            Watch the timeline and stock update in real-time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
