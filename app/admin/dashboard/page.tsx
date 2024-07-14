import { AdminDashboardCards } from '@/components/dashboard/cards';
import { RecentPendingPermohonan } from '@/components/dashboard/recent-permohonan';
import RecentSurat from '@/components/dashboard/recent-surat';
import {
  AdminDashboardCardsSkeleton,
  RecentTableSkeleton,
} from '@/components/skeleton';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Suspense fallback={<AdminDashboardCardsSkeleton />}>
          <AdminDashboardCards />
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
