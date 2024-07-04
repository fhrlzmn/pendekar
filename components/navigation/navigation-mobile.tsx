import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { AdminNavLinksMobile, UserNavLinksMobile } from './links';

export default function NavigationMobile({ type }: { type: 'user' | 'admin' }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        {type === 'user' ? <UserNavLinksMobile /> : <AdminNavLinksMobile />}
      </SheetContent>
    </Sheet>
  );
}
