export default function Sidebar() {
  return (
    <aside className='w-18 bg-white border-r border-gray-200 min-h-screen flex flex-col items-center py-6 gap-6'>
      <button className='w-10 h-10 rounded-xl bg-blue-50 text-blue-600'>
        □
      </button>

      <button className='w-10 h-10 rounded-xl text-gray-500 hover:bg-gray-100'>
        ○
      </button>
    </aside>
  );
}
