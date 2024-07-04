import Header from '@/components/header';
import NavigationDesktop from '@/components/navigation/navigation-desktop';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]'>
      <NavigationDesktop />
      <div className='flex flex-col'>
        <Header />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
