import Link from 'next/link';
import { UserPlus } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

import PeopleTable from '@/components/people/people-table';
import { peopleColumns, Person } from '@/components/people/people-columns';

async function getPeople(): Promise<Person[]> {
  return [
    {
      name: 'John Doe',
      nik: '3204360101010001',
      jenisKelamin: 'Laki-laki',
      tanggalLahir: '01-01-2001',
    },
    {
      name: 'Jane Doe',
      nik: '3204364308010001',
      jenisKelamin: 'Perempuan',
      tanggalLahir: '03-08-2001',
    },
  ];
}

export default async function Page() {
  const people = await getPeople();

  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>Penduduk</h1>
        <Link
          href='/admin/people/add'
          className={buttonVariants({ variant: 'default' })}
        >
          <UserPlus className='w-4 h-4 mr-2' />
          Tambah
        </Link>
      </div>
      <div className='rounded-sm'>
        <PeopleTable columns={peopleColumns} data={people} />
      </div>
    </div>
  );
}
