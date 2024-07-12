import prisma from '@/lib/prisma';

import DataTable from '@/components/table/data-table';

import { columns } from './columns';

export default async function Page() {
  const permohonanSurat = await prisma.permohonanSurat.findMany({
    include: {
      jenisSurat: true,
      penduduk: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>
          Daftar Permohonan Surat
        </h1>
      </div>
      <div className='rounded-sm'>
        <DataTable columns={columns} data={permohonanSurat} />
      </div>
    </div>
  );
}
