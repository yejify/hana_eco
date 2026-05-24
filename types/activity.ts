export type ActivityType = 'electricity' | 'material' | 'transport' | 'waste';

export interface ActivityData {
  id: number;
  date: string;
  productName: string;
  activityType: ActivityType;
  amount: number;
  unit: string;
  emission: number;
}
