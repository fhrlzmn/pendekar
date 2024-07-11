import { CircleUser } from 'lucide-react';

import { auth } from '@/auth';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import NavigationMobile from '@/components/navigation/navigation-mobile';
import LogoutButton from '@/components/auth/logout-button';

export default async function Header({ type }: { type: 'user' | 'admin' }) {
  const session = await auth();

  return (
    <header className='flex w-full sticky top-0 h-14 items-center justify-between md:justify-end gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6'>
      <NavigationMobile type={type} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' className='rounded-full'>
            <CircleUser className='h-5 w-5' />
            <span className='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{session?.user?.name || null}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
