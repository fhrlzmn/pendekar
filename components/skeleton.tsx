import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CardSkeleton() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-4 h-4' />
      </CardHeader>
      <CardContent className='space-y-2'>
        <Skeleton className='w-full h-9' />
        <Skeleton className='w-full h-4' />
      </CardContent>
    </Card>
  );
}

export function AdminDashboardCardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
