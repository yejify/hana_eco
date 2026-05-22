export default function Header() {
  return (
    <header className='h-18 bg-white border-b border-gray-200 px-6 flex items-center gap-14'>
      <div className='flex items-center gap-2'>
        <span className='text-3xl text-blue-600'>◉</span>

        <h1 className='text-[34px] font-bold tracking-[-1px] text-gray-700'>
          hana<span className='text-blue-600'>.</span>eco
        </h1>
      </div>

      {/* <button className='text-2xl text-gray-700 cursor-pointer'>☰</button> */}
    </header>
  );
}
