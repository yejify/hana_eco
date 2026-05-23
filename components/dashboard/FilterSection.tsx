'use client';

import { ActivityData, ActivityType } from '@/types/activity';
import { calculateEmission } from '@/utils/calculateEmission';
import { useState } from 'react';

type FilterSectionProps = {
  addActivity: (activity: ActivityData) => void;
};

const UNIT_MAP: Record<ActivityType, string> = {
  electricity: 'kWh',
  material: 'kg',
  transport: 'km',
  waste: 'ton',
};

export default function FilterSection({ addActivity }: FilterSectionProps) {
  const [productName, setProductName] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>('electricity');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (!productName || !amount) {
      alert('제품명과 활동량을 입력해주세요.');
      return;
    }

    const numericAmount = Number(amount);

    const newActivity: ActivityData = {
      id: Date.now(),
      productName,
      activityType,
      amount: numericAmount,
      unit: UNIT_MAP[activityType],
      emission: calculateEmission(activityType, numericAmount),
    };

    addActivity(newActivity);

    setProductName('');
    setAmount('');
    setActivityType('electricity');
  };

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold text-gray-800'>활동 데이터 입력</h2>
          <p className='mt-1 text-sm text-gray-500'>
            제품별 활동량을 입력해 탄소 배출량을 계산합니다.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
        >
          데이터 추가
        </button>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            제품명
          </label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
            placeholder='예: 친환경 컵'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            활동 유형
          </label>
          <select
            value={activityType}
            onChange={(e) => setActivityType(e.target.value as ActivityType)}
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
          >
            <option value='electricity'>전력 사용량</option>
            <option value='material'>원재료 사용량</option>
            <option value='transport'>운송 거리</option>
            <option value='waste'>폐기물 발생량</option>
          </select>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            활동량
          </label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
            placeholder='예: 120'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            단위
          </label>
          <div className='flex h-10.5 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500'>
            {UNIT_MAP[activityType]}
          </div>
        </div>
      </div>
    </section>
  );
}
