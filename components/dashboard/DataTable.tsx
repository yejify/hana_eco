import { mockActivityData } from '@/data/mockActivityData';
import { ActivityData } from '@/types/activity';

type DataTableProps = {
  activities: ActivityData[];
};

export default function DataTable({ activities }: DataTableProps) {
  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold text-gray-800'>활동 데이터 목록</h2>
          <p className='mt-1 text-sm text-gray-500'>
            입력된 활동 데이터와 계산된 배출량을 확인합니다.
          </p>
        </div>
      </div>

      <div className='overflow-hidden rounded-xl border border-gray-200'>
        <table className='w-full border-collapse text-sm'>
          <thead className='bg-gray-50 text-gray-600'>
            <tr>
              <th className='px-4 py-3 text-left font-semibold'>제품명</th>
              <th className='px-4 py-3 text-left font-semibold'>활동 유형</th>
              <th className='px-4 py-3 text-right font-semibold'>활동량</th>
              <th className='px-4 py-3 text-left font-semibold'>단위</th>
              <th className='px-4 py-3 text-right font-semibold'>배출량</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100'>
            {activities.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className='px-4 py-4 font-medium text-gray-800'>
                  {item.productName}
                </td>
                <td className='px-4 py-4 text-gray-600'>{item.activityType}</td>
                <td className='px-4 py-4 text-right text-gray-600'>
                  {item.amount.toLocaleString()}
                </td>
                <td className='px-4 py-4 text-gray-600'>{item.unit}</td>
                <td className='px-4 py-4 text-right font-semibold text-blue-600'>
                  {item.emission.toLocaleString()} kgCO₂eq
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
