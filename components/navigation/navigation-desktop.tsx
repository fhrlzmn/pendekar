import Link from 'next/link';
import Logo from '@/public/logo.webp';

import { AdminNavLinksDesktop, UserNavLinksDesktop } from './links';
import Image from 'next/image';

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
            <Image src={Logo} alt='Pendekar' width={32} height={32} />
            <span className='text-xl'>Pendekar</span>
          </Link>
        </div>
        <div className='flex-1'>
          {type === 'user' ? <UserNavLinksDesktop /> : <AdminNavLinksDesktop />}
        </div>
      </div>
    </div>
  );
}
