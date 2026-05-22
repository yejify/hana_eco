import AppContainer from '@/components/layout/AppContainer';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FilterSection from '@/components/dashboard/FilterSection';
import EmissionChart from '@/components/dashboard/EmissionChart';
import DataTable from '@/components/dashboard/DataTable';

export default function Home() {
  return (
    <AppContainer>
      <SummaryCards />
      <FilterSection />
      <EmissionChart />
      <DataTable />
    </AppContainer>
  );
}
