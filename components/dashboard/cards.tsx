import dynamicIconImports from 'lucide-react/dynamicIconImports';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { fetchAdminCardData, fetchUserCardData } from '@/lib/data';
import DynamicIcon from '@/components/dynamic-icon';

export async function AdminDashboardCards() {
  const { pendudukCount, suratCount, permohonanCount, pendingPermohonanCount } =
    await fetchAdminCardData();

  return (
    <>
      <DashboardCard
        title='Penduduk'
        icon='users'
        value={pendudukCount}
        description='Jumlah Penduduk yang Terdaftar di Sistem'
      />
      <DashboardCard
        title='Surat'
        icon='mails'
        value={suratCount}
        description='Jumlah Surat yang telah Disetujui'
      />
      <DashboardCard
        title='Permohonan'
        icon='mail-search'
        value={permohonanCount}
        description='Jumlah Permohonan Surat'
      />
      <DashboardCard
        title='Permohonan Pending'
        icon='mail-warning'
        value={pendingPermohonanCount}
        description='Jumlah Permohonan yang Belum Diproses'
      />
    </>
  );
}

export async function UserDashboardCards({ nik }: { nik: string }) {
  const {
    totalPermohonanCount,
    pendingPermohonanCount,
    approvedPermohonanCount,
    rejectedPermohonanCount,
  } = await fetchUserCardData(nik);

  return (
    <>
      <DashboardCard
        title='Total Permohonan'
        icon='mails'
        value={totalPermohonanCount}
        description='Jumlah Permohonan yang Diajukan'
      />
      <DashboardCard
        title='Permohonan Diproses'
        icon='mail-search'
        value={pendingPermohonanCount}
        description='Jumlah Permohonan yang sedang Diproses'
      />
      <DashboardCard
        title='Permohonan Disetujui'
        icon='mail-check'
        value={approvedPermohonanCount}
        description='Jumlah Permohonan yang telah Disetujui'
      />
      <DashboardCard
        title='Permohonan Ditolak'
        icon='mail-x'
        value={rejectedPermohonanCount}
        description='Jumlah Permohonan yang Ditolak'
      />
    </>
  );
}

export function DashboardCard({
  title,
  icon,
  value,
  description,
}: {
  title: string;
  icon: keyof typeof dynamicIconImports;
  value: number | string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <DynamicIcon name={icon} className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='text-4xl font-bold'>{value}</div>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  );
}
