import Link from 'next/link';
import prisma from '@/lib/prisma';
import { AparatDesa } from '@prisma/client';
import { UserPlus } from 'lucide-react';

import DataTable from '@/components/table/data-table';
import { buttonVariants } from '@/components/ui/button';

import { columns } from './columns';

export default async function Page() {
  const aparat: AparatDesa[] = await prisma.aparatDesa.findMany();

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>Aparat Desa</h1>
        <Link
          href='/admin/aparatdesa/new'
          className={buttonVariants({ variant: 'default' })}
        >
          <UserPlus className='w-4 h-4 mr-2' />
          Tambah
        </Link>
      </div>
      <div className='rounded-sm'>
        <DataTable columns={columns} data={aparat} />
      </div>
    </div>
  );
}
