'use client';

import { useState } from 'react';

import AppContainer from '@/components/layout/AppContainer';
import PageHeader from '@/components/dashboard/PageHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FilterSection from '@/components/dashboard/FilterSection';
import EmissionChart from '@/components/dashboard/EmissionChart';
import DataTable from '@/components/dashboard/DataTable';
import { mockActivityData } from '@/data/mockActivityData';
import { ActivityData } from '@/types/activity';

export default function Home() {
  const [activities, setActivities] =
    useState<ActivityData[]>(mockActivityData);

  const addActivity = (activity: ActivityData) => {
    setActivities((prev) => [...prev, activity]);
  };

  return (
    <AppContainer>
      <div className='flex flex-col gap-6'>
        <PageHeader />
        <SummaryCards activities={activities} />
        <FilterSection addActivity={addActivity} />
        <EmissionChart activities={activities} />
        <DataTable activities={activities} />
      </div>
    </AppContainer>
  );
}
