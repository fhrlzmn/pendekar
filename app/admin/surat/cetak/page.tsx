import JenisSuratCard from '@/components/jenis-surat-card';

export default function Page() {
  return (
    <div className='w-full min-h-full flex flex-col gap-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-xl md:text-2xl font-semibold'>Cetak Surat</h1>
      </div>
      <div className='rounded-sm grid grid-cols-3 gap-4'>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/admin/cetak/sktm'
            title='Surat Keterangan Tidak Mampu'
            description='Cetak Surat'
          />
          <JenisSuratCard
            path='/admin/cetak/skbn'
            title='Surat Keterangan Beda Nama'
            description='Cetak Surat'
          />
        </div>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/admin/cetak/skklhr'
            title='Surat Keterangan Kelahiran'
            description='Cetak Surat'
          />
          <JenisSuratCard
            path='/admin/cetak/skkmtn'
            title='Surat Keterangan Kematian'
            description='Cetak Surat'
          />
        </div>
        <div className='grid gap-4'>
          <JenisSuratCard
            path='/admin/cetak/sku'
            title='Surat Keterangan Usaha'
            description='Cetak Surat'
          />
          <JenisSuratCard
            path='/admin/cetak/sik'
            title='Surat Izin Keramaian'
            description='Cetak Surat'
          />
        </div>
      </div>
    </div>
  );
}
