'use client';

import { useEffect, useState } from 'react';

import { ActivityData, CreateActivityRequest } from '@/types/activity';

export function useActivities() {
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [editingActivity, setEditingActivity] = useState<ActivityData | null>(
    null,
  );

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities');

      if (!response.ok) {
        throw new Error('활동 목록 조회 실패');
      }

      const data = await response.json();

      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const addActivity = async (activity: CreateActivityRequest) => {
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
      });

      if (!response.ok) {
        throw new Error('활동 추가 실패');
      }

      await fetchActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const updateActivity = async (updatedActivity: ActivityData) => {
    try {
      const response = await fetch(`/api/activities/${updatedActivity.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
      });

      if (!response.ok) {
        throw new Error('수정 실패');
      }

      await fetchActivities();

      setEditingActivity(null);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteActivity = async (id: string) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('삭제 실패');
      }

      await fetchActivities();
    } catch (error) {
      console.error(error);
    }
  };

  const importActivities = async (newActivities: CreateActivityRequest[]) => {
    try {
      await Promise.all(
        newActivities.map((activity) =>
          fetch('/api/activities', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity),
          }),
        ),
      );

      await fetchActivities();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    activities,
    editingActivity,
    addActivity,
    updateActivity,
    deleteActivity,
    setEditingActivity,
    importActivities,
  };
}
