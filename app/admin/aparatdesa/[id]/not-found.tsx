import NotFoundPage from '@/components/not-found-page';

export default function NotFound() {
  return (
    <NotFoundPage
      backTo='/admin/aparatdesa'
      description='Aparat Desa yang Anda cari tidak ditemukan.'
    />
  );
}
