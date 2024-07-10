import { notFound } from 'next/navigation';
import { Penduduk } from '@prisma/client';

import prisma from '@/lib/prisma';

import AddUserAccountForm from './form';

export default async function Page() {
  const penduduk: Penduduk[] = await prisma.penduduk.findMany();

  if (!penduduk) {
    notFound();
  }

  return <AddUserAccountForm penduduk={penduduk} />;
}
