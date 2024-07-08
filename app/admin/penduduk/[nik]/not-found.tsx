import NotFoundPage from '@/components/not-found-page';

export default function NotFound() {
  return (
    <NotFoundPage
      backTo='/admin/penduduk'
      description='Penduduk yang Anda cari tidak ditemukan.'
    />
  );
}
