'use client';

import AppContainer from '@/components/layout/AppContainer';
import PageHeader from '@/components/dashboard/PageHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FilterSection from '@/components/dashboard/FilterSection';
import EmissionChart from '@/components/dashboard/EmissionChart';
import DataTable from '@/components/dashboard/DataTable';

import { useActivities } from '@/hooks/useActivities';

export default function Home() {
  const {
    activities,
    editingActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    setEditingActivity,
  } = useActivities();

  return (
    <AppContainer>
      <div className='flex flex-col gap-6'>
        <PageHeader />

        <SummaryCards activities={activities} />

        <FilterSection
          addActivity={addActivity}
          updateActivity={updateActivity}
          editingActivity={editingActivity}
        />

        <EmissionChart activities={activities} />

        <DataTable
          activities={activities}
          deleteActivity={deleteActivity}
          setEditingActivity={setEditingActivity}
        />
      </div>
    </AppContainer>
  );
}
