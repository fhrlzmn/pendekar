import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex w-full min-h-full justify-center items-center gap-4'>
      <Loader2 className='h-6 w-6 animate-spin' />
      <p className='text-base font-semibold'>Loading...</p>
    </div>
  );
}
