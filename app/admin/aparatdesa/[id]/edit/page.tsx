import { notFound } from 'next/navigation';

import prisma from '@/lib/prisma';

import EditAparatForm from './form';

export default async function Page({ params }: { params: { id: string } }) {
  if (isNaN(parseInt(params.id))) {
    notFound();
  }

  const aparatDesa = await prisma.aparatDesa.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!aparatDesa) {
    notFound();
  }

  return <EditAparatForm aparatDesa={aparatDesa} />;
}
