import { notFound } from 'next/navigation';
import { AparatDesa } from '@prisma/client';

import prisma from '@/lib/prisma';

import AddAdminAccountForm from './form';

export default async function Page() {
  const aparatDesa: AparatDesa[] = await prisma.aparatDesa.findMany();

  if (!aparatDesa) {
    notFound();
  }

  return <AddAdminAccountForm aparatDesa={aparatDesa} />;
}
