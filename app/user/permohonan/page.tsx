import Link from 'next/link';
import prisma from '@/lib/prisma';
import { UserPlus } from 'lucide-react';

import DataTable from '@/components/table/data-table';
import { buttonVariants } from '@/components/ui/button';

import { columns } from './columns';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const nik = session?.user?.nik;

  const permohonanSuratWithJenisSurat = await prisma.permohonanSurat.findMany({
    where: {
      nikPemohon: nik,
    },
    include: {
      jenisSurat: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>Permohonan Saya</h1>
        <Link
          href='/user/ajukan'
          className={buttonVariants({ variant: 'default' })}
        >
          Ajukan Permohonan
        </Link>
      </div>
      <div className='rounded-sm'>
        <DataTable columns={columns} data={permohonanSuratWithJenisSurat} />
      </div>
    </div>
  );
}
