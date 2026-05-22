export default function PageHeader() {
  return (
    <div>
      <div className='mb-3 text-sm text-gray-400'>Home / Dashboard</div>

      <h1 className='text-3xl font-bold text-gray-800'>
        탄소 배출 관리 대시보드
      </h1>

      <p className='mt-2 text-sm text-gray-500'>
        제품 탄소발자국 데이터를 등록하고 배출량을 확인합니다.
      </p>
    </div>
  );
}
