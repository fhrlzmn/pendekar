import { AdminDashboardCards } from '@/components/dashboard/admin/cards';
import RecentPermohonan from '@/components/dashboard/admin/recent-permohonan';
import RecentSurat from '@/components/dashboard/admin/recent-surat';

export default function Page() {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <AdminDashboardCards />
      </div>
      <div className='grid gap-4 lg:grid-cols-[1fr_0.7fr]'>
        <RecentPermohonan />
        <RecentSurat />
      </div>
    </>
  );
}
