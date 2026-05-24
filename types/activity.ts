export type ActivityType = 'electricity' | 'material' | 'transport' | 'waste';

export type CreateActivityRequest = {
  activityDate: string;
  productName: string;
  activityType: ActivityType;
  amount: number;
  unit: string;
};

export type ActivityData = {
  id: string;
  activityDate: string;
  productName: string;
  activityType: ActivityType;
  amount: number;
  unit: string;
  emission: number;
  createdAt: string;
};
