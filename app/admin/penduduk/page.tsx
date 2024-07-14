import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { Penduduk } from '@prisma/client';

import { buttonVariants } from '@/components/ui/button';

import prisma from '@/lib/prisma';
import DataTable from '@/components/table/data-table';
import { columns } from './columns';

export default async function Page() {
  const penduduk: Penduduk[] = await prisma.penduduk.findMany();

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>Penduduk</h1>
        <Link
          href='/admin/penduduk/new'
          className={buttonVariants({ variant: 'default' })}
        >
          <UserPlus className='w-4 h-4 mr-2' />
          Tambah
        </Link>
      </div>
      <div className='rounded-sm'>
        <DataTable columns={columns} data={penduduk} filterBy='nama' />
      </div>
    </div>
  );
}
