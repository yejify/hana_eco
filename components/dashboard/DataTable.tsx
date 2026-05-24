import { ActivityData } from '@/types/activity';

type DataTableProps = {
  activities: ActivityData[];
  deleteActivity: (id: string) => void;
  setEditingActivity: (activity: ActivityData) => void;
};

export default function DataTable({
  activities,
  deleteActivity,
  setEditingActivity,
}: DataTableProps) {
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
              <th className='px-4 py-3 text-left font-semibold'>일자</th>
              <th className='px-4 py-3 text-left font-semibold'>제품명</th>
              <th className='px-4 py-3 text-left font-semibold'>활동 유형</th>
              <th className='px-4 py-3 text-right font-semibold'>활동량</th>
              <th className='px-4 py-3 text-left font-semibold'>단위</th>
              <th className='px-4 py-3 text-right font-semibold'>배출량</th>
              <th className='px-4 py-3 text-center font-semibold'>관리</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-100'>
            {activities.map((item) => (
              <tr key={item.id} className='hover:bg-gray-50'>
                <td className='px-4 py-4 text-gray-600'>
                  {item.activityDate || '-'}
                </td>
                <td className='px-4 py-4 font-medium text-gray-800'>
                  {item.productName}
                </td>
                <td className='px-4 py-4 text-gray-600'>{item.activityType}</td>
                <td className='px-4 py-4 text-right text-gray-600'>
                  {item.amount.toLocaleString()}
                </td>
                <td className='px-4 py-4 text-gray-600'>{item.unit}</td>
                <td className='px-4 py-4 text-right font-semibold text-blue-600'>
                  {item.emission.toFixed(2)} kgCO₂eq
                </td>
                <td className='px-4 py-4 text-center'>
                  <button
                    type='button'
                    onClick={() => setEditingActivity(item)}
                    className='mr-2 rounded-md border border-blue-200 px-3 py-1 text-xs font-medium text-blue-500 hover:bg-blue-50'
                  >
                    수정
                  </button>

                  <button
                    type='button'
                    onClick={() => deleteActivity(item.id)}
                    className='rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-500 hover:bg-red-50'
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
