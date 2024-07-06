import prisma from '@/lib/prisma';
import EditPendudukForm from './form';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: {
    nik: string;
  };
}) {
  const penduduk = await prisma.penduduk.findUnique({
    where: {
      nik: params.nik,
    },
  });

  if (!penduduk) {
    notFound();
  }

  return <EditPendudukForm penduduk={penduduk} />;
}
