export const ProductsStockCard = ({ products = [], loading = false, onRefresh }) => {
  return (
    <div className="card-elevated">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.5rem',
              background: 'rgba(6, 182, 212, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <i className="fas fa-boxes" style={{ color: 'var(--color-accent)' }}></i>
            </div>
            <h3>Products & Stock</h3>
          </div>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn btn-secondary"
            style={{ height: '2rem', width: '2rem', padding: 0 }}
          >
            <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
          </button>
        </div>
      </div>
      <div className="px-6 pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading-spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8" style={{ opacity: 0.6 }}>
            <i className="fas fa-boxes" style={{ fontSize: '3rem', opacity: 0.2, marginBottom: '0.5rem' }}></i>
            <p>No products found</p>
          </div>
        ) : (
          <div className="table-scroll-wrapper" style={{ borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Name</th>
                  <th style={{ textAlign: 'right' }}>Stock</th>
                  <th style={{ textAlign: 'right' }}>Reorder Point</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const needsReorder = product.current_stock <= product.reorder_point;
                  return (
                    <tr key={product.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>{product.sku}</td>
                      <td style={{ fontWeight: 500 }}>{product.name}</td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                        {product.current_stock}
                      </td>
                      <td style={{ textAlign: 'right', fontFamily: 'monospace', opacity: 0.7 }}>
                        {product.reorder_point}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={needsReorder ? 'badge badge-danger' : 'badge badge-success'}>
                          {needsReorder ? 'REORDER' : 'OK'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
