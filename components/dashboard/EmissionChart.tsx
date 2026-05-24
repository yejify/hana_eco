'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ActivityData, ActivityType } from '@/types/activity';

type EmissionChartProps = {
  activities: ActivityData[];
};

const ACTIVITY_LABELS: Record<ActivityType, string> = {
  electricity: '전력',
  material: '원재료',
  transport: '운송',
  waste: '폐기물',
};

export default function EmissionChart({ activities }: EmissionChartProps) {
  const chartData = Object.entries(
    activities.reduce<Record<ActivityType, number>>(
      (acc, cur) => {
        acc[cur.activityType] += cur.emission;

        return acc;
      },
      {
        electricity: 0,
        material: 0,
        transport: 0,
        waste: 0,
      },
    ),
  ).map(([type, value]) => ({
    type,
    label: ACTIVITY_LABELS[type as ActivityType],
    emission: Number(value.toFixed(2)),
  }));

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <h2 className='text-lg font-bold text-gray-800'>배출량 현황</h2>

        <p className='mt-1 text-sm text-gray-500'>
          활동 유형별 탄소 배출량을 시각화합니다.
        </p>
      </div>

      <div className='h-80 focus:outline-none'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={chartData} style={{ outline: 'none' }}>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#e5e7eb'
            />

            <XAxis
              dataKey='label'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }}
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                backgroundColor: '#ffffff',
              }}
            />

            <Bar
              dataKey='emission'
              fill='#2563eb'
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
