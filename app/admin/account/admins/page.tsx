import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { Admin } from '@prisma/client';

import prisma from '@/lib/prisma';

import { buttonVariants } from '@/components/ui/button';
import DataTable from '@/components/table/data-table';

import { columns } from './columns';

export default async function Page() {
  const admins: Admin[] = await prisma.admin.findMany({
    where: {
      aparatDesaId: {
        not: null,
      },
    },
  });

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>
          Akun Administrator
        </h1>
        <Link
          href='/admin/account/admins/new'
          className={buttonVariants({ variant: 'default' })}
        >
          <UserPlus className='w-4 h-4 mr-2' />
          Tambah
        </Link>
      </div>
      <div className='rounded-sm'>
        <DataTable columns={columns} data={admins} filterBy='nama' />
      </div>
    </div>
  );
}
