import AparatDesaDetail from '@/components/aparat-desa-detail';

export default async function Page({ params }: { params: { id: string } }) {
  return <AparatDesaDetail id={params.id} />;
}
