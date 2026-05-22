import { ActivityData } from '@/types/activity';
import { calculateEmission } from '@/utils/calculateEmission';

export const mockActivityData: ActivityData[] = [
  {
    id: 1,
    productName: '친환경 컵',
    activityType: 'electricity',
    amount: 120,
    unit: 'kWh',
    emission: calculateEmission('electricity', 120),
  },
];
