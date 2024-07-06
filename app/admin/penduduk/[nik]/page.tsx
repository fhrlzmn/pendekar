import PendudukDetail from '@/components/penduduk-detail';

export default async function Page({ params }: { params: { nik: string } }) {
  return <PendudukDetail nik={params.nik} />;
}
