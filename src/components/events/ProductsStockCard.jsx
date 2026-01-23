import { Package, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import './ProductsStockCard.css';

export const ProductsStockCard = ({ products, loading, onRefresh }) => {
  const getStockStatus = (current, reorderPoint) => {
    if (current <= reorderPoint) {
      return { label: 'REORDER', variant: 'destructive', icon: AlertTriangle };
    }
    return { label: 'OK', variant: 'default', icon: CheckCircle };
  };

  return (
    <Card className="products-stock-card">
      <CardHeader className="products-stock-header" style={{ padding: '2rem 2rem 1rem 2rem' }}>
        <div className="products-stock-title-group" style={{ gap: '1rem' }}>
          <div className="products-stock-icon">
            <Package className="w-4 h-4 text-blue-600" style={{ width: '1.25rem', height: '1.25rem' }} />
          </div>
          <CardTitle className="text-lg" style={{ fontSize: '1.5rem', lineHeight: '1.75', marginBottom: 0, letterSpacing: '-0.02em' }}>Products & Stock</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent style={{ padding: '0 2rem 2rem 2rem' }}>
        <div className="products-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Reorder Point</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    {loading ? 'Loading products...' : 'No products found'}
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => {
                  const status = getStockStatus(product.current_stock, product.reorder_point);
                  const StatusIcon = status.icon;
                  return (
                    <TableRow key={product.id} className="product-row">
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-gray-500 font-mono text-sm">
                        {product.sku}
                      </TableCell>
                      <TableCell className="text-right">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {product.current_stock}
                      </TableCell>
                      <TableCell className="text-right text-gray-500">
                        {product.reorder_point}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={status.variant} className="status-badge">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
