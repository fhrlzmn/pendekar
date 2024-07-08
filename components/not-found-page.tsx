import { Frown } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

interface NotFoundPageProps {
  backTo?: string;
  description?: string;
}

export default function NotFoundPage({
  backTo,
  description,
}: NotFoundPageProps) {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <div className='flex flex-col justify-center items-center gap-2'>
        <Frown className='h-16 w-16 text-muted-foreground' />
        <h2 className='font-semibold text-lg'>404 Not Found</h2>
        <p className='font-medium text-muted-foreground'>{description}</p>
      </div>
      <Link
        href={backTo || '/'}
        className={buttonVariants({ variant: 'default' })}
      >
        Kembali
      </Link>
    </div>
  );
}
