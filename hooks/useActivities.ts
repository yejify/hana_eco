'use client';

import { useEffect, useState } from 'react';

import { mockActivityData } from '@/data/mockActivityData';
import { ActivityData } from '@/types/activity';
const STORAGE_KEYS = {
  ACTIVITIES: 'hana-eco-activities',
};

export function useActivities() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [editingActivity, setEditingActivity] = useState<ActivityData | null>(
    null,
  );

  useEffect(() => {
    const savedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);

    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
      return;
    }

    setActivities(mockActivityData);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  const addActivity = (activity: ActivityData) => {
    setActivities((prev) => [...prev, activity]);
  };

  const updateActivity = (updatedActivity: ActivityData) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity,
      ),
    );

    setEditingActivity(null);
  };

  const deleteActivity = (id: number) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  return {
    activities,
    editingActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    setEditingActivity,
  };
}
