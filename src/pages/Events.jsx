import { EventsHeader } from '../components/events/EventsHeader';
import { ProductsStockCard } from '../components/events/ProductsStockCard';
import { SimulateSaleCard } from '../components/events/SimulateSaleCard';
import { AuditTrailCard } from '../components/events/AuditTrailCard';
import { useDemoData } from '../hooks/useDemoData';
import './Events.css';

const Events = () => {
  const {
    products,
    loading,
    simulateSale,
    refreshProducts,
  } = useDemoData();

  return (
    <div className="events-page">
      <main className="events-main">
        <EventsHeader />
        
        <div className="events-grid">
          {/* Card A: Products & Stock */}
          <div className="events-grid-full">
            <ProductsStockCard
              products={products}
              loading={loading}
              onRefresh={refreshProducts}
            />
          </div>

          {/* Card B: Simulate WhatsApp Sale */}
          <SimulateSaleCard
            products={products}
            onSimulateSale={simulateSale}
          />

          {/* Card C: Audit Trail - Now self-contained with its own data fetching */}
          <AuditTrailCard />
        </div>
      </main>
    </div>
  );
};

export default Events;
