import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AjukanSKTMForm from './form';

export default async function Page() {
  const session = await auth();

  const penduduk = await prisma.penduduk.findUnique({
    where: {
      nik: session?.user?.nik,
    },
  });

  if (!penduduk) {
    notFound();
  }

  return <AjukanSKTMForm penduduk={penduduk} />;
}
