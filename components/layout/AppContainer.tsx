import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

type AppContainerProps = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <div className='app-container'>
      <Header />
      <div className='app-body'>
        <Sidebar />
        <main className='app-main'>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
