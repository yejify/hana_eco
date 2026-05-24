export default function Footer() {
  return (
    <footer className='bg-[#3b3b46] text-white px-10 py-12 mt-10'>
      <div className='max-w-350 mx-auto flex flex-col gap-6'>
        {/* top */}
        <div className='flex items-center gap-3'>
          <span className='text-3xl text-blue-400'>◉</span>

          <h2 className='text-3xl font-bold tracking-[-1px]'>
            hana<span className='text-blue-400'>.eco</span>
          </h2>
        </div>

        {/* middle */}
        <div className='flex flex-wrap gap-x-10 gap-y-2 text-sm text-gray-300'>
          <span>회사소개</span>
          <span>서비스 소개</span>
          <span>개인정보처리방침</span>
          <span>이용약관</span>
        </div>

        {/* bottom */}
        <div className='border-t border-gray-600 pt-6 text-sm text-gray-400 flex flex-col gap-2'>
          <p>서울특별시 강남구 테헤란로 123 하나빌딩</p>

          <div className='flex gap-6 flex-wrap'>
            <span>TEL 02-1234-5678</span>
            <span>EMAIL contact@hanaeco.com</span>
          </div>

          <p>© 2026 HANA ECO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
