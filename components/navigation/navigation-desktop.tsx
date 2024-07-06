import Link from 'next/link';
import { Bell, Flame } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { AdminNavLinksDesktop, UserNavLinksDesktop } from './links';

export default function NavigationDesktop({
  type,
}: {
  type: 'user' | 'admin';
}) {
  return (
    <div className='hidden border-r bg-muted/40 md:block md:sticky md:h-screen md:top-0'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Flame className='h-6 w-6 text-primary' />
            <span className=''>Pendekar</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          {type === 'user' ? <UserNavLinksDesktop /> : <AdminNavLinksDesktop />}
        </div>
      </div>
    </div>
  );
}
