export type ActivityType = 'electricity' | 'material' | 'transport' | 'waste';

export interface ActivityData {
  id: number;
  productName: string;
  activityType: ActivityType;
  amount: number;
  unit: string;
  emission: number;
}
