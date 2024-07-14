import { auth } from '@/auth';
import { UserDashboardCards } from '@/components/dashboard/cards';
import { RecentUserPermohonan } from '@/components/dashboard/recent-permohonan';
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
      <div className='grid gap-4'>
        <Suspense fallback={<RecentTableSkeleton />}>
          <RecentUserPermohonan nik={nik!} />
        </Suspense>
      </div>
    </>
  );
}
