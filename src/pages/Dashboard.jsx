import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { ProductsStockCard } from '@/components/dashboard/ProductsStockCard';
import { AuditTrailCard } from '@/components/dashboard/AuditTrailCard';
import { useDemoData } from '@/hooks/useDemoData';
import { useOrderRun } from '@/hooks/useOrderRun';
import './Dashboard.css';

const Dashboard = () => {
  const { products, loading: productsLoading, refreshProducts } = useDemoData();
  const {
    runs,
    selectedRun,
    selectedOrderId,
    setSelectedOrderId,
    loading: runsLoading,
    refresh: refreshRuns,
  } = useOrderRun();

  return (
    <div className="dashboard-container">
      <DashboardHeader products={products} productsLoading={productsLoading} />

      <div className="container mx-auto px-4 py-8">
        {/* ── KPI summary row ── */}
        <DashboardStats
          products={products}
          runs={runs}
          loading={productsLoading || runsLoading}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Card A: Products & Stock */}
          <ProductsStockCard
            products={products}
            loading={productsLoading}
            onRefresh={refreshProducts}
          />

          {/* Card B: Order Run Audit Trail */}
          <AuditTrailCard
            runs={runs}
            selectedRun={selectedRun}
            selectedOrderId={selectedOrderId}
            setSelectedOrderId={setSelectedOrderId}
            loading={runsLoading}
            onRefresh={refreshRuns}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
