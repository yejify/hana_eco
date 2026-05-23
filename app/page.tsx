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
  const [editingActivity, setEditingActivity] = useState<ActivityData | null>(
    null,
  );

  const addActivity = (activity: ActivityData) => {
    setActivities((prev) => [...prev, activity]);
  };

  const deleteActivity = (id: number) => {
    setActivities((prev) => prev.filter((item) => item.id !== id));
  };

  const updateActivity = (updatedActivity: ActivityData) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      ),
    );
    setEditingActivity(null);
  };

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
