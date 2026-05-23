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
        acc[cur.activityType] = (acc[cur.activityType] || 0) + cur.emission;
        return acc;
      },
      {
        electricity: 0,
        material: 0,
        transport: 0,
        waste: 0,
      },
    ),
  ).map(([key, value]) => ({
    type: key as ActivityType,
    label: ACTIVITY_LABELS[key as ActivityType],
    value,
  }));

  const maxValue = Math.max(...chartData.map((item) => item.value), 1);

  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-6'>
        <h2 className='text-lg font-bold text-gray-800'>배출량 현황</h2>
        <p className='mt-1 text-sm text-gray-500'>
          활동 유형별 탄소 배출 비중을 확인합니다.
        </p>
      </div>

      <div className='flex h-64 items-end gap-6 border-b border-l border-gray-200 px-6 py-4'>
        {chartData.map((item) => (
          <div
            key={item.label}
            className='flex flex-1 flex-col items-center justify-end gap-3'
          >
            <div
              className='w-full max-w-18 rounded-t-xl bg-blue-500'
              style={{ height: `${(item.value / maxValue) * 180}px` }}
            />

            <span className='text-sm text-gray-500'>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
