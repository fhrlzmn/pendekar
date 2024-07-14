import { auth } from '@/auth';
import { UserDashboardCards } from '@/components/dashboard/cards';
import { RecentPendingPermohonan } from '@/components/dashboard/recent-permohonan';
import RecentSurat from '@/components/dashboard/recent-surat';
import {
  AdminDashboardCardsSkeleton,
  RecentTableSkeleton,
} from '@/components/skeleton';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth();

  const nik = session?.user.nik;

  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<AdminDashboardCardsSkeleton />}>
          <UserDashboardCards nik={nik!} />
        </Suspense>
      </div>
      <div className='grid gap-4 lg:grid-cols-[1fr_0.7fr]'>
        <Suspense fallback={<RecentTableSkeleton />}>
          <RecentPendingPermohonan />
        </Suspense>
        <Suspense fallback={<RecentTableSkeleton />}>
          <RecentSurat />
        </Suspense>
      </div>
    </>
  );
}
