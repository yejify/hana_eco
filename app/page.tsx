import AppContainer from '@/components/layout/AppContainer';
import PageHeader from '@/components/dashboard/PageHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FilterSection from '@/components/dashboard/FilterSection';
import EmissionChart from '@/components/dashboard/EmissionChart';
import DataTable from '@/components/dashboard/DataTable';

export default function Home() {
  return (
    <AppContainer>
      <div className='flex flex-col gap-6'>
        <PageHeader />
        <SummaryCards />
        <FilterSection />
        <EmissionChart />
        <DataTable />
      </div>
    </AppContainer>
  );
}
