const chartData = [
  { label: '전력', value: 45 },
  { label: '원재료', value: 70 },
  { label: '운송', value: 38 },
  { label: '폐기물', value: 22 },
];

export default function EmissionChart() {
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
              style={{ height: `${item.value * 2}px` }}
            />

            <span className='text-sm text-gray-500'>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
