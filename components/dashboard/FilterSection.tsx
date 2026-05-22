export default function FilterSection() {
  return (
    <section className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-bold text-gray-800'>활동 데이터 입력</h2>
          <p className='mt-1 text-sm text-gray-500'>
            제품별 활동량을 입력해 탄소 배출량을 계산합니다.
          </p>
        </div>

        <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'>
          데이터 추가
        </button>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            제품명
          </label>
          <input
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
            placeholder='예: 친환경 컵'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            활동 유형
          </label>
          <select className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'>
            <option>전력 사용량</option>
            <option>원재료 사용량</option>
            <option>운송 거리</option>
            <option>폐기물 발생량</option>
          </select>
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            활동량
          </label>
          <input
            type='number'
            className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'
            placeholder='예: 120'
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium text-gray-600'>
            단위
          </label>
          <select className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500'>
            <option>kWh</option>
            <option>kg</option>
            <option>km</option>
            <option>ton</option>
          </select>
        </div>
      </div>
    </section>
  );
}
