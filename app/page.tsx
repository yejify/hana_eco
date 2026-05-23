'use client';

import { useEffect, useState } from 'react';

import AppContainer from '@/components/layout/AppContainer';
import PageHeader from '@/components/dashboard/PageHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FilterSection from '@/components/dashboard/FilterSection';
import EmissionChart from '@/components/dashboard/EmissionChart';
import DataTable from '@/components/dashboard/DataTable';
import { mockActivityData } from '@/data/mockActivityData';
import { ActivityData } from '@/types/activity';

const STORAGE_KEY = 'hana-eco-activities';

export default function Home() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [editingActivity, setEditingActivity] = useState<ActivityData | null>(
    null,
  );

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setActivities(JSON.parse(storedData));
    } else {
      setActivities(mockActivityData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

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
