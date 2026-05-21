import Header from '@/components/layout/Header';
import AppContainer from '@/components/layout/AppContainer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='min-h-screen bg-gray-50'>
        <Header />
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
