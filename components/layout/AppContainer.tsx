import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div className='min-h-screen bg-[#f5f6f8]'>
      <Header />

      <div className='flex min-h-[calc(100vh-72px)]'>
        <Sidebar />

        <div className='flex flex-1 flex-col'>
          <main className='flex-1 p-6'>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
