'use client';

import Link from 'next/link';
import { Flame } from 'lucide-react';
import DynamicIcon from '@/components/dynamic-icon';
import { cn } from '@/lib/utils';
import { NavLink } from '@/types/nav-link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const adminNavLinks: NavLink[] = [
  { id: 1, path: '/admin/dashboard', label: 'Dashboard', icon: 'house' },
  { id: 2, path: '/admin/penduduk', label: 'Penduduk', icon: 'book-user' },
  {
    id: 3,
    path: '/admin/aparatdesa',
    label: 'Aparat Desa',
    icon: 'building-2',
  },
  {
    id: 3,
    path: '/admin/permohonan',
    label: 'Permohonan',
    icon: 'file-search',
  },
  {
    id: 4,
    path: '#',
    label: 'Akun',
    icon: 'fingerprint',
    children: [
      { id: 5, path: '/admin/account/users', label: 'Pengguna', icon: 'users' },
      {
        id: 6,
        path: '/admin/account/administrator',
        label: 'Administrator',
        icon: 'users',
      },
    ],
  },
];

const userNavLinks: NavLink[] = [
  { id: 1, path: '/user/dashboard', label: 'Dashboard', icon: 'house' },
  { id: 2, path: '/user/profile', label: 'Profil', icon: 'user' },
];

export function AdminNavLinksDesktop() {
  const pathname = usePathname();

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      {adminNavLinks.map((link) =>
        !link.children ? (
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
        ) : (
          <Accordion
            key={link.id}
            type='single'
            className='px-3 py-0'
            collapsible
          >
            <AccordionItem value={link.label} className='border-b-0'>
              <AccordionTrigger className='text-muted-foreground hover:text-primary hover:no-underline py-2'>
                <div className='flex items-center gap-3'>
                  <DynamicIcon name={link.icon} className='h-4 w-4' />
                  {link.label}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {link.children?.map((child) => (
                  <Link
                    key={child.id}
                    href={child.path}
                    className={cn(
                      pathname.startsWith(child.path)
                        ? 'text-background bg-primary hover:text-background'
                        : 'text-muted-foreground hover:text-primary',
                      'flex items-center gap-3 rounded-lg px-3 py-2 transition-all'
                    )}
                  >
                    <DynamicIcon name={child.icon} className='h-4 w-4' />
                    {child.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      )}
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
      {adminNavLinks.map((link) =>
        !link.children ? (
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
        ) : (
          <Accordion
            key={link.id}
            type='single'
            className='px-3 py-0 mx-[-0.65rem] text-lg'
            collapsible
          >
            <AccordionItem value={link.label} className='border-b-0'>
              <AccordionTrigger className='text-lg text-muted-foreground hover:text-foreground hover:no-underline py-2'>
                <div className='flex items-center gap-4'>
                  <DynamicIcon name={link.icon} className='h-5 w-5' />
                  {link.label}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {link.children?.map((child) => (
                  <Link
                    key={child.id}
                    href={child.path}
                    className={cn(
                      pathname.startsWith(child.path)
                        ? 'text-background bg-primary'
                        : 'text-muted-foreground',
                      'mx-[-0.65rem] text-lg flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground'
                    )}
                  >
                    <DynamicIcon name={child.icon} className='h-5 w-5' />
                    {child.label}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      )}
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
