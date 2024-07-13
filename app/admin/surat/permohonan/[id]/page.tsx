import { notFound } from 'next/navigation';

import prisma from '@/lib/prisma';
import CetakForm from './form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    notFound();
  }

  const permohonan = await prisma.permohonanSurat.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      penduduk: true,
    },
  });
  if (!permohonan) {
    notFound();
  }

  const aparatDesa = await prisma.aparatDesa.findMany();

  return <CetakForm permohonan={permohonan} aparatDesa={aparatDesa} />;
}
