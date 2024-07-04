'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';
import DynamicIcon from '@/components/dynamic-icon';
import { cn } from '@/lib/utils';
import { NavLink } from '@/types/nav-link';
import { usePathname } from 'next/navigation';

const adminNavLinks: NavLink[] = [
  { id: 1, path: '/admin/dashboard', label: 'Dashboard', icon: 'house' },
  { id: 2, path: '/admin/people', label: 'Penduduk', icon: 'book-user' },
  { id: 3, path: '/admin/account', label: 'Akun', icon: 'users' },
  { id: 4, path: '/admin/requests', label: 'Permohonan', icon: 'file-search' },
];

const userNavLinks: NavLink[] = [
  { id: 1, path: '/user/dashboard', label: 'Dashboard', icon: 'house' },
  { id: 2, path: '/user/profile', label: 'Profil', icon: 'user' },
];

export function AdminNavLinksDesktop() {
  const pathname = usePathname();

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      {adminNavLinks.map((link) => (
        <Link
          key={link.id}
          href={link.path}
          className={cn(
            pathname.startsWith(link.path)
              ? 'text-background bg-primary hover:text-background'
              : 'text-muted-foreground hover:text-primary',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
          )}
        >
          <DynamicIcon name={link.icon} className='h-4 w-4' />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function AdminNavLinksMobile() {
  const pathname = usePathname();

  return (
    <nav className='grid gap-2 text-lg font-medium'>
      <Link
        href='#'
        className='flex items-center gap-2 text-lg font-semibold mb-4'
      >
        <Flame className='h-6 w-6 text-primary' />
        <span className='sr-only'>Pendekar</span>
      </Link>

      {adminNavLinks.map((link) => (
        <Link
          key={link.id}
          href={link.path}
          className={cn(
            pathname.startsWith(link.path)
              ? 'text-background bg-primary'
              : 'text-muted-foreground',
            'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground'
          )}
        >
          <DynamicIcon name={link.icon} className='h-5 w-5' />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function UserNavLinksDesktop() {
  const pathname = usePathname();

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      {userNavLinks.map((link) => (
        <Link
          key={link.id}
          href={link.path}
          className={cn(
            pathname.startsWith(link.path)
              ? 'text-background bg-primary hover:text-background'
              : 'text-muted-foreground hover:text-primary',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
          )}
        >
          <DynamicIcon name={link.icon} className='h-4 w-4' />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function UserNavLinksMobile() {
  const pathname = usePathname();

  return (
    <nav className='grid gap-2 text-lg font-medium'>
      <Link
        href='#'
        className='flex items-center gap-2 text-lg font-semibold mb-4'
      >
        <Flame className='h-6 w-6 text-primary' />
        <span className='sr-only'>Pendekar</span>
      </Link>

      {userNavLinks.map((link) => (
        <Link
          key={link.id}
          href={link.path}
          className={cn(
            pathname.startsWith(link.path)
              ? 'text-background bg-primary'
              : 'text-muted-foreground',
            'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground'
          )}
        >
          <DynamicIcon name={link.icon} className='h-5 w-5' />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
