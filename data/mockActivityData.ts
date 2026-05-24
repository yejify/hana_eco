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
  {
    id: 2,
    productName: '재활용 포장재',
    activityType: 'material',
    amount: 80,
    unit: 'kg',
    emission: calculateEmission('material', 80),
  },
  {
    id: 3,
    productName: '배송 박스',
    activityType: 'transport',
    amount: 240,
    unit: 'km',
    emission: calculateEmission('transport', 240),
  },
  {
    id: 4,
    productName: '플라스틱 용기',
    activityType: 'waste',
    amount: 50,
    unit: 'kg',
    emission: calculateEmission('waste', 50),
  },
  {
    id: 5,
    productName: '텀블러',
    activityType: 'electricity',
    amount: 320,
    unit: 'kWh',
    emission: calculateEmission('electricity', 320),
  },
  {
    id: 6,
    productName: '종이 포장재',
    activityType: 'material',
    amount: 150,
    unit: 'kg',
    emission: calculateEmission('material', 150),
  },
  {
    id: 7,
    productName: '물류 배송',
    activityType: 'transport',
    amount: 420,
    unit: 'km',
    emission: calculateEmission('transport', 420),
  },
  {
    id: 8,
    productName: '폐기 원단',
    activityType: 'waste',
    amount: 90,
    unit: 'kg',
    emission: calculateEmission('waste', 90),
  },
];
