export default function SummaryCards() {
  return (
    <section className='grid grid-cols-3 gap-6'>
      {/* card 1 */}
      <div className='rounded-2xl border border-purple-200 bg-white p-6 shadow-sm'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-sm text-gray-500'>총 탄소 배출량</p>

            <h2 className='mt-4 text-4xl font-bold text-gray-800'>12.4</h2>

            <p className='mt-2 text-sm text-gray-400'>tCO₂eq</p>
          </div>

          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600'>
            🌎
          </div>
        </div>
      </div>

      {/* card 2 */}
      <div className='rounded-2xl border border-purple-200 bg-white p-6 shadow-sm'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-sm text-gray-500'>등록 제품 수</p>

            <h2 className='mt-4 text-4xl font-bold text-gray-800'>48</h2>

            <p className='mt-2 text-sm text-gray-400'>Products</p>
          </div>

          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600'>
            📦
          </div>
        </div>
      </div>

      {/* card 3 */}
      <div className='rounded-2xl border border-purple-200 bg-white p-6 shadow-sm'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='text-sm text-gray-500'>이번 달 데이터</p>

            <h2 className='mt-4 text-4xl font-bold text-gray-800'>324</h2>

            <p className='mt-2 text-sm text-gray-400'>Records</p>
          </div>

          <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-xl text-purple-600'>
            📊
          </div>
        </div>
      </div>
    </section>
  );
}
